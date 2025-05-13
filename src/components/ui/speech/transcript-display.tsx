
import React, { KeyboardEvent } from "react";
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
  return (
    <div 
      className="flex-1 relative min-h-[45px] bg-white dark:bg-gray-950 border border-input rounded-md overflow-hidden"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
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
  );
};
