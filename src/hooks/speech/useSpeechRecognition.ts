
import { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { correctPersianWords } from "@/utils/persian-word-correction";
import { UseSpeechRecognitionProps, UseSpeechRecognitionReturn } from "./speech-recognition-types";
import { useMicrophonePermission } from "./useMicrophonePermission";
import { useRecognitionSetup } from "./useRecognitionSetup";
import { useSpeechRecognitionErrors } from "./useSpeechRecognitionErrors";
import { useRecognitionRestart } from "./useRecognitionRestart";
import { useRecognitionEventHandlers } from "./useRecognitionEventHandlers";
import { useBrowserSupport } from "./useBrowserSupport";

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
  const { showRecordingStartedToast, showRecordingStoppedToast } = useSpeechRecognitionErrors();
  const { checkBrowserSupport } = useBrowserSupport();
  
  // Set up recognition instance with all needed config and handlers
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

  // Configure restart functionality
  const { handleRecognitionRestart } = useRecognitionRestart({
    isListening,
    recognitionRef,
    startListening: async () => {}, // Placeholder - will be updated after function definition
    restartTimeoutRef
  });

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

  // Update the restart reference with actual startListening function
  useEffect(() => {
    // @ts-ignore - This is a workaround for circular reference
    useRecognitionRestart({
      isListening,
      recognitionRef,
      startListening,
      restartTimeoutRef
    });
  }, [startListening, isListening]);

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
  
  // Set up event handlers for error handling and automatic restarts
  const { cleanupRestartTimers } = useRecognitionEventHandlers({
    isListening,
    recognitionRef,
    restartTimeoutRef,
    handleRecognitionRestart
  });

  // تشخیص پشتیبانی مرورگر از Web Speech API
  useEffect(() => {
    const isSupportedByBrowser = checkBrowserSupport();
    setIsSupported(isSupportedByBrowser);
    
    return () => {
      // Stop recognition when unmounting
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      // Clean up any timers
      cleanupRestartTimers();
    };
  }, [toast, cleanupRestartTimers]);

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
