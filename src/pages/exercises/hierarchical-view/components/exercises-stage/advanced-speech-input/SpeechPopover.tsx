
import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOfflineSpeech } from "@/providers/OfflineSpeechProvider";

interface SpeechPopoverProps {
  show: boolean;
  isListening: boolean;
}

export default function SpeechPopover({ show, isListening }: SpeechPopoverProps) {
  const { isModelLoaded, isOfflineAvailable } = useOfflineSpeech();

  if (!show || isListening) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      className={cn(
        "absolute right-0 bottom-full mb-2 bg-white dark:bg-gray-900 shadow-lg",
        "rounded-lg p-2 text-xs whitespace-nowrap z-50 text-right min-w-[200px]",
        "border border-gray-200 dark:border-gray-800"
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 font-medium">
          <Mic className="h-3 w-3" />
          <span>تشخیص گفتار</span>
        </div>
        <p className="text-muted-foreground">
          برای شروع ضبط صدا، کلیک کنید
        </p>
        {isOfflineAvailable && (
          <p className="text-green-600 dark:text-green-400 mt-1 text-[10px]">
            {isModelLoaded 
              ? "قابلیت تشخیص گفتار آفلاین نیز فعال است" 
              : "امکان استفاده از تشخیص گفتار آفلاین وجود دارد"}
          </p>
        )}
      </div>
      <div className="absolute w-2 h-2 right-3 -bottom-1 bg-white dark:bg-gray-900 border-b border-r border-gray-200 dark:border-gray-800 transform rotate-45"></div>
    </motion.div>
  );
}
