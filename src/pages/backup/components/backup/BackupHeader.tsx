
import { Download } from "lucide-react";

export function BackupHeader() {
  return (
    <div className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6" dir="rtl">
        <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-2xl lg:rounded-3xl flex items-center justify-center backdrop-blur-sm">
          <Download className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
        </div>
        <div className="flex-1 text-right">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 lg:mb-2">
            پشتیبان‌گیری حرفه‌ای
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base lg:text-lg">
            حفاظت کامل از اطلاعات با تکنولوژی پیشرفته
          </p>
        </div>
      </div>
    </div>
  );
}
