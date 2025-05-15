
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMicrophonePermission } from "./useMicrophonePermission";
import { useBrowserSupport } from "./useBrowserSupport";
import { useSpeechRecognitionErrors } from "./useSpeechRecognitionErrors";
import { useRecognitionRestart } from "./useRecognitionRestart";
import { useRecognitionState } from "./useRecognitionState";

export function useRecognitionCore() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  
  const { recognitionState, setRecognitionState } = useRecognitionState();
  const { toast } = useToast();
  const { requestMicrophonePermission } = useMicrophonePermission();
  const { showRecordingStartedToast, showRecordingStoppedToast } = useSpeechRecognitionErrors();
  const { checkBrowserSupport } = useBrowserSupport();
  
  const { 
    handleRestart, 
    restartTimeoutRef, 
    restartCountRef 
  } = useRecognitionRestart({
    recognition: recognitionRef.current,
    state: recognitionState,
    setState: setRecognitionState
  });

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
    toast
  };
}
