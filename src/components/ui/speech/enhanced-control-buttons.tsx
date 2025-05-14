
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, RefreshCw, Save, Copy, PauseCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedControlButtonsProps {
  isListening: boolean;
  isSupported: boolean;
  isPaused?: boolean;
  hasContent: boolean;
  onToggleListening: () => void;
  onPauseResumeListening?: () => void;
  onClearTranscript: () => void;
  onSaveTranscript?: () => void;
  onCopyTranscript?: () => void;
  compact?: boolean;
}

export const EnhancedControlButtons = ({
  isListening,
  isPaused = false,
  isSupported,
  hasContent,
  onToggleListening,
  onPauseResumeListening,
  onClearTranscript,
  onSaveTranscript,
  onCopyTranscript,
  compact = false
}: EnhancedControlButtonsProps) => {
  return (
    <motion.div 
      className={cn(
        "flex gap-2 flex-wrap",
        compact ? "flex-row" : "flex-row-reverse justify-end"
      )}
      layout
    >
      <Button
        type="button"
        size={compact ? "icon" : "default"}
        disabled={!isSupported}
        onClick={onToggleListening}
        className={cn(
          "transition-all relative overflow-hidden",
          isListening && !isPaused
            ? "bg-red-500 text-white hover:bg-red-600 shadow-md" 
            : isPaused
              ? "bg-amber-500 hover:bg-amber-600 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        aria-label={isListening ? "توقف ضبط صدا" : "شروع ضبط صدا"}
      >
        <AnimatePresence mode="wait">
          {isListening && !isPaused ? (
            <motion.div
              key="stop"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center justify-center"
            >
              {compact ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <>
                  <MicOff className="h-4 w-4 ml-1.5" />
                  <span>توقف ضبط</span>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                transition: { duration: 0.2 }
              }}
              exit={{ scale: 0 }}
              className="flex items-center justify-center"
            >
              {compact ? (
                <Mic className="h-4 w-4" />
              ) : (
                <>
                  <Mic className="h-4 w-4 ml-1.5" />
                  <span>{isPaused ? "ادامه ضبط" : "شروع ضبط"}</span>
                </>
              )}
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
      
      {isListening && onPauseResumeListening && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
        >
          <Button
            type="button"
            size={compact ? "icon" : "default"}
            onClick={onPauseResumeListening}
            className={cn(
              isPaused 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "bg-amber-500 hover:bg-amber-600 text-white"
            )}
          >
            {compact ? (
              <PauseCircle className="h-4 w-4" />
            ) : (
              <>
                <PauseCircle className="h-4 w-4 ml-1.5" />
                <span>{isPaused ? "ادامه" : "توقف موقت"}</span>
              </>
            )}
          </Button>
        </motion.div>
      )}
      
      <Button
        type="button"
        size={compact ? "icon" : "sm"}
        variant="outline"
        onClick={onClearTranscript}
        disabled={!hasContent}
        aria-label="پاک کردن متن"
        className="hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {compact ? (
          <RefreshCw className="h-4 w-4" />
        ) : (
          <>
            <RefreshCw className="h-4 w-4 ml-1.5" />
            <span>پاک کردن</span>
          </>
        )}
      </Button>
      
      {onSaveTranscript && (
        <Button
          type="button"
          size={compact ? "icon" : "sm"}
          variant="outline"
          onClick={onSaveTranscript}
          disabled={!hasContent}
          aria-label="ذخیره متن"
          className="hover:bg-blue-50 dark:hover:bg-blue-950"
        >
          {compact ? (
            <Save className="h-4 w-4" />
          ) : (
            <>
              <Save className="h-4 w-4 ml-1.5" />
              <span>ذخیره</span>
            </>
          )}
        </Button>
      )}
      
      {onCopyTranscript && (
        <Button
          type="button"
          size={compact ? "icon" : "sm"}
          variant="outline"
          onClick={onCopyTranscript}
          disabled={!hasContent}
          aria-label="کپی متن"
          className="hover:bg-green-50 dark:hover:bg-green-950"
        >
          {compact ? (
            <Copy className="h-4 w-4" />
          ) : (
            <>
              <Copy className="h-4 w-4 ml-1.5" />
              <span>کپی</span>
            </>
          )}
        </Button>
      )}
    </motion.div>
  );
};

export default EnhancedControlButtons;
