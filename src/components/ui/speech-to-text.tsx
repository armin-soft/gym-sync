
import React from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
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
    onTranscriptChange
  });

  // شروع و پایان ضبط صدا
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // پاک کردن متن
  const clearTranscript = () => {
    resetTranscript();
    toast({
      title: "پاک شد",
      description: "متن پاک شد."
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative w-full flex gap-2 items-center">
        <TranscriptDisplay 
          transcript={transcript}
          interimTranscript={interimTranscript}
          placeholder={placeholder}
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
