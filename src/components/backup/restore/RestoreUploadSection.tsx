
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { useState, useRef } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface RestoreUploadSectionProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  isLoading: boolean;
  onFileRestore: (file: File) => void;
}

export function RestoreUploadSection({ 
  selectedFile, 
  setSelectedFile, 
  isLoading, 
  onFileRestore 
}: RestoreUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileRestore(file);
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
        onFileRestore(file);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border border-purple-200 dark:border-slate-600">
      <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <Upload className="w-5 h-5 text-purple-600" />
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
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer mb-4 ${
          dragOver 
            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
            : "border-slate-300 dark:border-slate-600 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
        }`}
        onClick={handleRestoreClick}
        dir="rtl"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          {selectedFile ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2" dir="rtl">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-slate-800 dark:text-white truncate max-w-60">
                  {selectedFile.name}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {toPersianNumbers((selectedFile.size / 1024).toFixed(1))} کیلوبایت
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
      </div>
      
      {/* Action Button */}
      <Button 
        onClick={handleRestoreClick} 
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-xl py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        dir="rtl"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3" dir="rtl">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>در حال بازیابی...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3" dir="rtl">
            <Upload className="w-5 h-5" />
            <span>{selectedFile ? "شروع بازیابی" : "انتخاب فایل پشتیبان"}</span>
          </div>
        )}
      </Button>
    </div>
  );
}
