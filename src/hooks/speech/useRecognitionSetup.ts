
import { useCallback } from "react";

interface UseRecognitionSetupProps {
  transcript: string;
  onTranscriptChange: (transcript: string) => void;
  setTranscript: (transcript: string) => void;
  setInterimTranscript: (interim: string) => void;
  setIsListening: (isListening: boolean) => void;
  lang: string;
  correctPersianWords: (text: string) => string;
  multiLine?: boolean;
}

export function useRecognitionSetup({
  transcript,
  onTranscriptChange,
  setTranscript,
  setInterimTranscript,
  setIsListening,
  lang,
  correctPersianWords,
  multiLine = false
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
      console.log("Speech recognition started");
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    // کلمات کلیدی برای تشخیص خط جدید (فقط در حالت چند خطی)
    const newLineKeywords = [
      "حرکت بعدی", 
      "حرکت جدید", 
      "خط جدید", 
      "بعدی", 
      "جدید", 
      "تمام شد",
      "حرکت دیگر",
      "بره خط بعد",
      "برو خط بعد"
    ];

    // بهبود الگوریتم پردازش نتایج
    recognition.onresult = (event: any) => {
      let interim = "";
      let final = transcript;
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        // یافتن بهترین تشخیص با بالاترین دقت
        let bestConfidence = 0;
        let bestTranscript = "";

        for (let j = 0; j < event.results[i].length; j++) {
          const currentTranscript = event.results[i][j].transcript;
          const confidence = event.results[i][j].confidence;
          
          if (confidence > bestConfidence) {
            bestConfidence = confidence;
            bestTranscript = currentTranscript;
          }
        }
        
        if (event.results[i].isFinal) {
          const processedText = bestTranscript.trim();
          
          // بررسی کلمات کلیدی برای خط جدید (فقط در حالت چند خطی)
          const hasNewLineCommand = multiLine && newLineKeywords.some(keyword => 
            processedText.toLowerCase().includes(keyword.toLowerCase())
          );
          
          if (hasNewLineCommand) {
            // افزودن خط جدید و جلوگیری از افزودن متن کلمات کلیدی
            final += "\n";
            console.log("Added new line based on voice command");
          } else {
            // اضافه کردن متن به انتهای خط فعلی
            final += " " + processedText;
          }
          
          // اصلاح کلمات فارسی متداول
          final = correctPersianWords(final);
          
          // تمیز کردن فضاهای خالی اضافی
          final = final.replace(/\s+/g, " ")
                       .replace(/\n +/g, "\n")
                       .replace(/\n+/g, "\n")
                       .trim();
        } else {
          interim = bestTranscript;
        }
      }

      // اعمال نتایج نهایی
      setTranscript(final.trim());
      onTranscriptChange(final.trim());
      setInterimTranscript(interim);
    };

    return recognition;
  }, [transcript, onTranscriptChange, setTranscript, setInterimTranscript, setIsListening, lang, correctPersianWords, multiLine]);
}
