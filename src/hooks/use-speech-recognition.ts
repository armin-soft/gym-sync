
import { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { correctPersianWords } from "@/utils/persian-word-correction";

interface UseSpeechRecognitionProps {
  lang?: string;
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
}

interface UseSpeechRecognitionReturn {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  interimTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition({
  lang = "fa-IR",
  onTranscriptChange,
  initialValue = "",
}: UseSpeechRecognitionProps): UseSpeechRecognitionReturn {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [isSupported, setIsSupported] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

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

  // راه‌اندازی و پیکربندی Web Speech API
  const setupRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // برای ضبط مداوم
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "ضبط صدا",
        description: "در حال گوش دادن به صحبت شما...",
      });
    };

    // وقتی تشخیص به پایان می‌رسد، اما به دلیل continuous=true این مورد فقط در خطا یا توقف دستی فراخوانی می‌شود
    recognition.onend = () => {
      setIsListening(false);
      console.log("Speech recognition ended");
      
      // اگر کاربر هنوز خواستار ضبط است، دوباره آن را شروع کنید
      // این قسمت برای اطمینان از ضبط مداوم است، حتی اگر به دلایل فنی متوقف شود
      if (isListening && recognitionRef.current) {
        try {
          console.log("Attempting to restart recognition automatically");
          recognitionRef.current.start();
        } catch (err) {
          console.error("Couldn't restart recognition:", err);
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      
      if (event.error === "not-allowed") {
        toast({
          title: "دسترسی به میکروفون",
          description: "لطفاً به مرورگر اجازه دسترسی به میکروفون را بدهید.",
          variant: "destructive",
        });
        setIsListening(false);
      } else if (event.error !== "aborted") {
        // اگر خطا به دلیل قطع دستی نبود، پیام خطا نمایش داده شود
        toast({
          title: "خطا",
          description: "خطا در تشخیص گفتار. لطفاً دوباره تلاش کنید.",
          variant: "destructive",
        });
        setIsListening(false);
      }
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      let final = transcript;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += " " + transcript;
          // اصلاح کلمات فارسی متداول
          final = correctPersianWords(final);
        } else {
          interim += transcript;
        }
      }

      setTranscript(final.trim());
      onTranscriptChange(final.trim());
      setInterimTranscript(interim);
    };

    return recognition;
  }, [transcript, onTranscriptChange, toast, isListening, lang]);

  // شروع ضبط صدا
  const startListening = useCallback(() => {
    if (!isSupported) return;

    if (!recognitionRef.current) {
      recognitionRef.current = setupRecognition();
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Error starting recognition:", err);
        // در صورت بروز خطا، مجدداً راه‌اندازی کنید
        recognitionRef.current = setupRecognition();
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      }
    }
  }, [isSupported, setupRecognition]);

  // توقف ضبط صدا
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  // پاک کردن متن
  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    onTranscriptChange("");
  }, [onTranscriptChange]);

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
