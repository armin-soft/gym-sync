
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface BackupSuccessMessageProps {
  backupStats: Record<string, number>;
}

export function BackupSuccessMessage({ backupStats }: BackupSuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700 rounded-2xl p-6"
      dir="rtl"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
          <Check className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-emerald-800 dark:text-emerald-200 text-lg">
            پشتیبان‌گیری کامل شد
          </h4>
          <p className="text-emerald-600 dark:text-emerald-300">
            فایل با موفقیت دانلود شد
          </p>
        </div>
      </div>
      
      {Object.keys(backupStats).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(backupStats).map(([key, count]) => (
            <div key={key} className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="font-bold text-emerald-700 dark:text-emerald-300 text-2xl">
                {toPersianNumbers(count)}
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400">
                {key === 'students' ? 'شاگرد' : 
                 key === 'exercises' ? 'تمرین' :
                 key === 'meals' ? 'وعده' :
                 key === 'supplements' ? 'مکمل' : 
                 key === 'exerciseTypes' ? 'نوع تمرین' :
                 key === 'exerciseCategories' ? 'دسته تمرین' :
                 'آیتم'}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
