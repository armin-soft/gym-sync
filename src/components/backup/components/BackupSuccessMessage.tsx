
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface BackupSuccessMessageProps {
  backupStats: Record<string, number>;
}

export function BackupSuccessMessage({ backupStats }: BackupSuccessMessageProps) {
  if (Object.keys(backupStats).length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-xl p-4 sm:p-6"
      dir="rtl"
    >
      <div className="flex items-center gap-3 mb-4" dir="rtl">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 text-right">
          <h4 className="font-semibold text-green-800 dark:text-green-200">
            پشتیبان‌گیری کامل شد
          </h4>
          <p className="text-sm text-green-600 dark:text-green-300">
            فایل شما آماده دانلود است
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(backupStats).map(([key, count]) => (
          <div key={key} className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="font-bold text-green-700 dark:text-green-300 text-lg">
              {toPersianNumbers(count)}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">
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
