
import { RefObject, useEffect } from 'react';
import { RecognitionEvent, RecognitionState } from './speech-recognition-types';

interface UseRecognitionEventHandlersProps {
  recognition: SpeechRecognition | null;
  state: RecognitionState;
  setState: (state: RecognitionState) => void;
  onTextRecognized?: (text: string) => void;
  onError?: (error: string) => void;
  onRestart?: () => void;
  restartTimeoutRef: RefObject<number | null>;
  maxRestarts?: number;
  restartCountRef: RefObject<number>;
}

export const useRecognitionEventHandlers = ({
  recognition,
  state,
  setState,
  onTextRecognized,
  onError,
  onRestart,
  restartTimeoutRef,
  maxRestarts = 5,
  restartCountRef,
}: UseRecognitionEventHandlersProps) => {
  useEffect(() => {
    if (!recognition) return;

    const handleStart = () => {
      setState({ ...state, isRecording: true, error: '' });
    };

    const handleEnd = () => {
      // Reset restartCount if we've been recording for a while
      if (state.isRecording && Date.now() - state.startTime > 10000) {
        if (restartCountRef.current) {
          restartCountRef.current = 0;
        }
      }

      setState({ ...state, isRecording: false });

      if (state.autoRestart && !state.isStopped) {
        // Avoid memory leaks by clearing any existing timeout
        if (restartTimeoutRef.current) {
          window.clearTimeout(restartTimeoutRef.current);
        }

        // Only restart if we haven't exceeded maxRestarts
        if (restartCountRef.current !== null && restartCountRef.current < maxRestarts) {
          const timeoutId = window.setTimeout(() => {
            if (onRestart) onRestart();
          }, 300);
          
          // Using non-null assertion here because we checked above
          if (restartCountRef.current !== null) {
            restartCountRef.current += 1;
          }
          
          // Safely assign to current property only if it's writable
          if (restartTimeoutRef && typeof restartTimeoutRef === 'object' && restartTimeoutRef.current !== null) {
            // Use type assertion to handle the read-only property
            (restartTimeoutRef as { current: number | null }).current = timeoutId;
          }
        } else {
          setState({
            ...state,
            error: 'تعداد تلاش‌های مجدد به حداکثر رسید. لطفاً مجدد تلاش کنید.',
            isStopped: true,
          });
          if (onError) onError('تعداد تلاش‌های مجدد به حداکثر رسید. لطفاً مجدد تلاش کنید.');
        }
      }
    };

    const handleResult = (event: RecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = state.transcript || '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          // Call callback with recognized text
          if (onTextRecognized) onTextRecognized(transcript);
        } else {
          interimTranscript += transcript;
        }
      }

      setState({
        ...state,
        transcript: finalTranscript,
        interimTranscript,
      });
    };

    const handleError = (event: RecognitionEvent) => {
      const errorMessage = event.error || 'خطای نامشخص در تشخیص گفتار';
      setState({
        ...state,
        error: errorMessage,
        isRecording: false,
        isStopped: true,
      });
      if (onError) onError(errorMessage);
    };

    recognition.onstart = handleStart;
    recognition.onend = handleEnd;
    recognition.onresult = handleResult;
    recognition.onerror = handleError;

    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;
    };
  }, [recognition, state, setState, onTextRecognized, onError, onRestart, maxRestarts, restartTimeoutRef, restartCountRef]);
};
