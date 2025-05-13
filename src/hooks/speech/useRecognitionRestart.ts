
import { useCallback, RefObject } from "react";

interface UseRecognitionRestartProps {
  isListening: boolean;
  recognitionRef: RefObject<any>;
  startListening: () => Promise<void>;
  restartTimeoutRef: RefObject<number | null>;
}

export function useRecognitionRestart({
  isListening,
  recognitionRef,
  startListening,
  restartTimeoutRef,
}: UseRecognitionRestartProps) {
  
  // Restart recognition after error or end
  const handleRecognitionRestart = useCallback((delay: number = 500) => {
    if (!isListening) return;

    console.log("Attempting to restart recognition");
    
    // Clear any existing restart timers
    if (restartTimeoutRef.current !== null) {
      clearTimeout(restartTimeoutRef.current);
    }
    
    // Set a new restart timer
    restartTimeoutRef.current = window.setTimeout(() => {
      if (isListening) {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (err) {
            console.error("Couldn't restart recognition:", err);
            // Try with a fresh instance
            startListening().catch(err => console.error("Failed to restart:", err));
          }
        } else {
          // If no recognition instance exists, create a new one
          startListening().catch(err => console.error("Failed to restart:", err));
        }
      }
    }, delay) as unknown as number;
  }, [isListening, recognitionRef, restartTimeoutRef, startListening]);
  
  return { handleRecognitionRestart };
}
