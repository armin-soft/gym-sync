
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Mic, MicOff, RefreshCw, Wand2, Check, X, 
  Waves, Volume2, ListRestart, Loader2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "@/hooks/speech";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface SpeechToTextAdvancedProps {
  onTranscriptChange: (transcript: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
  multiLine?: boolean;
  onClose?: () => void;
  isDialog?: boolean;
}

export const SpeechToTextAdvanced = ({
  onTranscriptChange,
  value = "",
  placeholder = "برای شروع ضبط صدا، روی دکمه میکروفون کلیک کنید",
  className,
  multiLine = false,
  onClose,
  isDialog = false,
}: SpeechToTextAdvancedProps) => {
  const { toast } = useToast();
  const [showTips, setShowTips] = useState(false);
  const [confidence, setConfidence] = useState(0);
  
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
    multiLine,
    onInterimTranscriptChange: (interim, confidenceScore) => {
      if (confidenceScore) {
        setConfidence(confidenceScore);
      }
    }
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

  // پاک کردن متن با بازخورد به کاربر
  const clearTranscript = () => {
    resetTranscript();
    toast({
      title: "پاک شد",
      description: "متن پاک شد."
    });
  };

  // استفاده از متن و بستن دیالوگ
  const handleUseText = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div 
      className={cn(
        "flex flex-col gap-4 p-1", 
        isDialog ? "h-full" : "",
        className
      )}
      dir="rtl"
    >
      {/* نوار ابزار بالایی */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className={cn(
              "py-1 px-2 transition-colors",
              isListening ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 border-red-200" : 
                "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            )}
          >
            {isListening ? (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center"
              >
                <Waves className="h-3 w-3 mr-1 animate-pulse" />
                در حال ضبط...
              </motion.div>
            ) : "آماده برای ضبط"}
          </Badge>
          
          {confidence > 0 && (
            <Badge 
              variant="outline" 
              className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200"
            >
              <Volume2 className="h-3 w-3 mr-1" />
              {Math.round(confidence * 100)}% اطمینان
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            size="sm" 
            variant="ghost"
            className="h-8 w-8 p-0" 
            onClick={() => setShowTips(!showTips)}
          >
            <Wand2 className="h-4 w-4" />
          </Button>
          {isDialog && (
            <Button 
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="flex-1 relative">
        <div 
          className="w-full h-64 min-h-[200px] bg-white dark:bg-gray-950 border border-input rounded-md p-3 overflow-y-auto whitespace-pre-wrap text-right focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          tabIndex={0}
        >
          {transcript || interimTranscript ? (
            <>
              {transcript && transcript.split('\n').map((line, index) => (
                <React.Fragment key={`line-${index}`}>
                  <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="text-foreground font-medium"
                  >
                    {line}
                  </motion.span>
                  {index < transcript.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
              {interimTranscript && (
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 0.7 }}
                  className="text-muted-foreground font-normal"
                >
                  {" "}{interimTranscript}
                </motion.span>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-full flex flex-col items-center justify-center text-center text-muted-foreground"
            >
              <Mic className="h-10 w-10 mb-2 opacity-20" />
              <p>{placeholder}</p>
              <p className="text-xs mt-2 max-w-xs">
                برای شروع، روی دکمه میکروفون کلیک کنید و نام حرکت را به زبان فارسی بیان کنید
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* نکات راهنما */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-md bg-blue-50 dark:bg-blue-950/30 p-3 text-sm text-blue-800 dark:text-blue-300">
              <h4 className="font-medium mb-1">نکات برای نتایج بهتر:</h4>
              <ul className="space-y-1 list-disc list-inside text-xs">
                <li>در محیطی آرام و بدون صدای مزاحم صحبت کنید</li>
                <li>شمرده و واضح صحبت کنید</li>
                <li>از فاصله مناسب با میکروفون استفاده کنید (۱۵-۳۰ سانتی‌متر)</li>
                <li>برای حرکات ترکیبی، نام‌ها را با "و" یا مکث جدا کنید</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نوار ابزار پایینی */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            disabled={!isSupported}
            onClick={toggleListening}
            className={cn(
              "transition-all flex items-center gap-2",
              isListening 
                ? "bg-red-500 text-white hover:bg-red-600 shadow-md" 
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            aria-label={isListening ? "توقف ضبط صدا" : "شروع ضبط صدا"}
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  key="stop"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center"
                >
                  <MicOff className="h-4 w-4" />
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
                  <Mic className="h-4 w-4" />
                  شروع ضبط
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={clearTranscript}
            disabled={!transcript && !interimTranscript}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            پاک کردن
          </Button>
        </div>
        
        {isDialog && (
          <Button
            type="button"
            size="sm"
            variant="default"
            onClick={handleUseText}
            disabled={!transcript}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            استفاده از متن
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpeechToTextAdvanced;
