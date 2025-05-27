
import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ContinuousSpeechRecognitionProps {
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
  lang?: string;
}

export function useContinuousSpeechRecognition({ 
  onTranscriptChange, 
  initialValue = "",
  lang = "fa-IR" 
}: ContinuousSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const isManualStop = useRef(false);
  const { toast } = useToast();
  
  // Check browser support
  const isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  
  const initializeRecognition = useCallback(() => {
    if (!isSupported) return null;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = lang;
    recognition.continuous = true; // تغییر به true برای ضبط پیوسته
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      console.log("Continuous speech recognition started");
      setIsListening(true);
      isManualStop.current = false;
    };
    
    recognition.onresult = (event: any) => {
      let finalText = "";
      let interimText = "";
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const resultText = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalText += resultText;
        } else {
          interimText += resultText;
        }
      }
      
      if (finalText) {
        const newTranscript = (transcript + " " + finalText).trim();
        setTranscript(newTranscript);
        onTranscriptChange(newTranscript);
        setInterimTranscript("");
      } else {
        setInterimTranscript(interimText);
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      
      // اگر خطا به دلیل توقف دستی نیست، دوباره شروع کن
      if (!isManualStop.current && event.error !== 'aborted') {
        if (event.error === 'no-speech') {
          // در صورت عدم تشخیص صدا، دوباره شروع کن
          setTimeout(() => {
            if (!isManualStop.current && recognitionRef.current) {
              recognitionRef.current.start();
            }
          }, 1000);
        } else {
          toast({
            title: "خطا در تشخیص گفتار",
            description: "در حال تلاش مجدد...",
            variant: "destructive"
          });
          
          // تلاش مجدد پس از 2 ثانیه
          setTimeout(() => {
            if (!isManualStop.current) {
              startListening();
            }
          }, 2000);
        }
      }
      
      setInterimTranscript("");
    };
    
    recognition.onend = () => {
      console.log("Speech recognition ended");
      
      // اگر توقف دستی نبوده، دوباره شروع کن
      if (!isManualStop.current) {
        setTimeout(() => {
          if (!isManualStop.current && recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 100);
      } else {
        setIsListening(false);
        setInterimTranscript("");
      }
    };
    
    return recognition;
  }, [isSupported, lang, transcript, onTranscriptChange, toast]);
  
  const startListening = useCallback(async () => {
    if (!isSupported) {
      toast({
        title: "عدم پشتیبانی مرورگر",
        description: "مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Stop any existing recognition
      if (recognitionRef.current) {
        isManualStop.current = true;
        recognitionRef.current.stop();
      }
      
      // Create new recognition instance
      recognitionRef.current = initializeRecognition();
      
      if (recognitionRef.current) {
        isManualStop.current = false;
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      toast({
        title: "خطا در دسترسی به میکروفون",
        description: "لطفاً دسترسی به میکروفون را فعال کنید",
        variant: "destructive"
      });
    }
  }, [isSupported, initializeRecognition, toast]);
  
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      isManualStop.current = true;
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);
  
  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    onTranscriptChange("");
  }, [onTranscriptChange]);
  
  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
}
