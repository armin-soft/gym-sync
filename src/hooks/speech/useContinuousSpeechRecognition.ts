
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseContinuousSpeechRecognitionOptions {
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

export const useContinuousSpeechRecognition = ({
  onTranscriptChange,
  initialValue = '',
  lang = 'fa-IR',
  continuous = true,
  interimResults = true,
  maxAlternatives = 1
}: UseContinuousSpeechRecognitionOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef(initialValue);
  const lastNotifiedTranscriptRef = useRef(initialValue);

  // Check browser support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  // Only notify parent when transcript actually changes to prevent loops
  const notifyTranscriptChange = useCallback((newTranscript: string) => {
    if (lastNotifiedTranscriptRef.current !== newTranscript) {
      lastNotifiedTranscriptRef.current = newTranscript;
      onTranscriptChange(newTranscript);
    }
  }, [onTranscriptChange]);

  const initializeRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = lang;
    recognition.maxAlternatives = maxAlternatives;

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let interimText = '';
      let finalText = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcriptText = result[0].transcript;

        if (result.isFinal) {
          finalText += transcriptText;
          finalTranscriptRef.current = finalText;
        } else {
          interimText += transcriptText;
        }
      }

      setTranscript(finalText);
      setInterimTranscript(interimText);
      notifyTranscriptChange(finalText + interimText);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        if (isListening) {
          restartTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && isListening) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.log('Failed to restart recognition:', e);
              }
            }
          }, 1000);
        }
      }
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      
      if (isListening) {
        restartTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.log('Recognition already started or not available');
            }
          }
        }, 100);
      }
    };

    return recognition;
  }, [isSupported, continuous, interimResults, lang, maxAlternatives, notifyTranscriptChange, isListening]);

  const startListening = useCallback(async () => {
    if (!isSupported || isListening) return;

    try {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const recognition = initializeRecognition();
      if (!recognition) return;

      recognitionRef.current = recognition;
      
      setInterimTranscript('');
      finalTranscriptRef.current = transcript;

      recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
    }
  }, [isSupported, isListening, initializeRecognition, transcript]);

  const stopListening = useCallback(() => {
    if (!isListening) return;

    setIsListening(false);
    
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setInterimTranscript('');
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    lastNotifiedTranscriptRef.current = '';
    notifyTranscriptChange('');
  }, [notifyTranscriptChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Update transcript when initialValue changes, but prevent circular updates
  useEffect(() => {
    if (initialValue !== transcript && !isListening && initialValue !== lastNotifiedTranscriptRef.current) {
      setTranscript(initialValue);
      finalTranscriptRef.current = initialValue;
      lastNotifiedTranscriptRef.current = initialValue;
    }
  }, [initialValue, transcript, isListening]);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
};

export default useContinuousSpeechRecognition;
