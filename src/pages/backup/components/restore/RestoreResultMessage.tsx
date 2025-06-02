
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface RestoreResult {
  success: boolean;
  message: string;
  stats?: Record<string, number>;
}

interface RestoreResultMessageProps {
  result: RestoreResult;
}

export function RestoreResultMessage({ result }: RestoreResultMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl border ${
        result.success 
          ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200" 
          : "bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          result.success ? "bg-emerald-500" : "bg-red-500"
        }`}>
          {result.success ? (
            <Check className="w-6 h-6 text-white" />
          ) : (
            <X className="w-6 h-6 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h4 className={`font-bold mb-2 ${
            result.success ? "text-emerald-800" : "text-red-800"
          }`}>
            {result.success ? "بازیابی موفق" : "خطا در بازیابی"}
          </h4>
          <p className={`text-sm ${
            result.success ? "text-emerald-700" : "text-red-700"
          }`}>
            {result.message}
          </p>
        </div>
      </div>

      {result.success && result.stats && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {Object.entries(result.stats).map(([key, count]) => (
            <div key={key} className="bg-white/50 rounded-xl p-4 text-center">
              <div className="font-bold text-emerald-700 text-xl">
                {toPersianNumbers(count)}
              </div>
              <div className="text-sm text-emerald-600">
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
