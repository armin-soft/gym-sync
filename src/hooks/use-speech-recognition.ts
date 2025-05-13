
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
  const hasPermissionRequestedRef = useRef(false);

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

  // بررسی و درخواست دسترسی به میکروفون
  const requestMicrophonePermission = useCallback(async () => {
    if (hasPermissionRequestedRef.current) return true;
    
    try {
      // درخواست دسترسی به میکروفون
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // رهاسازی منابع پس از دریافت دسترسی
      stream.getTracks().forEach(track => track.stop());
      
      hasPermissionRequestedRef.current = true;
      return true;
    } catch (error) {
      console.error("Error requesting microphone permission:", error);
      toast({
        title: "خطا در دسترسی به میکروفون",
        description: "لطفا دسترسی به میکروفون را اجازه دهید.",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  // راه‌اندازی و پیکربندی Web Speech API با تنظیمات بهینه برای زبان فارسی
  const setupRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    
    // تنظیمات بهینه برای تشخیص زبان فارسی
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 3; // افزایش گزینه‌های جایگزین برای دقت بیشتر
    
    // تنظیم دقت تشخیص
    if ((recognition as any).audioThreshold !== undefined) {
      (recognition as any).audioThreshold = 0.1; // حساسیت صدا (در صورت پشتیبانی)
    }
    
    // سازگاری بیشتر با مرورگرها
    if (navigator.userAgent.indexOf("Edge") !== -1) {
      recognition.continuous = false; // در Edge مداوم کار نمی‌کند
    }
    
    // برای مرورگر سافاری تنظیمات خاص
    if (navigator.userAgent.indexOf("Safari") !== -1 && 
        navigator.userAgent.indexOf("Chrome") === -1) {
      recognition.interimResults = false; // در برخی نسخه‌های سافاری نتایج میانی خوب کار نمی‌کند
    }

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
          setTimeout(() => {
            if (isListening) {
              recognitionRef.current.start();
            }
          }, 250); // زمان انتظار کوتاه‌تر برای شروع مجدد سریع‌تر
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
      } else if (event.error === "audio-capture") {
        toast({
          title: "خطا",
          description: "میکروفون قابل دسترسی نیست یا در حال استفاده توسط برنامه دیگری است.",
          variant: "destructive",
        });
        setIsListening(false);
      } else if (event.error === "network") {
        // خطای شبکه در برخی مرورگرها
        toast({
          title: "خطای شبکه",
          description: "مشکلی در ارتباط با سرویس تشخیص گفتار وجود دارد.",
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

    // بهبود الگوریتم پردازش نتایج
    recognition.onresult = (event: any) => {
      let interim = "";
      let final = transcript;
      let bestConfidence = 0;
      let bestTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        // انتخاب بهترین تشخیص با بالاترین دقت از بین چند گزینه
        for (let j = 0; j < event.results[i].length; j++) {
          const currentTranscript = event.results[i][j].transcript;
          const confidence = event.results[i][j].confidence;
          
          // یافتن تشخیص با بالاترین دقت
          if (confidence > bestConfidence) {
            bestConfidence = confidence;
            bestTranscript = currentTranscript;
          }
        }
        
        // استفاده از بهترین تشخیص
        if (event.results[i].isFinal) {
          final += " " + bestTranscript;
          // اصلاح کلمات فارسی متداول
          final = correctPersianWords(final);
        } else {
          interim = bestTranscript;
        }
        
        // بازنشانی برای نتایج بعدی
        bestConfidence = 0;
        bestTranscript = "";
      }

      // اعمال نتایج نهایی
      setTranscript(final.trim());
      onTranscriptChange(final.trim());
      setInterimTranscript(interim);
    };

    return recognition;
  }, [transcript, onTranscriptChange, toast, isListening, lang]);

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
  }, [isSupported, setupRecognition, requestMicrophonePermission]);

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
