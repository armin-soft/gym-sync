
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export function BackupHeader() {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 p-6 sm:p-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6" dir="rtl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center">
          <Download className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div className="flex-1 text-right">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            پشتیبان‌گیری کامل و هوشمند
          </h2>
          <p className="text-blue-100 text-sm sm:text-base">
            تمام اطلاعات شما با بالاترین سطح امنیت ذخیره می‌شود
          </p>
        </div>
      </div>
    </div>
  );
}
