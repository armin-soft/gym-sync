
import React, { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/speech";
import { TranscriptDisplay } from "@/components/ui/speech/transcript-display";
import { ControlButtons } from "@/components/ui/speech/control-buttons";
import { RecordingIndicator } from "@/components/ui/speech/recording-indicator";

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
  
  const {
    transcript,
    isListening,
    isSupported,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    initialValue: value,
    onTranscriptChange,
    lang: "fa-IR" // تأکید بر زبان فارسی
  });

  // شروع و پایان ضبط صدا با مدیریت خطاها
  const toggleListening = async () => {
    if (isListening) {
      stopListening();
      toast({
        title: "ضبط صدا متوقف شد",
        description: "متن گفتار شما ثبت شد.",
      });
    } else {
      try {
        await startListening();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast({
          title: "خطا",
          description: "خطا در شروع تشخیص گفتار. لطفاً دوباره تلاش کنید.",
          variant: "destructive",
        });
      }
    }
  };

  // پاک کردن متن با بازخورد به کاربر
  const clearTranscript = () => {
    resetTranscript();
    toast({
      title: "پاک شد",
      description: "متن پاک شد."
    });
  };

  // اضافه کردن قابلیت اینتر برای رفتن به خط بعدی
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newValue = transcript + "\n";
      onTranscriptChange(newValue);
    }
  };

  return (
    <div className={cn("space-y-2", className)} dir="rtl">
      <div className="relative w-full flex gap-2 items-center">
        <TranscriptDisplay 
          transcript={transcript}
          interimTranscript={interimTranscript}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
        
        <ControlButtons 
          isListening={isListening}
          isSupported={isSupported}
          hasContent={!!(transcript || interimTranscript)}
          onToggleListening={toggleListening}
          onClearTranscript={clearTranscript}
        />
      </div>
      
      <RecordingIndicator isRecording={isListening} />
      
      {/* راهنمای استفاده بهینه برای کاربر */}
      {isListening && (
        <div className="text-xs text-muted-foreground text-right mt-1 pr-1">
          <p>برای دقت بیشتر، لطفاً واضح و با سرعت معمولی صحبت کنید.</p>
        </div>
      )}
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
