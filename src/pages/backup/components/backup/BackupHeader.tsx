
import { Download } from "lucide-react";

export function BackupHeader() {
  return (
    <div className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 p-8">
      <div className="flex items-center gap-6" dir="rtl">
        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
          <Download className="w-10 h-10 text-white" />
        </div>
        <div className="flex-1 text-right">
          <h2 className="text-3xl font-black text-white mb-2">
            پشتیبان‌گیری حرفه‌ای
          </h2>
          <p className="text-emerald-100 text-lg">
            حفاظت کامل از اطلاعات با تکنولوژی پیشرفته
          </p>
        </div>
      </div>
    </div>
  );
}
