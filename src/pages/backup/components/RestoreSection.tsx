
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRestoreOperations } from "../hooks/useRestoreOperations";
import { RestoreGuide } from "./restore/RestoreGuide";
import { FileUploadZone } from "./restore/FileUploadZone";
import { RestoreResultMessage } from "./restore/RestoreResultMessage";

interface RestoreSectionProps {
  dataKeys: string[];
}

export function RestoreSection({ dataKeys }: RestoreSectionProps) {
  const { handleFileRestore, isLoading, restoreResult } = useRestoreOperations();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    handleFileRestore(file, dataKeys);
  };

  const triggerFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-6xl mx-auto"
      dir="rtl"
    >
      <Card className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-0 shadow-2xl rounded-2xl lg:rounded-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-600 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6" dir="rtl">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-2xl lg:rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 lg:mb-2">
                بازیابی هوشمند اطلاعات
              </h2>
              <p className="text-sky-100 text-sm sm:text-base lg:text-lg">
                بازگردانی سریع و امن داده‌ها از فایل پشتیبان
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Guide Section */}
            <div className="space-y-4 lg:space-y-6">
              <RestoreGuide />

              <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-700">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                <AlertTitle className="text-amber-800 dark:text-amber-200 text-sm sm:text-base">
                  هشدار مهم
                </AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-300 text-xs sm:text-sm">
                  با بازیابی، تمام داده‌های فعلی حذف و با اطلاعات فایل پشتیبان جایگزین می‌شوند.
                </AlertDescription>
              </Alert>
            </div>

            {/* Upload Section */}
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                آپلود فایل پشتیبان
              </h3>

              <FileUploadZone 
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />

              <Button
                onClick={triggerFileInput}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-600 hover:from-sky-600 hover:via-emerald-600 hover:to-sky-700 text-white border-0 rounded-xl lg:rounded-2xl py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>در حال بازیابی...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 lg:gap-3">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    <span>انتخاب فایل و شروع بازیابی</span>
                  </div>
                )}
              </Button>

              {restoreResult && <RestoreResultMessage result={restoreResult} />}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
