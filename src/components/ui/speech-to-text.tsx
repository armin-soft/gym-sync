
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface SpeechToTextProps {
  onTranscriptChange: (transcript: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

export const SpeechToText = ({
  onTranscriptChange,
  value = "",
  placeholder = "برای شروع ضبط صدا، روی آیکون میکروفون کلیک کنید",
  className,
}: SpeechToTextProps) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(value);
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
    recognition.lang = "fa-IR"; // تنظیم زبان به فارسی
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
  }, [transcript, onTranscriptChange, toast, isListening]);

  // اصلاح کلمات فارسی متداول و غلط‌های املایی رایج
  const correctPersianWords = (text: string): string => {
    // کلمات و عبارات رایج فارسی که ممکن است در تشخیص گفتار اشتباه شوند
    const corrections: Record<string, string> = {
      "سلام": "سلام",
      "خسته نباشید": "خسته نباشید",
      "ممنون": "ممنون",
      "تشکر": "تشکر",
      "سپاس": "سپاس",
      "حرکت": "حرکت",
      "تمرین": "تمرین",
      "ورزش": "ورزش",
      "دمبل": "دمبل",
      "هالتر": "هالتر",
      "پرس سینه": "پرس سینه",
      "جلو بازو": "جلو بازو",
      "پشت بازو": "پشت بازو",
      "اسکوات": "اسکوات",
      "زیربغل": "زیربغل",
      "سرشانه": "سرشانه",
      "پا": "پا",
      "کمر": "کمر",
      "شکم": "شکم",
      // اضافه کردن موارد بیشتر مطابق نیاز
    };

    let correctedText = text;
    
    // اعمال اصلاحات برای کلمات
    Object.keys(corrections).forEach(incorrect => {
      const regex = new RegExp(`\\b${incorrect}\\b`, "gi");
      correctedText = correctedText.replace(regex, corrections[incorrect]);
    });

    // حذف کاراکترهای غیرضروری
    correctedText = correctedText.replace(/\s+/g, " "); // حذف فاصله‌های اضافی
    
    return correctedText;
  };

  // شروع و پایان ضبط صدا
  const toggleListening = () => {
    if (!isSupported) return;

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    } else {
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
    }
  };

  // پاک کردن متن
  const clearTranscript = () => {
    setTranscript("");
    setInterimTranscript("");
    onTranscriptChange("");
    toast({
      title: "پاک شد",
      description: "متن پاک شد."
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative w-full flex gap-2 items-center">
        <div className="flex-1 relative min-h-[45px] bg-white dark:bg-gray-950 border border-input rounded-md overflow-hidden">
          <div className="absolute inset-0 p-3 overflow-y-auto whitespace-pre-wrap text-right">
            {transcript || interimTranscript ? (
              <>
                <span className="text-foreground">{transcript}</span>
                <span className="text-muted-foreground">{interimTranscript}</span>
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button
            type="button"
            size="icon"
            disabled={!isSupported}
            onClick={toggleListening}
            className={cn(
              "transition-all",
              isListening 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  key="stop"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center justify-center"
                >
                  <MicOff className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="mic"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center justify-center"
                >
                  <Mic className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={clearTranscript}
            disabled={!transcript && !interimTranscript}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center"
          >
            <Badge 
              variant="outline" 
              className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 flex items-center gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              در حال ضبط صدا...
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeechToText;

// گسترش اینترفیس Window برای تعریف SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}
