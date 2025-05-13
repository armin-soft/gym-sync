
import { useCallback } from "react";

interface UseRecognitionSetupProps {
  transcript: string;
  onTranscriptChange: (transcript: string) => void;
  setTranscript: (transcript: string) => void;
  setInterimTranscript: (interim: string) => void;
  setIsListening: (isListening: boolean) => void;
  lang: string;
  correctPersianWords: (text: string) => string;
}

export function useRecognitionSetup({
  transcript,
  onTranscriptChange,
  setTranscript,
  setInterimTranscript,
  setIsListening,
  lang,
  correctPersianWords
}: UseRecognitionSetupProps) {
  return useCallback(() => {
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
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Speech recognition ended");
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
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
          const processedText = bestTranscript.trim();
          
          // تشخیص کلمات کلیدی برای اضافه کردن خط جدید
          if (processedText.includes("حرکت بعدی") || 
              processedText.includes("حرکت جدید") ||
              processedText.includes("خط جدید")) {
            final += "\n";
          } else {
            final += " " + processedText;
          }
          
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
  }, [transcript, onTranscriptChange, setTranscript, setInterimTranscript, setIsListening, lang, correctPersianWords]);
}
