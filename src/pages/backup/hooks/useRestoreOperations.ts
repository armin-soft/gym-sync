
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RestoreResult {
  success: boolean;
  message: string;
  stats?: Record<string, number>;
}

interface RestoreOperations {
  handleFileRestore: (file: File, dataKeys: string[]) => void;
  isLoading: boolean;
  restoreResult: RestoreResult | null;
  resetRestoreState: () => void;
}

export function useRestoreOperations(): RestoreOperations {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [restoreResult, setRestoreResult] = useState<RestoreResult | null>(null);

  const triggerDataRefresh = () => {
    window.dispatchEvent(new CustomEvent('localStorage-updated', { 
      detail: { key: 'all' } 
    }));
    window.dispatchEvent(new Event('storage'));
  };

  const handleFileRestore = (file: File, dataKeys: string[]) => {
    const reader = new FileReader();
    
    setIsLoading(true);
    setRestoreResult(null);
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backupData = JSON.parse(content);
        const stats: Record<string, number> = {};
        
        if (!backupData || typeof backupData !== 'object') {
          throw new Error("فایل پشتیبان معتبر نیست");
        }
        
        delete backupData._metadata;
        
        dataKeys.forEach(key => {
          if (key in backupData && backupData[key] !== null) {
            localStorage.setItem(key, JSON.stringify(backupData[key]));
            stats[key] = Array.isArray(backupData[key]) ? backupData[key].length : 1;
          } else {
            localStorage.removeItem(key);
            stats[key] = 0;
          }
        });
        
        triggerDataRefresh();
        
        setRestoreResult({
          success: true,
          message: "بازیابی اطلاعات با موفقیت انجام شد",
          stats
        });
        
        toast({
          title: "بازیابی موفق",
          description: "اطلاعات با موفقیت بازیابی شدند",
          variant: "success"
        });
      } catch (error) {
        console.error("Restore error:", error);
        setRestoreResult({
          success: false,
          message: "خطا در بازیابی اطلاعات. فایل پشتیبان معتبر نیست"
        });
        
        toast({
          variant: "destructive",
          title: "خطا در بازیابی",
          description: "مشکلی در فرآیند بازیابی رخ داده است",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.readAsText(file);
  };

  const resetRestoreState = () => {
    setRestoreResult(null);
  };

  return {
    handleFileRestore,
    isLoading,
    restoreResult,
    resetRestoreState
  };
}
