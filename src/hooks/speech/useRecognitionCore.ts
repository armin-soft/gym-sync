
import { useState, useEffect, useRef, useCallback } from 'react';
import { useBrowserSupport } from './useBrowserSupport';

interface RecognitionState {
  isListening: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
  isInitialized: boolean;
}

export const useRecognitionCore = () => {
  const { isSupported, isChecking } = useBrowserSupport();
  const [state, setState] = useState<RecognitionState>({
    isListening: false,
    transcript: '',
    confidence: 0,
    error: null,
    isInitialized: false
  });
  
  const recognitionRef = useRef<any>(null);
  const initializationAttempted = useRef(false);
  
  const initializeRecognition = useCallback(() => {
    // Prevent multiple initialization attempts
    if (initializationAttempted.current || !isSupported || isChecking) {
      return;
    }
    
    initializationAttempted.current = true;
    
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setState(prev => ({
          ...prev,
          error: 'تشخیص گفتار در این مرورگر پشتیبانی نمی‌شود',
          isInitialized: false
        }));
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'fa-IR';
      
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let confidence = 0;
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            confidence = result[0].confidence;
          }
        }
        
        if (finalTranscript) {
          setState(prev => ({
            ...prev,
            transcript: finalTranscript.trim(),
            confidence,
            error: null
          }));
        }
      };
      
      recognition.onerror = (event: any) => {
        setState(prev => ({
          ...prev,
          error: `خطا در تشخیص گفتار: ${event.error}`,
          isListening: false
        }));
      };
      
      recognition.onend = () => {
        setState(prev => ({
          ...prev,
          isListening: false
        }));
      };
      
      recognitionRef.current = recognition;
      setState(prev => ({
        ...prev,
        isInitialized: true,
        error: null
      }));
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'خطا در راه‌اندازی تشخیص گفتار',
        isInitialized: false
      }));
    }
  }, [isSupported, isChecking]);
  
  // Initialize recognition only once when browser support is confirmed
  useEffect(() => {
    if (isSupported && !isChecking && !initializationAttempted.current) {
      initializeRecognition();
    }
  }, [isSupported, isChecking, initializeRecognition]);
  
  const startListening = useCallback(() => {
    if (!recognitionRef.current || !state.isInitialized) {
      setState(prev => ({
        ...prev,
        error: 'تشخیص گفتار راه‌اندازی نشده است'
      }));
      return;
    }
    
    try {
      setState(prev => ({
        ...prev,
        isListening: true,
        transcript: '',
        error: null
      }));
      
      recognitionRef.current.start();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'خطا در شروع تشخیص گفتار',
        isListening: false
      }));
    }
  }, [state.isInitialized]);
  
  const stopListening = useCallback(() => {
    if (recognitionRef.current && state.isListening) {
      recognitionRef.current.stop();
    }
  }, [state.isListening]);
  
  const resetTranscript = useCallback(() => {
    setState(prev => ({
      ...prev,
      transcript: '',
      confidence: 0,
      error: null
    }));
  }, []);
  
  return {
    ...state,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  };
};
