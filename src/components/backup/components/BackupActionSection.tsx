
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BackupActionSectionProps {
  onCreateBackup: () => void;
  isLoading: boolean;
}

export function BackupActionSection({ onCreateBackup, isLoading }: BackupActionSectionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 text-center">
        شروع پشتیبان‌گیری
      </h3>
      
      <Button 
        onClick={onCreateBackup} 
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 rounded-xl py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        dir="rtl"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3" dir="rtl">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>در حال پشتیبان‌گیری...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3" dir="rtl">
            <Download className="w-5 h-5" />
            <span>ایجاد فایل پشتیبان</span>
          </div>
        )}
      </Button>
    </div>
  );
}
