
import { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMicrophonePermission } from "./useMicrophonePermission";
import { useBrowserSupport } from "./useBrowserSupport";
import { useSpeechRecognitionErrors } from "./useSpeechRecognitionErrors";

export function useRecognitionCore() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<number | null>(null);
  const restartCountRef = useRef<number>(0);
  
  // Initialize a state object for recognition state
  const [recognitionState, setRecognitionState] = useState({
    transcript: "",
    interimTranscript: "",
    isRecording: false,
    isStopped: false,
    autoRestart: true,
    error: "",
    startTime: 0,
    confidence: 0
  });
  
  const { toast } = useToast();
  const { requestMicrophonePermission } = useMicrophonePermission();
  const { showRecordingStartedToast, showRecordingStoppedToast } = useSpeechRecognitionErrors();
  const { checkBrowserSupport } = useBrowserSupport();
  
  // Helper function to restart recognition
  const handleRestart = useCallback(() => {
    if (!recognitionRef.current || recognitionState.isStopped) return;

    try {
      recognitionRef.current.start();
      setRecognitionState({
        ...recognitionState,
        isRecording: true,
        startTime: Date.now(),
      });
      
      // Safely clear timeout reference
      if (restartTimeoutRef.current) {
        window.clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    } catch (error) {
      console.error('Error restarting recognition:', error);
      setRecognitionState({
        ...recognitionState,
        error: 'خطا در شروع مجدد تشخیص گفتار',
        isRecording: false,
        isStopped: true,
      });
    }
  }, [recognitionRef.current, recognitionState]);

  // Check browser support on mount
  useEffect(() => {
    const isSupportedByBrowser = checkBrowserSupport();
    setIsSupported(isSupportedByBrowser);
    
    return () => {
      // Stop recognition when unmounting
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.error("Error stopping recognition during cleanup:", err);
        }
      }
      
      // Clean up any timers
      if (restartTimeoutRef.current !== null) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    };
  }, [checkBrowserSupport]);

  return {
    isListening,
    setIsListening,
    isSupported,
    recognitionRef,
    recognitionState,
    setRecognitionState,
    restartTimeoutRef,
    restartCountRef,
    handleRestart,
    requestMicrophonePermission,
    showRecordingStartedToast,
    showRecordingStoppedToast,
    confidenceScore,
    setConfidenceScore,
    toast
  };
}
