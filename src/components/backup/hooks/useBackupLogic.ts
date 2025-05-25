
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";

interface UseBackupLogicProps {
  dataKeys: string[];
}

export function useBackupLogic({ dataKeys }: UseBackupLogicProps) {
  const { toast } = useToast();
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const createBackup = () => {
    try {
      setIsLoading(true);
      const backupData: Record<string, any> = {};
      const stats: Record<string, number> = {};
      
      // Collect all data from localStorage
      dataKeys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsedData = JSON.parse(data);
            backupData[key] = parsedData;
            
            // Calculate stats for arrays
            if (Array.isArray(parsedData)) {
              stats[key] = parsedData.length;
            } else {
              stats[key] = 1;
            }
          } catch (e) {
            console.error(`Error parsing ${key}:`, e);
            backupData[key] = data;
            stats[key] = 0;
          }
        } else {
          backupData[key] = null;
          stats[key] = 0;
        }
      });
      
      // Create filename with new format
      const filename = `${formatPersianDateForFilename()}.json`;
      const backupString = JSON.stringify(backupData, null, 2);
      
      // Create download file
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
      setIsLoading(false);
      
      toast({
        title: "✅ پشتیبان‌گیری موفق",
        description: "فایل پشتیبان با موفقیت ایجاد و دانلود شد",
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none"
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "❌ خطا در پشتیبان‌گیری",
        description: "مشکلی در فرآیند پشتیبان‌گیری رخ داده است",
      });
    }
  };

  return {
    backupStats,
    isLoading,
    createBackup
  };
}
