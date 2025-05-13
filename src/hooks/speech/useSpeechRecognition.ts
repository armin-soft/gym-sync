
import { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { correctPersianWords } from "@/utils/persian-word-correction";
import { UseSpeechRecognitionProps, UseSpeechRecognitionReturn } from "./speech-recognition-types";
import { useMicrophonePermission } from "./useMicrophonePermission";
import { useRecognitionSetup } from "./useRecognitionSetup";
import { useSpeechRecognitionErrors } from "./useSpeechRecognitionErrors";

export function useSpeechRecognition({
  lang = "fa-IR",
  onTranscriptChange,
  initialValue = "",
}: UseSpeechRecognitionProps): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [isSupported, setIsSupported] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  
  const { toast } = useToast();
  const { requestMicrophonePermission } = useMicrophonePermission();
  const { 
    handleRecognitionError, 
    showRecordingStartedToast, 
    showRecordingStoppedToast 
  } = useSpeechRecognitionErrors();
  
  const setupRecognition = useRecognitionSetup({
    transcript,
    onTranscriptChange,
    setTranscript,
    setInterimTranscript,
    setIsListening,
    lang,
    correctPersianWords
  });

  // تشخیص پشتیبانی مرورگر از Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      toast({
        title: "خطا",
        description: "مرورگر شما از تبدیل گفتار به نوشتار پشتیبانی نمی‌کند.",
        variant: "destructive",
      });
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  // شروع ضبط صدا
  const startListening = useCallback(async () => {
    if (!isSupported) return;

    // بررسی و درخواست دسترسی به میکروفون
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;

    if (!recognitionRef.current) {
      recognitionRef.current = setupRecognition();
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        showRecordingStartedToast();
      } catch (err) {
        console.error("Error starting recognition:", err);
        // در صورت بروز خطا، مجدداً راه‌اندازی کنید
        recognitionRef.current = setupRecognition();
        if (recognitionRef.current) {
          setTimeout(() => {
            recognitionRef.current.start();
          }, 200);
        }
      }
    }
  }, [isSupported, setupRecognition, requestMicrophonePermission, showRecordingStartedToast]);

  // توقف ضبط صدا
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      showRecordingStoppedToast();
    }
  }, [showRecordingStoppedToast]);

  // پاک کردن متن
  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    onTranscriptChange("");
  }, [onTranscriptChange]);

  // اضافه کردن مدیریت خطای بهتر
  useEffect(() => {
    if (recognitionRef.current) {
      const originalErrorHandler = recognitionRef.current.onerror;
      
      recognitionRef.current.onerror = (event: any) => {
        originalErrorHandler(event);
        handleRecognitionError(event.error);
      };
      
      // restart logic for continuous operation
      const originalEndHandler = recognitionRef.current.onend;
      
      recognitionRef.current.onend = (event: any) => {
        originalEndHandler(event);
        
        // اگر کاربر هنوز خواستار ضبط است، دوباره آن را شروع کنید
        if (isListening && recognitionRef.current) {
          try {
            console.log("Attempting to restart recognition automatically");
            setTimeout(() => {
              if (isListening) {
                recognitionRef.current.start();
              }
            }, 250);
          } catch (err) {
            console.error("Couldn't restart recognition:", err);
          }
        }
      };
    }
  }, [isListening, handleRecognitionError]);

  return {
    transcript,
    isListening,
    isSupported,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript
  };
}

export default useSpeechRecognition;
