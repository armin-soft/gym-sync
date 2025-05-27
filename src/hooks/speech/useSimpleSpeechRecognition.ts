
import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SimpleSpeechRecognitionProps {
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
  lang?: string;
}

export function useSimpleSpeechRecognition({ 
  onTranscriptChange, 
  initialValue = "",
  lang = "fa-IR" 
}: SimpleSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  
  // Check browser support
  const isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  
  const initializeRecognition = useCallback(() => {
    if (!isSupported) return null;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsListening(true);
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
      setIsListening(false);
      setInterimTranscript("");
      
      if (event.error !== 'aborted') {
        toast({
          title: "خطا در تشخیص گفتار",
          description: "لطفاً دوباره تلاش کنید",
          variant: "destructive"
        });
      }
    };
    
    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
      setInterimTranscript("");
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
        recognitionRef.current.stop();
      }
      
      // Create new recognition instance
      recognitionRef.current = initializeRecognition();
      
      if (recognitionRef.current) {
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
      recognitionRef.current.stop();
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
