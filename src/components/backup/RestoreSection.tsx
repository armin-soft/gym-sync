
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
    >
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                بازیابی اطلاعات
              </h2>
              <p className="text-indigo-100">
                اطلاعات خود را از فایل پشتیبان بازگردانید
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Guide Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border border-indigo-200 dark:border-slate-600"
            >
              <RestoreGuide />
            </motion.div>

            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border border-purple-200 dark:border-slate-600"
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
