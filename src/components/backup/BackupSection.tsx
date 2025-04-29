
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Check, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface BackupSectionProps {
  dataKeys: string[];
}

export function BackupSection({ dataKeys }: BackupSectionProps) {
  const { toast } = useToast();
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const deviceInfo = useDeviceInfo();

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
      
      // Create filename with Persian date format
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
        title: "پشتیبان‌گیری موفق",
        description: "اطلاعات با موفقیت در فایل ذخیره شد",
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "خطا در پشتیبان‌گیری",
        description: "مشکلی در فرآیند پشتیبان‌گیری به وجود آمده است",
      });
    }
  };

  const getIconContainerClasses = () => {
    return "bg-teal-100 dark:bg-teal-900 p-2 sm:p-3 md:p-4 rounded-xl";
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-5 h-5";
    if (deviceInfo.isTablet) return "w-6 h-6";
    if (deviceInfo.isSmallLaptop) return "w-7 h-7";
    return "w-8 h-8";
  };

  const getInnerCardClasses = () => {
    return "bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-3 md:p-4 shadow-sm h-full";
  };

  const getGridClasses = () => {
    return "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 flex-1";
  };

  const getCardClasses = () => {
    const baseClasses = "p-3 sm:p-4 md:p-5 lg:p-6 h-full";
    return `${baseClasses} bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-teal-950 dark:via-gray-900 dark:to-blue-950 border-teal-100 dark:border-teal-900`;
  };

  return (
    <Card className={getCardClasses()}>
      <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 h-full">
        <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 md:gap-4">
          <div className={getIconContainerClasses()}>
            <Database className={cn(getIconSize(), "text-teal-600 dark:text-teal-400")} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">پشتیبان‌گیری از اطلاعات</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              تمام اطلاعات برنامه در یک فایل ذخیره خواهد شد
            </p>
          </div>
        </div>

        <div className={getGridClasses()}>
          <div className={getInnerCardClasses()}>
            <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">داده‌های موجود برای پشتیبان‌گیری:</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">شاگردان</span>
                <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">تمرینات</span>
                <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">برنامه‌های غذایی</span>
                <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">مکمل‌ها</span>
                <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">پروفایل مربی</span>
                <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              </li>
            </ul>
          </div>

          <div className={getInnerCardClasses()}>
            <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">اقدامات:</h4>
            <div className="mt-3 sm:mt-4">
              <Button 
                onClick={createBackup} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
                size={deviceInfo.isMobile ? "sm" : "default"}
              >
                {isLoading ? (
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <div className="animate-spin rounded-full h-3 w-3 xs:h-4 xs:w-4 border-t-2 border-r-2 border-white"></div>
                    <span>در حال پشتیبان‌گیری...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>ایجاد فایل پشتیبان</span>
                  </div>
                )}
              </Button>
            </div>
            
            {Object.keys(backupStats).length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 dark:bg-green-900/30 rounded-lg"
              >
                <p className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  پشتیبان‌گیری انجام شد
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
