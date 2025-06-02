
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";

interface BackupOperations {
  createBackup: (dataKeys: string[]) => Promise<void>;
  isLoading: boolean;
  backupSuccess: boolean;
  backupStats: Record<string, number>;
  resetBackupState: () => void;
}

export function useBackupOperations(): BackupOperations {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});

  const createBackup = async (dataKeys: string[]) => {
    try {
      setIsLoading(true);
      const backupData: Record<string, any> = {};
      const stats: Record<string, number> = {};
      
      dataKeys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsedData = JSON.parse(data);
            backupData[key] = parsedData;
            stats[key] = Array.isArray(parsedData) ? parsedData.length : 1;
          } catch (e) {
            backupData[key] = data;
            stats[key] = 0;
          }
        } else {
          backupData[key] = null;
          stats[key] = 0;
        }
      });
      
      backupData._metadata = {
        created: new Date().toISOString(),
        version: "5.0.0",
        appName: "مدیریت باشگاه"
      };
      
      const filename = `backup-${formatPersianDateForFilename()}.json`;
      const backupString = JSON.stringify(backupData, null, 2);
      
      const blob = new Blob([backupString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setBackupStats(stats);
      setBackupSuccess(true);
      
      toast({
        title: "پشتیبان‌گیری موفق",
        description: `فایل ${filename} با موفقیت ایجاد شد`,
        className: "bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none"
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      toast({
        variant: "destructive",
        title: "خطا در پشتیبان‌گیری",
        description: "مشکلی در فرآیند پشتیبان‌گیری رخ داده است",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetBackupState = () => {
    setBackupSuccess(false);
    setBackupStats({});
  };

  return {
    createBackup,
    isLoading,
    backupSuccess,
    backupStats,
    resetBackupState
  };
}
