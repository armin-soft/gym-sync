
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
  restoreSuccess: boolean | null;
  restoreMessage: string;
}

export function FileUploader({ onFileSelected, isLoading, restoreSuccess, restoreMessage }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const deviceInfo = useDeviceInfo();

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    onFileSelected(file);
  };

  return (
    <div className="h-full">
      <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">آپلود فایل پشتیبان:</h4>
      <div className="mt-3 sm:mt-4">
        <input
          type="file"
          ref={fileInputRef}
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button 
          onClick={handleRestoreClick} 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
          size={deviceInfo.isMobile ? "sm" : "default"}
        >
          {isLoading ? (
            <div className="flex items-center gap-1.5 xs:gap-2">
              <div className="animate-spin rounded-full h-3 w-3 xs:h-4 xs:w-4 border-t-2 border-r-2 border-white"></div>
              <span>در حال بازیابی...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>انتخاب فایل پشتیبان</span>
            </div>
          )}
        </Button>
      </div>
      
      {restoreSuccess !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg ${
            restoreSuccess 
              ? "bg-green-50 dark:bg-green-900/30" 
              : "bg-red-50 dark:bg-red-900/30"
          }`}
        >
          <p className={`text-xs sm:text-sm font-medium flex items-center gap-1 ${
            restoreSuccess 
              ? "text-green-700 dark:text-green-300" 
              : "text-red-700 dark:text-red-300"
          }`}>
            {restoreSuccess ? (
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ) : (
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
            {restoreMessage}
          </p>
        </motion.div>
      )}
    </div>
  );
}
