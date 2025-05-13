
import { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { correctPersianWords } from "@/utils/persian-word-correction";
import { UseSpeechRecognitionProps, UseSpeechRecognitionReturn, RecognitionState } from "./speech-recognition-types";
import { useMicrophonePermission } from "./useMicrophonePermission";
import { useRecognitionSetup } from "./useRecognitionSetup";
import { useSpeechRecognitionErrors } from "./useSpeechRecognitionErrors";
import { useRecognitionRestart } from "./useRecognitionRestart";
import { useRecognitionEventHandlers } from "./useRecognitionEventHandlers";
import { useBrowserSupport } from "./useBrowserSupport";

export function useSpeechRecognition({
  lang = "fa-IR",
  onTranscriptChange,
  initialValue = "",
  multiLine = false,
}: UseSpeechRecognitionProps): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [isSupported, setIsSupported] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<number | null>(null);
  const restartCountRef = useRef<number>(0);
  
  // Initialize a state object to match the RecognitionState type
  const [recognitionState, setRecognitionState] = useState<RecognitionState>({
    transcript: initialValue,
    interimTranscript: "",
    isRecording: false,
    isStopped: false,
    autoRestart: true,
    error: "",
    startTime: 0
  });
  
  const { toast } = useToast();
  const { requestMicrophonePermission } = useMicrophonePermission();
  const { showRecordingStartedToast, showRecordingStoppedToast } = useSpeechRecognitionErrors();
  const { checkBrowserSupport } = useBrowserSupport();
  
  // Set up recognition instance with all needed config
  const setupRecognition = useRecognitionSetup({
    transcript,
    onTranscriptChange,
    setTranscript,
    setInterimTranscript,
    setIsListening,
    lang,
    correctPersianWords,
    multiLine
  });

  // Configure restart functionality
  const { handleRestart } = useRecognitionRestart({
    recognition: recognitionRef.current,
    state: recognitionState,
    setState: setRecognitionState
  });

  // Helper function for restarting recognition
  const handleRecognitionRestart = useCallback(() => {
    handleRestart();
  }, [handleRestart]);

  // Start listening function
  const startListening = useCallback(async () => {
    if (!isSupported) return Promise.reject("عدم پشتیبانی مرورگر");

    // Check and request microphone access
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return Promise.reject("عدم دسترسی به میکروفون");

    // Stop any previous processing that might still be active
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping previous recognition instance:", err);
      }
      recognitionRef.current = null;
    }

    // Create a new instance
    recognitionRef.current = setupRecognition();
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setRecognitionState({
          ...recognitionState,
          isRecording: true,
          isStopped: false,
          startTime: Date.now()
        });
        showRecordingStartedToast();
        return Promise.resolve();
      } catch (err) {
        console.error("Error starting recognition:", err);
        // Try again after a short delay
        setTimeout(() => {
          recognitionRef.current = setupRecognition();
          try {
            recognitionRef.current.start();
            setIsListening(true);
            return Promise.resolve();
          } catch (secondErr) {
            console.error("Failed to restart recognition after error:", secondErr);
            setIsListening(false);
            return Promise.reject("خطا در شروع تشخیص گفتار");
          }
        }, 300);
      }
    }
    return Promise.reject("خطای ناشناخته");
  }, [isSupported, setupRecognition, requestMicrophonePermission, showRecordingStartedToast, recognitionState]);

  // Stop listening function
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping recognition:", err);
      }
      setIsListening(false);
      setRecognitionState({
        ...recognitionState,
        isRecording: false,
        isStopped: true
      });
      showRecordingStoppedToast();
    }
    
    // Clear any restart timers
    if (restartTimeoutRef.current !== null) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
  }, [showRecordingStoppedToast, recognitionState]);

  // Reset transcript function
  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    onTranscriptChange("");
  }, [onTranscriptChange]);
  
  // Set up event handlers
  const eventHandlers = useRecognitionEventHandlers({
    recognition: recognitionRef.current,
    state: recognitionState,
    setState: setRecognitionState,
    onTextRecognized: (text) => {
      const newTranscript = transcript + text;
      setTranscript(newTranscript);
      onTranscriptChange(newTranscript);
    },
    onError: (errorMsg) => {
      toast({
        title: "خطا",
        description: errorMsg,
        variant: "destructive",
      });
    },
    onRestart: handleRecognitionRestart,
    restartTimeoutRef,
    restartCountRef
  });

  // Check browser support on mount
  useEffect(() => {
    const isSupportedByBrowser = checkBrowserSupport();
    setIsSupported(isSupportedByBrowser);
    
    return () => {
      // Stop recognition when unmounting
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      // Clean up any timers
      if (eventHandlers?.cleanupRestartTimers) {
        eventHandlers.cleanupRestartTimers();
      }
    };
  }, [toast, checkBrowserSupport, eventHandlers]);

  return {
    transcript,
    isListening,
    isSupported,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript
  };
}

export default useSpeechRecognition;
