
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOfflineSpeechRecognition } from "@/hooks/speech/useOfflineSpeechRecognition";
import { OfflineSpeechDownloadIndicator } from "./OfflineSpeechDownloadIndicator";
import { useMicrophonePermission } from "@/hooks/speech/useMicrophonePermission";
import { useToast } from "@/hooks/use-toast";

interface OfflineSpeechInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function OfflineSpeechInput({
  value,
  onChange,
  placeholder = "نام حرکت را وارد کنید",
  className
}: OfflineSpeechInputProps) {
  const { toast } = useToast();
  const { requestMicrophonePermission } = useMicrophonePermission();
  const [micPermissionGranted, setMicPermissionGranted] = useState<boolean | null>(null);
  const [animateRecording, setAnimateRecording] = useState(false);
  
  // استفاده از هوک تشخیص گفتار آفلاین
  const {
    transcript,
    isRecording,
    isModelLoaded,
    isModelLoading,
    downloadProgress,
    recordingProgress,
    loadModel,
    startRecording,
    resetTranscript
  } = useOfflineSpeechRecognition({
    onTranscriptChange: onChange,
    initialValue: value
  });

  // بررسی اولیه دسترسی میکروفون
  useEffect(() => {
    const checkMicPermission = async () => {
      const hasPermission = await requestMicrophonePermission();
      setMicPermissionGranted(hasPermission);
    };
    
    checkMicPermission();
  }, [requestMicrophonePermission]);

  // انیمیشن در حال ضبط
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAnimateRecording(prev => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  // شروع ضبط با چک کردن مجدد مجوز میکروفون
  const handleRecordClick = async () => {
    if (isRecording) return; // اگر در حال ضبط باشد، کاری انجام نمی‌دهیم
    
    if (!isModelLoaded) {
      toast({
        title: "مدل بارگذاری نشده",
        description: "ابتدا باید مدل تشخیص گفتار آفلاین را دانلود کنید.",
        variant: "destructive",
      });
      return;
    }
    
    // بررسی مجدد دسترسی میکروفون
    const hasPermission = await requestMicrophonePermission();
    setMicPermissionGranted(hasPermission);
    
    if (!hasPermission) {
      toast({
        title: "عدم دسترسی به میکروفون",
        description: "لطفا به برنامه اجازه دسترسی به میکروفون را بدهید.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "شروع ضبط صدا",
      description: "در حال ضبط... لطفا صحبت کنید.",
    });
    
    // شروع ضبط به مدت ۵ ثانیه
    startRecording(5000);
  };

  // پاک کردن متن
  const handleClearText = () => {
    resetTranscript();
    toast({
      title: "پاک شد",
      description: "متن پاک شد."
    });
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* فیلد نمایش متن */}
      <div className="flex items-stretch">
        <div 
          className={cn(
            "relative flex-1 rounded-l-md border overflow-hidden transition-all duration-300",
            isRecording 
              ? "border-purple-400 dark:border-purple-600 bg-purple-50/30 dark:bg-purple-950/10" 
              : "border-input bg-background",
            value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <div 
            className={cn(
              "px-3 py-2 pr-12 h-11 text-right w-full appearance-none outline-none select-none overflow-hidden whitespace-nowrap",
              "text-ellipsis transition-all duration-300",
              isRecording && "bg-gradient-to-r from-transparent to-purple-50 dark:to-purple-950/20"
            )}
          >
            {value || placeholder}
          </div>
          
          {/* دکمه پاک کردن متن */}
          <AnimatePresence>
            {value && !isRecording && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={handleClearText}
                aria-label="پاک کردن متن"
              >
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* نمایش پیشرفت ضبط */}
          {isRecording && (
            <div className="absolute left-0 right-0 bottom-0 h-1">
              <div 
                className="h-full bg-purple-500 transition-all duration-100"
                style={{ width: `${recordingProgress}%` }}
              />
            </div>
          )}
        </div>
        
        {/* دکمه ضبط صدا */}
        <Button
          type="button"
          disabled={!isModelLoaded || isModelLoading}
          onClick={handleRecordClick}
          className={cn(
            "rounded-l-none h-11",
            isRecording 
              ? "bg-purple-600 hover:bg-purple-700" 
              : isModelLoaded ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400"
          )}
        >
          <AnimatePresence mode="wait">
            {isRecording ? (
              <motion.div
                key="recording"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: animateRecording ? 1.1 : 1,
                  transition: { duration: 0.3 }
                }}
                exit={{ scale: 0 }}
              >
                <MicOff className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
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
      
      {/* نمایشگر وضعیت دانلود مدل */}
      <OfflineSpeechDownloadIndicator
        isModelLoaded={isModelLoaded}
        isModelLoading={isModelLoading}
        downloadProgress={downloadProgress}
        onStartDownload={loadModel}
      />
      
      {/* پیام وضعیت ضبط */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-purple-600 dark:text-purple-400 text-center"
          >
            در حال ضبط و تبدیل به متن... ({recordingProgress}%)
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* اطلاعات و راهنمایی کاربر */}
      <div className="text-xs text-muted-foreground text-center">
        <p>
          {isModelLoaded 
            ? "مدل تشخیص گفتار آفلاین آماده است. روی دکمه میکروفون کلیک کنید." 
            : "برای استفاده از تشخیص گفتار آفلاین، ابتدا مدل را دانلود کنید."}
        </p>
        {isModelLoaded && (
          <p className="mt-1 text-green-600 dark:text-green-400">
            شما می‌توانید بدون نیاز به اینترنت از این قابلیت استفاده کنید.
          </p>
        )}
      </div>
    </div>
  );
}
