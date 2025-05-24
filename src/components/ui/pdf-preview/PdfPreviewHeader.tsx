
import React from "react";
import { Button } from "@/components/ui/button";
import { X, FileText, User } from "lucide-react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PdfPreviewHeaderProps {
  studentName: string;
  onClose: () => void;
}

export const PdfPreviewHeader: React.FC<PdfPreviewHeaderProps> = ({
  studentName,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-l from-violet-600 via-violet-700 to-violet-800 dark:from-violet-800 dark:via-violet-900 dark:to-violet-950 p-6 border-b border-violet-500/20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 dark:bg-white/5 rounded-xl backdrop-blur-sm border border-white/20">
            <FileText className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              پیش‌نمایش برنامه {studentName}
            </h2>
            <p className="text-violet-200 text-sm mt-1">
              مشاهده و دانلود برنامه کامل تمرینی و تغذیه‌ای
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="relative w-10 h-10 rounded-xl text-white hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200 group"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="sr-only">بستن</span>
        </Button>
      </div>
    </motion.div>
  );
};
