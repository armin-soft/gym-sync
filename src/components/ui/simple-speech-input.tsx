
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSimpleSpeechRecognition } from "@/hooks/speech/useSimpleSpeechRecognition";

interface SimpleSpeechInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SimpleSpeechInput({ 
  value, 
  onChange, 
  placeholder = "برای شروع ضبط صدا، روی میکروفون کلیک کنید",
  className 
}: SimpleSpeechInputProps) {
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSimpleSpeechRecognition({
    onTranscriptChange: onChange,
    initialValue: value,
    lang: "fa-IR"
  });

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleClear = () => {
    resetTranscript();
  };

  return (
    <div className={cn("space-y-2", className)} dir="rtl">
      <div className="flex items-stretch w-full">
        <div 
          className={cn(
            "relative flex-1 rounded-l-md border overflow-hidden transition-all duration-300",
            isListening 
              ? "border-red-400 bg-red-50/30" 
              : "border-input bg-background"
          )}
        >
          <div className="px-3 py-2 pr-12 h-11 text-right w-full overflow-hidden whitespace-nowrap text-ellipsis">
            {transcript || interimTranscript || placeholder}
            {interimTranscript && (
              <span className="text-muted-foreground"> {interimTranscript}</span>
            )}
          </div>
          
          {/* Clear button */}
          <AnimatePresence>
            {(transcript || interimTranscript) && !isListening && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleClear}
                type="button"
              >
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        <Button
          type="button"
          className={cn(
            "h-11 px-3 rounded-l-none rounded-r-md transition-all duration-300",
            isListening 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-primary hover:bg-primary/90"
          )}
          onClick={handleToggle}
          disabled={!isSupported}
        >
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="mic-off"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <MicOff className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Mic className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
      
      {isListening && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center"
        >
          <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-xs">
            در حال ضبط... واضح صحبت کنید
          </span>
        </motion.div>
      )}
      
      {!isSupported && (
        <div className="text-xs text-rose-600 text-center px-2 py-1 bg-rose-50 rounded-md">
          مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند
        </div>
      )}
    </div>
  );
}
