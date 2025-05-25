
import { Card } from "@/components/ui/card";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { RestoreGuide, FileUploader, useRestoreData, SectionHeader } from "./restore";
import { RotateCcw } from "lucide-react";

interface RestoreSectionProps {
  dataKeys: string[];
}

export function RestoreSection({ dataKeys }: RestoreSectionProps) {
  const deviceInfo = useDeviceInfo();
  const { 
    restoreStats, 
    restoreSuccess, 
    restoreMessage, 
    isLoading, 
    handleFileRestore 
  } = useRestoreData({ dataKeys });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      dir="rtl"
    >
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4" dir="rtl">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0 text-right">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                بازیابی اطلاعات
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-indigo-100">
                اطلاعات خود را از فایل پشتیبان بازگردانید
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Guide Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-indigo-200 dark:border-slate-600"
              dir="rtl"
            >
              <RestoreGuide />
            </motion.div>

            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200 dark:border-slate-600"
              dir="rtl"
            >
              <FileUploader
                onFileSelected={handleFileRestore}
                isLoading={isLoading}
                restoreSuccess={restoreSuccess}
                restoreMessage={restoreMessage}
              />
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
