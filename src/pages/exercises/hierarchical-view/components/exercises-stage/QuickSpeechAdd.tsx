
import React, { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { SpeechToText } from "@/components/ui/speech-to-text";

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
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && quickSpeechText.trim()) {
      e.preventDefault();
      onQuickAdd();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/50 rounded-lg p-3 mb-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Button
              size="sm"
              onClick={onQuickAdd}
              disabled={!quickSpeechText.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="h-4 w-4 ml-1" />
              افزودن سریع
            </Button>
            <h4 className="font-medium text-sm text-purple-800 dark:text-purple-300">افزودن حرکت با صدا</h4>
          </div>
          <SpeechToText
            onTranscriptChange={setQuickSpeechText}
            value={quickSpeechText}
            placeholder="نام حرکت را بگویید..."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default QuickSpeechAdd;
