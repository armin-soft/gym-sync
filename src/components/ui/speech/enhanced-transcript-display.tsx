
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface EnhancedTranscriptDisplayProps {
  transcript: string;
  interimTranscript: string;
  placeholder: string;
  className?: string;
}

export const EnhancedTranscriptDisplay = ({
  transcript,
  interimTranscript,
  placeholder,
  className
}: EnhancedTranscriptDisplayProps) => {
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  // اسکرول خودکار به پایین متن هنگام تغییر
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript, interimTranscript]);

  const hasContent = transcript || interimTranscript;

  return (
    <div 
      className={cn(
        "relative min-h-[200px] bg-white dark:bg-gray-950 border border-input rounded-md overflow-hidden",
        className
      )}
      tabIndex={0}
      dir="rtl"
    >
      {!hasContent && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center p-6">
            <div className="mb-2">
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="mx-auto text-muted-foreground/50"
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 18.5a6.5 6.5 0 0 0 4.5-11c-2.5 0-4.5 2-4.5 4.5v6.5Z"></path>
                <path d="M12 18.5a6.5 6.5 0 0 1-4.5-11c2.5 0 4.5 2 4.5 4.5v6.5Z"></path>
                <path d="M8 15h8"></path>
                <path d="M12 4v2"></path>
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">{placeholder}</p>
          </div>
        </motion.div>
      )}
      
      <div 
        ref={transcriptRef}
        className="absolute inset-0 p-4 overflow-y-auto whitespace-pre-wrap text-right focus:outline-none"
      >
        {hasContent && (
          <>
            {transcript && transcript.split('\n').map((line, index) => (
              <React.Fragment key={`line-${index}`}>
                <motion.span 
                  className="text-foreground font-medium block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {line}
                </motion.span>
                {index < transcript.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
            
            {interimTranscript && (
              <motion.span 
                className="text-muted-foreground font-normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
              > 
                {interimTranscript}
              </motion.span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedTranscriptDisplay;
