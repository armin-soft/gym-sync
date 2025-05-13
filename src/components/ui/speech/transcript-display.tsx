
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TranscriptDisplayProps {
  transcript: string;
  interimTranscript: string;
  placeholder: string;
}

export const TranscriptDisplay = ({
  transcript,
  interimTranscript,
  placeholder
}: TranscriptDisplayProps) => {
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  // اسکرول خودکار به پایین متن هنگام تغییر
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript, interimTranscript]);

  return (
    <div 
      className="flex-1 relative min-h-[200px] bg-white dark:bg-gray-950 border border-input rounded-md overflow-hidden"
      tabIndex={0}
      dir="rtl"
    >
      <div 
        ref={transcriptRef}
        className="absolute inset-0 p-3 overflow-y-auto whitespace-pre-wrap text-right focus:outline-none"
      >
        {transcript || interimTranscript ? (
          <>
            {transcript && transcript.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                <span className="text-foreground font-medium">{line}</span>
                {index < transcript.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
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
