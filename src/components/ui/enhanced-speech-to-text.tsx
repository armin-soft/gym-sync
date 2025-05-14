
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "@/hooks/speech";
import { TranscriptDisplay } from "@/components/ui/speech/transcript-display";
import { RecordingIndicator } from "@/components/ui/speech/recording-indicator";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, RefreshCw, PauseCircle, Sparkles, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface EnhancedSpeechToTextProps {
  onTranscriptChange: (transcript: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
  multiLine?: boolean;
}

export const EnhancedSpeechToText = ({
  onTranscriptChange,
  value = "",
  placeholder = "برای شروع ضبط صدا، روی دکمه میکروفون کلیک کنید",
  className,
  multiLine = true,
}: EnhancedSpeechToTextProps) => {
  const { toast } = useToast();
  const [isPaused, setIsPaused] = useState(false);
  const [showTips, setShowTips] = useState(false);
  
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
    lang: "fa-IR",
    multiLine
  });

  // شروع و پایان ضبط صدا با مدیریت خطاها
  const toggleListening = async () => {
    if (isListening) {
      if (isPaused) {
        resumeListening();
      } else {
        pauseListening();
      }
    } else {
      try {
        await startListening();
        setIsPaused(false);
        toast({
          title: "ضبط صدا آغاز شد",
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
  
  const pauseListening = () => {
    stopListening();
    setIsPaused(true);
    toast({
      title: "ضبط صدا متوقف شد",
      description: "ضبط صدا موقتاً متوقف شد.",
    });
  };
  
  const resumeListening = async () => {
    try {
      await startListening();
      setIsPaused(false);
      toast({
        title: "ادامه ضبط صدا",
        description: "ضبط صدا ادامه می‌یابد...",
      });
    } catch (error) {
      console.error("Error resuming speech recognition:", error);
      toast({
        title: "خطا",
        description: "خطا در ادامه تشخیص گفتار.",
        variant: "destructive",
      });
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

  const hasContent = !!(transcript || interimTranscript);
  
  const recordingButtonClasses = cn(
    "relative transition-all overflow-hidden",
    isListening && !isPaused 
      ? "bg-red-500 hover:bg-red-600 text-white ring-4 ring-red-200 dark:ring-red-900"
      : isPaused 
        ? "bg-amber-500 hover:bg-amber-600 text-white" 
        : "bg-primary hover:bg-primary/90"
  );

  return (
    <div className={cn("space-y-3", className)} dir="rtl">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowTips(!showTips)}
            className="text-xs flex items-center gap-1.5"
          >
            <Sparkles size={14} className="text-amber-500" />
            {showTips ? "مخفی کردن راهنما" : "نمایش راهنما"}
          </Button>
          
          <RecordingIndicator isRecording={isListening && !isPaused} />
        </div>
        
        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-md p-3 text-sm"
            >
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">راهنمای استفاده بهینه:</h4>
              <ul className="space-y-1 pr-5 list-disc marker:text-blue-500">
                <li>برای دقت بیشتر، لطفاً واضح و با سرعت معمولی صحبت کنید.</li>
                <li>در محیط‌های کم سر و صدا ضبط کنید تا دقت بالاتری داشته باشید.</li>
                <li>برای نتیجه بهتر، فاصله مناسب با میکروفون را حفظ کنید.</li>
                <li>در صورت نیاز، می‌توانید ضبط را موقتاً متوقف کرده و سپس ادامه دهید.</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative">
          <TranscriptDisplay 
            transcript={transcript}
            interimTranscript={interimTranscript}
            placeholder={placeholder}
            className="min-h-[200px] shadow-sm border-gray-300 dark:border-gray-700"
          />
          
          <AnimatePresence>
            {isListening && (
              <motion.div 
                className="absolute bottom-3 left-3 flex gap-1 items-center bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full py-1 px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Volume2 size={14} className="text-primary" />
                </motion.div>
                <span className="text-xs text-primary-foreground">در حال شنیدن...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={clearTranscript}
              disabled={!hasContent}
              aria-label="پاک کردن متن"
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <RefreshCw className="h-4 w-4 ml-1" />
              پاک کردن
            </Button>
          </div>
          
          <motion.div className="flex items-center gap-2" layout>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button
                  type="button"
                  size="sm"
                  onClick={isPaused ? resumeListening : pauseListening}
                  disabled={!isSupported}
                  className={cn(
                    "transition-colors",
                    isPaused ? "bg-green-500 hover:bg-green-600" : "bg-amber-500 hover:bg-amber-600"
                  )}
                >
                  {isPaused ? (
                    <>
                      <Mic className="h-4 w-4 ml-1" />
                      ادامه ضبط
                    </>
                  ) : (
                    <>
                      <PauseCircle className="h-4 w-4 ml-1" />
                      توقف موقت
                    </>
                  )}
                </Button>
              </motion.div>
            )}
            
            <Button
              type="button"
              size="sm"
              onClick={toggleListening}
              disabled={!isSupported}
              className={recordingButtonClasses}
              aria-label={isListening ? "توقف ضبط صدا" : "شروع ضبط صدا"}
            >
              <AnimatePresence mode="wait">
                {isListening && !isPaused ? (
                  <motion.div
                    key="stop"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center"
                  >
                    <MicOff className="h-4 w-4 ml-1" />
                    توقف ضبط
                  </motion.div>
                ) : (
                  <motion.div
                    key="mic"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center"
                  >
                    <Mic className="h-4 w-4 ml-1" />
                    {isPaused ? "ادامه ضبط" : "شروع ضبط"}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {isListening && !isPaused && (
                <motion.span 
                  className="absolute inset-0 bg-white rounded-md opacity-20"
                  animate={{ 
                    scale: [1, 1.2, 1.2, 1],
                    opacity: [0.2, 0.15, 0.1, 0.2],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSpeechToText;
