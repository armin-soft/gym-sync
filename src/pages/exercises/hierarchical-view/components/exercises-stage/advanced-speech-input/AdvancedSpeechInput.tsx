
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

interface AdvancedSpeechInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AdvancedSpeechInput({
  value,
  onChange,
  placeholder = "نام حرکت را وارد کنید"
}: AdvancedSpeechInputProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [showPermissionReminder, setShowPermissionReminder] = useState(false);
  const { toast } = useToast();
  const [animateButton, setAnimateButton] = useState(false);
  const { isSupported } = useBrowserSupport();
  const { permissionStatus, requestMicrophonePermission } = useMicrophonePermission();

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
  const isMobile = isIOS || isAndroid;

  useEffect(() => {
    // Show permission reminder after a delay on mobile devices
    if (isMobile && permissionStatus !== 'granted') {
      const timer = setTimeout(() => {
        setShowPermissionReminder(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, permissionStatus]);

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
        // Request permission before starting
        await requestMicrophonePermission();
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
    toast({
      title: "پاک شد",
      description: "متن پاک شد."
    });
  };

  return (
    <div className="relative">
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
              !isSupported && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => isSupported && handleToggleListen()}
            disabled={!isSupported}
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
      
      {/* Mobile permission reminder */}
      <AnimatePresence>
        {showPermissionReminder && isMobile && permissionStatus !== 'granted' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-amber-600 dark:text-amber-500 text-center px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-md"
          >
            {isIOS ? 
              "در iOS باید دسترسی میکروفون را در تنظیمات مرورگر خود فعال کنید" : 
              "لطفاً به برنامه اجازه دسترسی به میکروفون را بدهید"
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdvancedSpeechInput;
