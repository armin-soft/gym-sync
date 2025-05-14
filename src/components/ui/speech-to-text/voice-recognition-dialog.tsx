
import React, { useEffect, useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import { SpeechToTextAdvanced } from "./advanced";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface VoiceRecognitionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
  title?: string;
}

export const VoiceRecognitionDialog: React.FC<VoiceRecognitionDialogProps> = ({
  isOpen,
  onOpenChange,
  onTranscriptChange,
  initialValue = "",
  title = "گفتار به نوشتار"
}) => {
  const [value, setValue] = useState(initialValue);

  // رست کردن مقدار اولیه هنگام باز شدن دیالوگ
  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
    }
  }, [isOpen, initialValue]);

  // هندل کردن تغییر متن و پاس دادن آن به کامپوننت والد
  const handleTranscriptChange = (transcript: string) => {
    setValue(transcript);
    onTranscriptChange(transcript);
  };

  // بستن دیالوگ
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md max-w-[96vw] p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-indigo-100/50 dark:border-indigo-900/30"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-2 rounded-full"
            >
              <Mic className="h-5 w-5" />
            </motion.div>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {title}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="h-[400px] mt-4">
          <SpeechToTextAdvanced
            value={value}
            onTranscriptChange={handleTranscriptChange}
            placeholder="برای افزودن حرکت با صدا، روی دکمه میکروفون کلیک کنید"
            multiLine={false}
            onClose={handleClose}
            isDialog={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceRecognitionDialog;
