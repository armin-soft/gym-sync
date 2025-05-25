
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BackupActionSectionProps {
  onCreateBackup: () => void;
  isLoading: boolean;
}

export function BackupActionSection({ onCreateBackup, isLoading }: BackupActionSectionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6" dir="rtl">
      <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-3 sm:mb-4 text-center">
        شروع پشتیبان‌گیری
      </h3>
      
      <Button 
        onClick={onCreateBackup} 
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 rounded-lg sm:rounded-xl py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        dir="rtl"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 sm:gap-3" dir="rtl">
            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 sm:border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>در حال پشتیبان‌گیری...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 sm:gap-3" dir="rtl">
            <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span>ایجاد فایل پشتیبان</span>
          </div>
        )}
      </Button>
    </div>
  );
}
