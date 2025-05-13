
import { useEffect } from "react";
import { useSpeechRecognitionErrors } from "./useSpeechRecognitionErrors";

interface UseRecognitionEventHandlersProps {
  isListening: boolean;
  recognitionRef: React.RefObject<any>;
  restartTimeoutRef: React.RefObject<number | null>;
  handleRecognitionRestart: (delay: number) => void;
}

export function useRecognitionEventHandlers({
  isListening,
  recognitionRef,
  restartTimeoutRef,
  handleRecognitionRestart,
}: UseRecognitionEventHandlersProps) {
  const { handleRecognitionError } = useSpeechRecognitionErrors();
  
  // Set up error and end event handlers
  useEffect(() => {
    if (!recognitionRef.current || !isListening) return;
    
    const recognition = recognitionRef.current;
    
    // Store original handlers if they exist
    const originalErrorHandler = recognition.onerror || (() => {});
    const originalEndHandler = recognition.onend || (() => {});
    
    // Error handler with automatic restart
    recognition.onerror = (event: any) => {
      originalErrorHandler(event);
      handleRecognitionError(event.error);
      
      // Attempt to restart if still in listening mode
      if (isListening) {
        handleRecognitionRestart(1000);
      }
    };
    
    // End handler with automatic restart
    recognition.onend = (event: any) => {
      originalEndHandler(event);
      
      // Automatically restart if still in listening mode
      if (isListening) {
        handleRecognitionRestart(500);
      }
    };
    
  }, [isListening, recognitionRef, handleRecognitionError, handleRecognitionRestart]);
  
  // Cleanup function to remove any pending restart timers
  const cleanupRestartTimers = () => {
    if (restartTimeoutRef.current !== null) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
  };
  
  return { cleanupRestartTimers };
}
