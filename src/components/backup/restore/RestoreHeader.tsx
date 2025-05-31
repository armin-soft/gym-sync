
import { RotateCcw } from "lucide-react";

export function RestoreHeader() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4" dir="rtl">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
          <RotateCcw className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 text-right">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            بازیابی اطلاعات
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base">
            اطلاعات خود را از فایل پشتیبان بازگردانید
          </p>
        </div>
      </div>
    </div>
  );
}
