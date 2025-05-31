
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface RestoreResultMessageProps {
  restoreSuccess: boolean | null;
  restoreMessage: string;
  restoreStats: Record<string, number>;
}

export function RestoreResultMessage({ 
  restoreSuccess, 
  restoreMessage, 
  restoreStats 
}: RestoreResultMessageProps) {
  if (restoreSuccess === null) {
    return null;
  }

  return (
    <>
      {/* Result Message */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-4 p-4 rounded-xl border ${
          restoreSuccess 
            ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-700" 
            : "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border-red-200 dark:border-red-700"
        }`}
        dir="rtl"
      >
        <div className="flex items-start gap-3" dir="rtl">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            restoreSuccess ? "bg-green-500" : "bg-red-500"
          }`}>
            {restoreSuccess ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <X className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="flex-1 text-right">
            <h5 className={`font-semibold mb-1 ${
              restoreSuccess 
                ? "text-green-800 dark:text-green-200" 
                : "text-red-800 dark:text-red-200"
            }`}>
              {restoreSuccess ? "بازیابی موفق" : "خطا در بازیابی"}
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

      {/* Success Stats */}
      {restoreSuccess && Object.keys(restoreStats).length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {Object.entries(restoreStats).map(([key, count]) => (
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
      )}
    </>
  );
}
