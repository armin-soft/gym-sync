
import React, { KeyboardEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Mic, Wifi, WifiOff } from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { useAutoSpeechMode } from "@/hooks/speech/useAutoSpeechMode";
import SpeechToText from "@/components/ui/speech-to-text";
import { OfflineSpeechInput } from "@/components/ui/offline-speech/OfflineSpeechInput";

interface QuickSpeechAddProps {
  quickSpeechText: string;
  setQuickSpeechText: (value: string) => void;
  onQuickAdd: () => void;
}

const QuickSpeechAdd: React.FC<QuickSpeechAddProps> = ({
  quickSpeechText,
  setQuickSpeechText,
  onQuickAdd
}) => {
  const { inputMode, setInputMode, isOffline } = useAutoSpeechMode();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && quickSpeechText.trim()) {
      e.preventDefault();
      onQuickAdd();
    }
  };

  useEffect(() => {
    // تنظیم حالت اولیه با توجه به وضعیت شبکه
    if (!isOffline) {
      setInputMode('speech');
    } else {
      setInputMode('offline');
    }
  }, [isOffline, setInputMode]);

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
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={onQuickAdd}
                disabled={!quickSpeechText.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 ml-1" />
                افزودن سریع
              </Button>
              
              {/* نشانگر وضعیت آنلاین/آفلاین */}
              <div className="bg-gray-100 dark:bg-gray-800 py-1 px-2 rounded-md text-xs flex items-center gap-1">
                {isOffline ? (
                  <>
                    <WifiOff className="h-3 w-3 text-amber-500" />
                    <span className="text-amber-600 dark:text-amber-400">آفلاین</span>
                  </>
                ) : (
                  <>
                    <Wifi className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">آنلاین</span>
                  </>
                )}
              </div>
            </div>
            <h4 className="font-medium text-sm text-purple-800 dark:text-purple-300">افزودن حرکت سریع</h4>
          </div>
          
          {/* انتخاب خودکار روش ورودی براساس وضعیت آنلاین/آفلاین */}
          {inputMode === 'speech' && !isOffline ? (
            <SpeechToText
              onTranscriptChange={setQuickSpeechText}
              value={quickSpeechText}
              placeholder="برای شروع ضبط صدا، روی آیکون میکروفون کلیک کنید"
              className="compact-speech"
              multiLine={false}
            />
          ) : inputMode === 'offline' ? (
            <OfflineSpeechInput 
              value={quickSpeechText}
              onChange={setQuickSpeechText}
              placeholder="برای تشخیص گفتار آفلاین، ابتدا مدل را دانلود کنید"
            />
          ) : (
            <Textarea
              value={quickSpeechText}
              onChange={(e) => setQuickSpeechText(e.target.value)}
              placeholder="نام حرکت را وارد کنید..."
              className="min-h-[80px] focus-visible:ring-purple-400 text-right"
              dir="rtl"
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickSpeechAdd;
