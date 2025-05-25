
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface BackupSuccessMessageProps {
  backupStats: Record<string, number>;
}

export function BackupSuccessMessage({ backupStats }: BackupSuccessMessageProps) {
  if (Object.keys(backupStats).length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-xl sm:rounded-2xl p-4 sm:p-6"
      dir="rtl"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4" dir="rtl">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0 text-right">
          <h4 className="font-semibold text-green-800 dark:text-green-200 text-sm sm:text-base">
            پشتیبان‌گیری کامل شد
          </h4>
          <p className="text-xs sm:text-sm text-green-600 dark:text-green-300">
            فایل شما آماده دانلود است
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {Object.entries(backupStats).map(([key, count]) => (
          <div key={key} className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2 sm:p-3 text-center">
            <div className="font-bold text-green-700 dark:text-green-300 text-sm sm:text-base md:text-lg">
              {toPersianNumbers(count)}
            </div>
            <div className="text-2xs sm:text-xs text-green-600 dark:text-green-400">
              {key === 'students' ? 'شاگرد' : 
               key === 'exercises' ? 'تمرین' :
               key === 'meals' ? 'وعده' :
               key === 'supplements' ? 'مکمل' : 'آیتم'}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
