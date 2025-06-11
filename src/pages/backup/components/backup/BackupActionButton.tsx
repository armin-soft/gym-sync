
import { Button } from "@/components/ui/button";
import { Download, Zap } from "lucide-react";

interface BackupActionButtonProps {
  onBackup: () => void;
  isLoading: boolean;
}

export function BackupActionButton({ onBackup, isLoading }: BackupActionButtonProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-slate-700 dark:to-slate-800 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
      <div className="text-center">
        <Button
          onClick={onBackup}
          disabled={isLoading}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 hover:from-emerald-600 hover:via-sky-600 hover:to-emerald-700 text-white border-0 rounded-xl lg:rounded-2xl px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 text-sm sm:text-base lg:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          dir="rtl"
        >
          {isLoading ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>در حال پشتیبان‌گیری...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 lg:gap-3">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              <span>شروع پشتیبان‌گیری</span>
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
