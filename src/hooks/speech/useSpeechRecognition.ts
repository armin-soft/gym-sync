
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
    multiLine
  });
  
  // Set up recognition instance with all needed config
  const setupRecognition = useRecognitionSetup({
    transcript,
    onTranscriptChange,
    setTranscript,
    setInterimTranscript,
    setIsListening,
    lang,
    multiLine
  });
  
  // Start listening function with improved cross-browser handling
  const startListening = useCallback(async () => {
    if (!isSupported) return Promise.reject("عدم پشتیبانی مرورگر");

    try {
      // First check if microphone devices are available
      if ('mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasAudioInput = devices.some(device => device.kind === 'audioinput');
        
        if (!hasAudioInput) {
          toast({
            title: "میکروفون یافت نشد",
            description: "هیچ میکروفون یا دستگاه ورودی صدایی به سیستم متصل نیست.",
            variant: "destructive",
          });
          return Promise.reject("میکروفون یافت نشد");
        }
      }
      
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

      // Create a new instance with additional delay for iOS devices
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      
      if (isIOS) {
        // iOS devices need a small delay before starting recognition
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
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
          // Try again after a short delay with different settings
          setTimeout(() => {
            recognitionRef.current = setupRecognition();
            try {
              // For some browsers, continuous mode causes issues
              if (recognitionRef.current && 'continuous' in recognitionRef.current) {
                recognitionRef.current.continuous = false;
              }
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
    } catch (error) {
      console.error("Error in startListening:", error);
      return Promise.reject("خطا در شروع تشخیص گفتار");
    }
  }, [isSupported, setupRecognition, requestMicrophonePermission, showRecordingStartedToast, recognitionState, recognitionRef, setIsListening, setRecognitionState, toast]);

  // Stop listening function with improved error handling
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping recognition:", err);
        // Force state update even if stop fails
        setIsListening(false);
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
    startListening,
    stopListening,
    resetTranscript
  };
}

export default useSpeechRecognition;
