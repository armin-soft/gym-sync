
import { Button } from "@/components/ui/button";
import { Download, Zap } from "lucide-react";

interface BackupActionButtonProps {
  onBackup: () => void;
  isLoading: boolean;
}

export function BackupActionButton({ onBackup, isLoading }: BackupActionButtonProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-8">
      <div className="text-center">
        <Button
          onClick={onBackup}
          disabled={isLoading}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 hover:from-emerald-600 hover:via-sky-600 hover:to-emerald-700 text-white border-0 rounded-2xl px-12 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          dir="rtl"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>در حال پشتیبان‌گیری...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6" />
              <span>شروع پشتیبان‌گیری</span>
              <Zap className="w-5 h-5" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
