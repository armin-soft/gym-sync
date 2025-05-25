
import { FileArchive } from "lucide-react";

export function BackupSectionHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4" dir="rtl">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
          <FileArchive className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
        </div>
        <div className="flex-1 min-w-0 text-right">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
            پشتیبان‌گیری کامل
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-blue-100">
            تمام اطلاعات شما در یک فایل امن ذخیره می‌شود
          </p>
        </div>
      </div>
    </div>
  );
}
