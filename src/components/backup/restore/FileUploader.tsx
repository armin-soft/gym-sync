
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check, X, CloudUpload } from "lucide-react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { formatNumber } from "@/lib/utils/numbers";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
  restoreSuccess: boolean | null;
  restoreMessage: string;
}

export function FileUploader({ onFileSelected, isLoading, restoreSuccess, restoreMessage }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const deviceInfo = useDeviceInfo();

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileSelected(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/json" || file.name.endsWith('.json')) {
        setSelectedFile(file);
        onFileSelected(file);
      }
    }
  };

  return (
    <div className="h-full">
      <h4 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
        <CloudUpload className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
        <span>آپلود فایل پشتیبان</span>
      </h4>
      
      {/* File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Drop Zone */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 cursor-pointer mb-3 sm:mb-4 ${
          dragOver 
            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
            : "border-slate-300 dark:border-slate-600 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
        }`}
        onClick={handleRestoreClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
            <Upload className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          
          {selectedFile ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                <span className="font-medium text-slate-800 dark:text-white text-sm sm:text-base truncate max-w-40 sm:max-w-60">
                  {selectedFile.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {formatNumber((selectedFile.size / 1024).toFixed(1))} KB
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h5 className="font-semibold text-slate-800 dark:text-white mb-2 text-sm sm:text-base">
                فایل JSON را انتخاب کنید
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
                یا فایل را اینجا بکشید و رها کنید
              </p>
              <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
                فرمت‌های مجاز: .json
              </p>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Action Button */}
      <Button 
        onClick={handleRestoreClick} 
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg sm:rounded-xl py-3 sm:py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>در حال بازیابی...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{selectedFile ? "شروع بازیابی" : "انتخاب فایل پشتیبان"}</span>
          </div>
        )}
      </Button>
      
      {/* Result Message */}
      {restoreSuccess !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
            restoreSuccess 
              ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-700" 
              : "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border-red-200 dark:border-red-700"
          }`}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              restoreSuccess ? "bg-green-500" : "bg-red-500"
            }`}>
              {restoreSuccess ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
              ) : (
                <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h5 className={`font-semibold mb-1 text-sm sm:text-base ${
                restoreSuccess 
                  ? "text-green-800 dark:text-green-200" 
                  : "text-red-800 dark:text-red-200"
              }`}>
                {restoreSuccess ? "✅ بازیابی موفق" : "❌ خطا در بازیابی"}
              </h5>
              <p className={`text-xs sm:text-sm ${
                restoreSuccess 
                  ? "text-green-700 dark:text-green-300" 
                  : "text-red-700 dark:text-red-300"
              }`}>
                {restoreMessage}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
