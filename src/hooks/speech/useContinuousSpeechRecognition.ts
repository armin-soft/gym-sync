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
  const isRestartingRef = useRef(false);

  // Check browser support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  // Function to clean text and remove unwanted periods
  const cleanTranscriptText = useCallback((text: string) => {
    return text
      .trim()
      .replace(/\.$/, '') // Remove period at the end
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  }, []);

  const initializeRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = lang;
    recognition.maxAlternatives = maxAlternatives;

    // تنظیم برای حداکثر زمان ضبط
    if ('webkitSpeechRecognition' in window) {
      recognition.serviceURI = 'wss://www.google.com/speech-api/full-duplex/v1/up';
    }

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      isRestartingRef.current = false;
    };

    recognition.onresult = (event: any) => {
      let interimText = '';
      let finalText = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        let transcriptText = result[0].transcript;

        if (result.isFinal) {
          // Clean the transcript text and remove unwanted periods
          transcriptText = cleanTranscriptText(transcriptText);
          // اضافه کردن متن نهایی بدون محدودیت
          finalText += (finalText ? ' ' : '') + transcriptText;
          finalTranscriptRef.current = finalText;
        } else {
          // Clean interim text as well
          interimText += cleanTranscriptText(transcriptText);
        }
      }

      setTranscript(finalText);
      setInterimTranscript(interimText);
      // ارسال کل متن بدون محدودیت کاراکتر
      onTranscriptChange(finalText + (interimText ? ' ' + interimText : ''));
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      
      // در صورت خطا، تلاش برای شروع مجدد اگر کاربر هنوز گوش می‌دهد
      if (event.error === 'no-speech' || event.error === 'audio-capture' || event.error === 'network') {
        if (isListening && !isRestartingRef.current) {
          isRestartingRef.current = true;
          restartTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && isListening && !isRestartingRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.log('Failed to restart recognition:', e);
                isRestartingRef.current = false;
              }
            }
          }, 1000);
        }
      }
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      
      // اگر کاربر هنوز در حالت گوش دادن است و restart نمی‌شود، دوباره شروع کن
      if (isListening && !isRestartingRef.current) {
        isRestartingRef.current = true;
        restartTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            try {
              recognitionRef.current.start();
              isRestartingRef.current = false;
            } catch (e) {
              console.log('Recognition already started or not available');
              isRestartingRef.current = false;
            }
          }
        }, 100);
      } else if (!isListening) {
        setIsListening(false);
      }
    };

    return recognition;
  }, [isSupported, continuous, interimResults, lang, maxAlternatives, onTranscriptChange, isListening, cleanTranscriptText]);

  const startListening = useCallback(async () => {
    if (!isSupported || isListening) return;

    try {
      // Clear any existing timeouts
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }

      // Stop any existing recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      // Initialize new recognition
      const recognition = initializeRecognition();
      if (!recognition) return;

      recognitionRef.current = recognition;
      
      // Reset transcripts
      setInterimTranscript('');
      finalTranscriptRef.current = transcript;
      isRestartingRef.current = false;

      recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
    }
  }, [isSupported, isListening, initializeRecognition, transcript]);

  const stopListening = useCallback(() => {
    if (!isListening) return;

    setIsListening(false);
    isRestartingRef.current = false;
    
    // Clear restart timeout
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Clear interim transcript
    setInterimTranscript('');
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    onTranscriptChange('');
  }, [onTranscriptChange]);

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

  // Update transcript when initialValue changes
  useEffect(() => {
    if (initialValue !== transcript && !isListening) {
      setTranscript(initialValue);
      finalTranscriptRef.current = initialValue;
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
