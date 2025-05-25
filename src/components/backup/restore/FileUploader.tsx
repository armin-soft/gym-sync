
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check, X, CloudUpload } from "lucide-react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

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
      <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <CloudUpload className="w-5 h-5 text-purple-600" />
        آپلود فایل پشتیبان
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
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer mb-4 ${
          dragOver 
            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
            : "border-slate-300 dark:border-slate-600 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
        }`}
        onClick={handleRestoreClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          {selectedFile ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-slate-800 dark:text-white">
                  {selectedFile.name}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h5 className="font-semibold text-slate-800 dark:text-white mb-2">
                فایل JSON را انتخاب کنید
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                یا فایل را اینجا بکشید و رها کنید
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
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
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-xl py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>در حال بازیابی...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <Upload className="w-5 h-5" />
            <span>{selectedFile ? "شروع بازیابی" : "انتخاب فایل پشتیبان"}</span>
          </div>
        )}
      </Button>
      
      {/* Result Message */}
      {restoreSuccess !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-xl border ${
            restoreSuccess 
              ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-700" 
              : "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border-red-200 dark:border-red-700"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              restoreSuccess ? "bg-green-500" : "bg-red-500"
            }`}>
              {restoreSuccess ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <X className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h5 className={`font-semibold mb-1 ${
                restoreSuccess 
                  ? "text-green-800 dark:text-green-200" 
                  : "text-red-800 dark:text-red-200"
              }`}>
                {restoreSuccess ? "✅ بازیابی موفق" : "❌ خطا در بازیابی"}
              </h5>
              <p className={`text-sm ${
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
