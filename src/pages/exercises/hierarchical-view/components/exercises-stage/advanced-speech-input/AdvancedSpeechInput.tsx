
import React, { useState, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/speech";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Waves, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import WavesVisualizer from "./WavesVisualizer";
import SpeechPopover from "./SpeechPopover";
import { useBrowserSupport } from "@/hooks/speech/useBrowserSupport";
import { useMicrophonePermission } from "@/hooks/speech/useMicrophonePermission";

export interface AdvancedSpeechInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showRegularInput?: boolean;
}

export function AdvancedSpeechInput({
  value,
  onChange,
  placeholder = "نام حرکت را وارد کنید",
  className,
  showRegularInput = false
}: AdvancedSpeechInputProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [showPermissionReminder, setShowPermissionReminder] = useState(false);
  const { toast } = useToast();
  const [animateButton, setAnimateButton] = useState(false);
  const { isSupported, supportDetails } = useBrowserSupport();
  const { permissionStatus, requestMicrophonePermission, isDeviceAvailable, checkMicrophoneAvailability } = useMicrophonePermission();
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState<boolean | null>(null);
  const [hasShownMicNotFoundMessage, setHasShownMicNotFoundMessage] = useState(false);

  const {
    transcript,
    isListening,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    initialValue: value,
    onTranscriptChange: onChange,
    lang: "fa-IR",
    multiLine: false
  });

  // Device detection for platform-specific UI optimizations
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);
  const isChrome = typeof navigator !== 'undefined' && /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);
  const isFirefox = typeof navigator !== 'undefined' && /Firefox/.test(navigator.userAgent);
  const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;
  
  // Local state for text input
  const [textInputValue, setTextInputValue] = useState(value);

  useEffect(() => {
    // Keep local value in sync with external value 
    setTextInputValue(value);
  }, [value]);

  // بررسی وجود میکروفون در هنگام بارگذاری کامپوننت
  useEffect(() => {
    // بررسی اولیه وجود و دسترسی به میکروفون
    const checkMicAvailability = async () => {
      try {
        const available = await checkMicrophoneAvailability();
        setIsMicrophoneAvailable(available);
        
        if (available === false && !hasShownMicNotFoundMessage) {
          setShowPermissionReminder(true);
          // نمایش پیام در مورد عدم وجود میکروفون - فقط یکبار
          toast({
            title: "میکروفون یافت نشد",
            description: "هیچ میکروفونی به دستگاه متصل نیست یا توسط سیستم‌عامل شناسایی نشده است.",
            variant: "destructive",
          });
          setHasShownMicNotFoundMessage(true);
        }
      } catch (error) {
        console.error("خطا در بررسی میکروفون:", error);
      }
    };
    
    // بررسی پشتیبانی مرورگر
    if (!isSupported) {
      toast({
        title: "عدم پشتیبانی مرورگر",
        description: "مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند. از Chrome، Edge، Safari یا Firefox استفاده کنید.",
        variant: "destructive",
      });
    } else {
      checkMicAvailability();
    }
  }, [isSupported, toast, checkMicrophoneAvailability, hasShownMicNotFoundMessage]);

  // راهنمایی‌های مخصوص مرورگرها
  useEffect(() => {
    if (isMobile && permissionStatus !== 'granted') {
      // راهنمایی‌های مرورگرهای موبایل
      const timer = setTimeout(() => {
        setShowPermissionReminder(true);
        
        if (isIOS && isSafari) {
          toast({
            title: "نکته برای کاربران iOS در Safari",
            description: "برای فعال‌سازی میکروفون در Safari، به تنظیمات سایت بروید و دسترسی میکروفون را فعال کنید.",
            duration: 6000,
          });
        } else if (isAndroid && isChrome) {
          toast({
            title: "نکته برای کاربران Android",
            description: "اگر پنجره‌ای برای دسترسی میکروفون ندیدید، روی آیکون قفل در نوار آدرس کلیک کنید.",
            duration: 6000,
          });
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, permissionStatus, isIOS, isAndroid, isChrome, isSafari, toast]);

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
        // بررسی مجدد وجود میکروفون قبل از شروع به کار
        const micAvailable = await checkMicrophoneAvailability();
        
        if (!micAvailable) {
          toast({
            title: "میکروفون یافت نشد",
            description: "لطفاً اتصال میکروفون خود را بررسی کنید و مطمئن شوید که به درستی به سیستم متصل شده است.",
            variant: "destructive",
          });
          return;
        }
        
        // شروع ضبط صدا
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

  const handleClearText = () => {
    resetTranscript();
    setTextInputValue("");
    onChange("");
    toast({
      title: "پاک شد",
      description: "متن پاک شد."
    });
  };
  
  // Handle text input change
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTextInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="relative space-y-2">
      {/* Show text input if requested */}
      {showRegularInput && (
        <input
          type="text"
          value={textInputValue}
          onChange={handleTextInputChange}
          placeholder={placeholder}
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-shadow text-right"
          dir="rtl"
        />
      )}
      
      {/* Speech input component */}
      <div className="flex items-stretch w-full">
        <div 
          className={cn(
            "relative flex-1 rounded-l-md border overflow-hidden transition-all duration-300",
            isListening 
              ? "border-red-400 dark:border-red-600 bg-red-50/30 dark:bg-red-950/10" 
              : "border-input bg-background",
            (transcript || interimTranscript) ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <div 
            className={cn(
              "px-3 py-2 pr-12 h-11 text-right w-full appearance-none outline-none select-none overflow-hidden whitespace-nowrap",
              "text-ellipsis transition-all duration-300",
              isListening && "bg-gradient-to-r from-transparent to-red-50 dark:to-red-950/20"
            )}
          >
            {transcript || interimTranscript || placeholder}
          </div>
          
          {isListening && (
            <div className="absolute top-0 left-0 bottom-0 flex items-center justify-center px-3">
              <WavesVisualizer isActive={isListening} />
            </div>
          )}
          
          {/* Clear text button that shows only when there is text */}
          <AnimatePresence>
            {(transcript || interimTranscript) && !isListening && (
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
        </div>
        
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            animate={animateButton && isListening ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.5 }}
            className={cn(
              "flex items-center justify-center h-11 px-3 text-white rounded-r-md transition-all duration-300",
              isListening 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-indigo-600 hover:bg-indigo-700",
              (!isSupported || isMicrophoneAvailable === false) && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => isSupported && isMicrophoneAvailable !== false && handleToggleListen()}
            disabled={!isSupported || isMicrophoneAvailable === false}
            onMouseEnter={() => setShowPopover(true)}
            onMouseLeave={() => setShowPopover(false)}
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
          </motion.button>
          
          <SpeechPopover 
            show={showPopover && !isListening} 
            isListening={isListening}
          />
        </div>
      </div>
      
      {isListening && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute w-full text-center mt-1"
        >
          <span className="px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs">
            در حال ضبط... واضح صحبت کنید
          </span>
        </motion.div>
      )}
      
      {/* نمایش وضعیت دسترسی میکروفون یا هشدارها */}
      <AnimatePresence>
        {(showPermissionReminder && ((isMobile && permissionStatus !== 'granted') || isMicrophoneAvailable === false)) && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-amber-600 dark:text-amber-500 text-center px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-md"
          >
            {isMicrophoneAvailable === false ? (
              <>
                <p className="font-bold mb-1">میکروفونی یافت نشد</p>
                <p>لطفاً اتصال میکروفون خود را بررسی کرده و از اتصال صحیح آن به دستگاه اطمینان حاصل کنید.</p>
              </>
            ) : isIOS ? (
              <>
                <p className="font-bold mb-1">راهنمای دسترسی میکروفون در iOS</p>
                <p>لطفاً به تنظیمات Safari بروید و دسترسی به میکروفون را برای این وب‌سایت فعال کنید.</p>
              </>
            ) : isAndroid ? (
              <>
                <p className="font-bold mb-1">راهنمای دسترسی میکروفون در Android</p>
                <p>روی آیکون قفل/دوربین در نوار آدرس کلیک کرده و دسترسی به میکروفون را فعال کنید.</p>
              </>
            ) : (
              "لطفاً به برنامه اجازه دسترسی به میکروفون را بدهید"
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* اگر مرورگر تشخیص گفتار را پشتیبانی نمی‌کند */}
      <AnimatePresence>
        {!isSupported && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-rose-600 dark:text-rose-500 text-center px-2 py-1 bg-rose-50 dark:bg-rose-900/20 rounded-md"
          >
            <p className="font-bold mb-1">مرورگر شما تشخیص گفتار را پشتیبانی نمی‌کند</p>
            <p>لطفاً از مرورگرهای Chrome، Edge، Firefox یا Safari به‌روز استفاده کنید.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdvancedSpeechInput;
