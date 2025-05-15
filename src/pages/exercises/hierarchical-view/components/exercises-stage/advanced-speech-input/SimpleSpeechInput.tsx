import React, { useState, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/speech";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export interface SimpleSpeechInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SimpleSpeechInput({
  value,
  onChange,
  placeholder = "نام حرکت را وارد کنید",
  className
}: SimpleSpeechInputProps) {
  const { toast } = useToast();
  const [animateButton, setAnimateButton] = useState(false);

  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    initialValue: value,
    onTranscriptChange: onChange,
    lang: "fa-IR",
    multiLine: false
  });

  // Local state for text input
  const [textInputValue, setTextInputValue] = useState(value);

  useEffect(() => {
    // Keep local value in sync with external value 
    setTextInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAnimateButton(prev => !prev);
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isListening]);

  const handleToggleListen = async () => {
    if (isListening) {
      stopListening();
      toast({
        title: "ضبط صدا متوقف شد",
        description: "متن گفتار شما ثبت شد.",
      });
    } else {
      try {
        await startListening();
        toast({
          title: "ضبط صدا شروع شد",
          description: "در حال گوش دادن به صحبت شما...",
        });
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

  // Handle text input change
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTextInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="relative flex items-center gap-2">
      <Input
        value={textInputValue}
        onChange={handleTextInputChange}
        placeholder={placeholder}
        className="flex-1 text-right"
        dir="rtl"
      />
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        animate={animateButton && isListening ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-md transition-all duration-300",
          isListening 
            ? "bg-red-500 hover:bg-red-600 text-white" 
            : "bg-indigo-600 hover:bg-indigo-700 text-white",
          !isSupported && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => isSupported && handleToggleListen()}
        disabled={!isSupported}
        aria-label={isListening ? "توقف ضبط صدا" : "شروع ضبط صدا"}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="mic-off"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-1"
            >
              <MicOff className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Mic className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      
      {isListening && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-14 top-full mt-1"
        >
          <span className="px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs">
            در حال ضبط...
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default SimpleSpeechInput;
