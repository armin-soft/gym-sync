
import React, { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { useContinuousSpeechRecognition } from "@/hooks/speech/useContinuousSpeechRecognition";

interface QuickSpeechAddProps {
  quickSpeechText: string;
  setQuickSpeechText: (value: string) => void;
  onQuickAdd: (text: string) => Promise<void>;
}

const QuickSpeechAdd: React.FC<QuickSpeechAddProps> = ({
  quickSpeechText,
  setQuickSpeechText,
  onQuickAdd
}) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useContinuousSpeechRecognition({
    onTranscriptChange: setQuickSpeechText,
    initialValue: quickSpeechText,
    lang: "fa-IR"
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && quickSpeechText.trim()) {
      e.preventDefault();
      handleQuickAddClick();
    }
  };

  const handleQuickAddClick = async () => {
    if (quickSpeechText.trim()) {
      await onQuickAdd(quickSpeechText.trim());
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const displayText = transcript || interimTranscript || quickSpeechText;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/50 rounded-lg p-3 mb-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleQuickAddClick}
                disabled={!displayText.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 ml-1" />
                افزودن سریع
              </Button>
              
              {isSupported && (
                <Button
                  size="sm"
                  onClick={toggleListening}
                  variant={isListening ? "destructive" : "outline"}
                  className={isListening ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                >
                  <AnimatePresence mode="popLayout">
                    {isListening ? (
                      <motion.div
                        key="mic-off-icon"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <MicOff className="h-4 w-4 ml-1" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="mic-icon"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Mic className="h-4 w-4 ml-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isListening ? "توقف ضبط" : "شروع ضبط"}
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {isListening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  در حال ضبط...
                </motion.div>
              )}
              <h4 className="font-medium text-sm text-purple-800 dark:text-purple-300">افزودن حرکت سریع</h4>
            </div>
          </div>
          
          <Textarea
            value={displayText}
            onChange={(e) => setQuickSpeechText(e.target.value)}
            placeholder="نام حرکت را وارد کنید یا روی دکمه ضبط کلیک کنید..."
            className="min-h-[80px] focus-visible:ring-purple-400 text-right"
            dir="rtl"
            onKeyDown={handleKeyDown}
          />
          
          {interimTranscript && (
            <div className="text-xs text-gray-500 text-right">
              در حال تایپ: {interimTranscript}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickSpeechAdd;
