
import { useCallback } from "react";
import { UseSpeechRecognitionProps, UseSpeechRecognitionReturn } from "./speech-recognition-types";
import { useRecognitionCore } from "./useRecognitionCore";
import { useTranscriptManagement } from "./useTranscriptManagement";
import { useRecognitionSetup } from "./useRecognitionSetup";

export function useSpeechRecognition({
  lang = "fa-IR",
  onTranscriptChange,
  initialValue = "",
  multiLine = false,
  onInterimTranscriptChange
}: UseSpeechRecognitionProps): UseSpeechRecognitionReturn {
  // Use core recognition hooks
  const {
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
  } = useRecognitionCore();
  
  // Manage transcript state
  const {
    transcript,
    interimTranscript,
    setTranscript,
    setInterimTranscript,
    resetTranscript,
    updateTranscript
  } = useTranscriptManagement({
    initialValue,
    onTranscriptChange,
    multiLine,
    onInterimTranscriptChange
  });
  
  // Set up recognition instance with all needed config
  const setupRecognition = useRecognitionSetup({
    transcript,
    onTranscriptChange,
    setTranscript,
    setInterimTranscript,
    setIsListening,
    lang,
    multiLine,
    setConfidenceScore,
    onInterimTranscriptChange
  });
  
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
  }, [isSupported, setupRecognition, requestMicrophonePermission, showRecordingStartedToast, recognitionState, recognitionRef, setIsListening, setRecognitionState]);

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
  }, [showRecordingStoppedToast, recognitionState, recognitionRef, setIsListening, setRecognitionState, restartTimeoutRef]);

  return {
    transcript,
    isListening,
    isSupported,
    interimTranscript,
    confidenceScore,
    startListening,
    stopListening,
    resetTranscript
  };
}

export default useSpeechRecognition;
