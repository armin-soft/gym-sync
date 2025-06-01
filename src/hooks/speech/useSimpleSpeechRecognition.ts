import { useState, useEffect, useRef, useCallback } from 'react';
import { correctPersianWords } from "@/utils/persian-word-correction";

interface UseSimpleSpeechRecognitionOptions {
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  multiLine?: boolean;
}

export const useSimpleSpeechRecognition = ({
  onTranscriptChange,
  initialValue = '',
  lang = 'fa-IR',
  continuous = true,
  interimResults = true,
  maxAlternatives = 3,
  multiLine = false
}: UseSimpleSpeechRecognitionOptions) => {
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
    const SpeechRecognition = 
      window.SpeechRecognition || 
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  // Function to clean text and remove ALL periods
  const cleanTranscriptText = useCallback((text: string) => {
    let cleanedText = text
      .trim()
      .replace(/\.+/g, '') // Remove all periods (single or multiple)
      .replace(/\u06D4/g, '') // Remove Arabic-Indic period
      .replace(/\u2E3C/g, '') // Remove stenographic period
      .replace(/\u002E/g, '') // Remove ASCII period
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    // Apply Persian word correction
    cleanedText = correctPersianWords(cleanedText);
    
    return cleanedText;
  }, []);

  const initializeRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognition = 
      window.SpeechRecognition || 
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;
    
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    
    // Browser detection for optimized settings
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /android/i.test(navigator.userAgent);
    const isEdge = /Edge/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = /firefox/i.test(navigator.userAgent);
    
    // Base configuration for Persian language
    recognition.lang = lang;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = maxAlternatives;
    recognition.continuous = continuous;
    
    // Platform-specific optimizations for unlimited recording
    if (isEdge || isFirefox) {
      recognition.continuous = true; // Enable continuous for unlimited text
    }
    
    if (isSafari && !isIOS) {
      recognition.interimResults = true;
      recognition.continuous = true;
    }
    
    if (isIOS) {
      recognition.interimResults = true;
      recognition.continuous = false; // iOS limitation, but we'll restart automatically
    }
    
    if (isAndroid) {
      recognition.maxAlternatives = 5;
      recognition.continuous = true;
    }

    recognition.onstart = () => {
      console.log('Speech recognition started - unlimited mode');
      setIsListening(true);
      isRestartingRef.current = false;
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      
      // Auto-restart for unlimited recording if still listening
      if (isListening && !isRestartingRef.current) {
        isRestartingRef.current = true;
        restartTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            try {
              recognitionRef.current.start();
              isRestartingRef.current = false;
            } catch (e) {
              console.log('Auto-restart failed:', e);
              isRestartingRef.current = false;
            }
          }
        }, 100);
      } else if (!isListening) {
        setIsListening(false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      
      // Handle errors and continue unlimited recording
      if (event.error === 'no-speech' || event.error === 'audio-capture' || event.error === 'network') {
        if (isListening && !isRestartingRef.current) {
          isRestartingRef.current = true;
          restartTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && isListening) {
              try {
                recognitionRef.current.start();
                isRestartingRef.current = false;
              } catch (e) {
                console.log('Error restart failed:', e);
                isRestartingRef.current = false;
              }
            }
          }, 1000);
        }
      }
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      let final = finalTranscriptRef.current;
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        let bestConfidence = 0;
        let bestTranscript = "";
        
        // Find the best recognition result
        if (isIOS) {
          bestTranscript = event.results[i][0].transcript;
        } else {
          for (let j = 0; j < event.results[i].length; j++) {
            const currentTranscript = event.results[i][j].transcript;
            const confidence = event.results[i][j].confidence || 1;
            
            if (confidence > bestConfidence) {
              bestConfidence = confidence;
              bestTranscript = currentTranscript;
            }
          }
        }
        
        if (event.results[i].isFinal) {
          // Clean the transcript text and remove ALL periods
          const processedText = cleanTranscriptText(bestTranscript);
          
          // Add to existing text without limit
          final += (final ? " " : "") + processedText;
          
          // Handle multi-line formatting
          if (!multiLine) {
            final = final.replace(/\n/g, " ");
          }
          
          finalTranscriptRef.current = final;
        } else {
          interim = cleanTranscriptText(bestTranscript);
        }
      }

      // Update transcripts without character limits
      setTranscript(final);
      onTranscriptChange(final + (interim ? " " + interim : ""));
      setInterimTranscript(interim);
    };

    return recognition;
  }, [isSupported, lang, interimResults, maxAlternatives, continuous, multiLine, onTranscriptChange, isListening, cleanTranscriptText]);

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
      if (!recognition) throw new Error('Speech recognition not supported');

      recognitionRef.current = recognition;
      
      // Reset interim but keep existing transcript for unlimited mode
      setInterimTranscript('');
      finalTranscriptRef.current = transcript;
      isRestartingRef.current = false;

      recognition.start();
    } catch (error) {
      console.error('Error starting unlimited speech recognition:', error);
      setIsListening(false);
      throw error;
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

export default useSimpleSpeechRecognition;
