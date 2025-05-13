
import React, { KeyboardEvent, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TranscriptDisplayProps {
  transcript: string;
  interimTranscript: string;
  placeholder: string;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export const TranscriptDisplay = ({
  transcript,
  interimTranscript,
  placeholder,
  onKeyDown
}: TranscriptDisplayProps) => {
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  // اضافه کردن اسکرول خودکار به پایین متن هنگام تغییر
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript, interimTranscript]);

  return (
    <div 
      className="flex-1 relative min-h-[150px] bg-white dark:bg-gray-950 border border-input rounded-md overflow-hidden"
      onKeyDown={onKeyDown}
      tabIndex={0}
      dir="rtl"
    >
      <div 
        ref={transcriptRef}
        className="absolute inset-0 p-3 overflow-y-auto whitespace-pre-wrap text-right focus:outline-none"
      >
        {transcript || interimTranscript ? (
          <>
            <span className="text-foreground font-medium">{transcript}</span>
            {interimTranscript && (
              <span className="text-muted-foreground font-normal"> {interimTranscript}</span>
            )}
          </>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </div>
    </div>
  );
};
