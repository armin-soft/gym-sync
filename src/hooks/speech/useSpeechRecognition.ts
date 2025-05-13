
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
  multiLine = false,
}: UseSpeechRecognitionProps): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [isSupported, setIsSupported] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<number | null>(null);
  
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
    correctPersianWords,
    multiLine
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
      // پاکسازی تایمر در هنگام خروج از کامپوننت
      if (restartTimeoutRef.current !== null) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [toast]);

  // شروع ضبط صدا
  const startListening = useCallback(async () => {
    if (!isSupported) return Promise.reject("عدم پشتیبانی مرورگر");

    // بررسی و درخواست دسترسی به میکروفون
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return Promise.reject("عدم دسترسی به میکروفون");

    // توقف هر پردازش قبلی که ممکن است هنوز فعال باشد
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping previous recognition instance:", err);
      }
      recognitionRef.current = null;
    }

    // ایجاد یک نمونه جدید
    recognitionRef.current = setupRecognition();
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        showRecordingStartedToast();
        return Promise.resolve();
      } catch (err) {
        console.error("Error starting recognition:", err);
        // در صورت بروز خطا، مجدداً تلاش کنید
        setTimeout(() => {
          recognitionRef.current = setupRecognition();
          try {
            recognitionRef.current.start();
            setIsListening(true);
            return Promise.resolve();
          } catch (secondErr) {
            console.error("Failed to restart recognition after error:", secondErr);
            setIsListening(false);
            return Promise.reject("خطا در شروع تشخیص گفتار");
          }
        }, 300);
      }
    }
    return Promise.reject("خطای ناشناخته");
  }, [isSupported, setupRecognition, requestMicrophonePermission, showRecordingStartedToast]);

  // توقف ضبط صدا
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping recognition:", err);
      }
      setIsListening(false);
      showRecordingStoppedToast();
    }
    
    // پاکسازی هر تایمری که برای راه‌اندازی مجدد تنظیم شده
    if (restartTimeoutRef.current !== null) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
  }, [showRecordingStoppedToast]);

  // پاک کردن متن
  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    onTranscriptChange("");
  }, [onTranscriptChange]);

  // اضافه کردن خط جدید به متن
  const addNewLine = useCallback(() => {
    const newTranscript = transcript + "\n";
    setTranscript(newTranscript);
    onTranscriptChange(newTranscript);
  }, [transcript, onTranscriptChange]);
  
  // مدیریت خطا و راه‌اندازی مجدد خودکار
  useEffect(() => {
    if (recognitionRef.current && isListening) {
      const recognition = recognitionRef.current;
      
      // مدیریت خطا
      const originalErrorHandler = recognition.onerror || (() => {});
      recognition.onerror = (event: any) => {
        originalErrorHandler(event);
        handleRecognitionError(event.error);
        
        // در صورت بروز خطا و هنوز فعال بودن وضعیت ضبط، تلاش مجدد
        if (isListening) {
          console.log("Attempting to restart after error");
          if (restartTimeoutRef.current !== null) {
            clearTimeout(restartTimeoutRef.current);
          }
          restartTimeoutRef.current = window.setTimeout(() => {
            if (isListening) {
              startListening().catch(err => console.error("Failed to restart:", err));
            }
          }, 1000) as unknown as number;
        }
      };
      
      // مدیریت پایان تشخیص صدا
      const originalEndHandler = recognition.onend || (() => {});
      recognition.onend = (event: any) => {
        originalEndHandler(event);
        
        // راه‌اندازی مجدد خودکار تنها اگر هنوز در حالت ضبط هستیم
        if (isListening) {
          console.log("Recognition ended, attempting to restart");
          if (restartTimeoutRef.current !== null) {
            clearTimeout(restartTimeoutRef.current);
          }
          restartTimeoutRef.current = window.setTimeout(() => {
            if (isListening && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (err) {
                console.error("Couldn't restart recognition:", err);
                // تلاش دوباره با یک نمونه جدید
                startListening().catch(err => console.error("Failed to restart:", err));
              }
            }
          }, 500) as unknown as number;
        }
      };
    }
  }, [isListening, startListening, handleRecognitionError]);

  return {
    transcript,
    isListening,
    isSupported,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
    addNewLine
  };
}

export default useSpeechRecognition;
