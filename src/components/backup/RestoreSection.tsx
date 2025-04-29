
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUp, AlertCircle, Upload, Check, X, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface RestoreSectionProps {
  dataKeys: string[];
}

export function RestoreSection({ dataKeys }: RestoreSectionProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [restoreStats, setRestoreStats] = useState<Record<string, number>>({});
  const [restoreSuccess, setRestoreSuccess] = useState<boolean | null>(null);
  const [restoreMessage, setRestoreMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const deviceInfo = useDeviceInfo();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const reader = new FileReader();
    
    setIsLoading(true);
    setRestoreSuccess(null);
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backupData = JSON.parse(content);
        const stats: Record<string, number> = {};
        
        // Verify backup file structure
        if (!backupData || typeof backupData !== 'object') {
          throw new Error("فایل پشتیبان معتبر نیست");
        }
        
        // Restore data to localStorage
        dataKeys.forEach(key => {
          if (key in backupData) {
            const dataToStore = backupData[key];
            
            // Skip null values (missing data)
            if (dataToStore !== null) {
              localStorage.setItem(key, JSON.stringify(dataToStore));
              
              // Calculate stats for arrays
              if (Array.isArray(dataToStore)) {
                stats[key] = dataToStore.length;
              } else {
                stats[key] = 1;
              }
            } else {
              stats[key] = 0;
            }
          }
        });
        
        // Trigger storage event for components to reload
        window.dispatchEvent(new Event('storage'));
        
        setRestoreStats(stats);
        setRestoreSuccess(true);
        setRestoreMessage("بازیابی اطلاعات با موفقیت انجام شد");
        setIsLoading(false);
        
        toast({
          title: "بازیابی موفق",
          description: "اطلاعات با موفقیت بازیابی شدند",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
        });
      } catch (error) {
        console.error("Error restoring backup:", error);
        setRestoreSuccess(false);
        setRestoreMessage("خطا در بازیابی اطلاعات. لطفاً یک فایل پشتیبان معتبر انتخاب کنید");
        setIsLoading(false);
        
        toast({
          variant: "destructive",
          title: "خطا در بازیابی",
          description: "مشکلی در فرآیند بازیابی به وجود آمده است",
        });
      }
    };
    
    reader.onerror = () => {
      setRestoreSuccess(false);
      setRestoreMessage("خطا در خواندن فایل");
      setIsLoading(false);
      
      toast({
        variant: "destructive",
        title: "خطا در خواندن فایل",
        description: "مشکلی در خواندن فایل به وجود آمده است",
      });
    };
    
    reader.readAsText(file);
  };

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const getIconContainerClasses = () => {
    return "bg-indigo-100 dark:bg-indigo-900 p-2 sm:p-3 md:p-4 rounded-xl";
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
    return `${baseClasses} bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 border-indigo-100 dark:border-indigo-900`;
  };

  return (
    <Card className={getCardClasses()}>
      <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 h-full">
        <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 md:gap-4">
          <div className={getIconContainerClasses()}>
            <Database className={cn(getIconSize(), "text-indigo-600 dark:text-indigo-400")} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">بازیابی اطلاعات</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              اطلاعات را از یک فایل پشتیبان بازیابی کنید
            </p>
          </div>
        </div>

        <div className={getGridClasses()}>
          <div className={getInnerCardClasses()}>
            <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">راهنمای بازیابی:</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">انتخاب فایل پشتیبان (JSON)</span>
                <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">بررسی و بازیابی اطلاعات</span>
                <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">جایگزینی اطلاعات فعلی</span>
                <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500" />
              </li>
            </ul>
            
            <Alert className="mt-3 sm:mt-4 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-900 p-2 sm:p-3">
              <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <AlertTitle className="text-xs sm:text-sm">هشدار</AlertTitle>
              <AlertDescription className="text-xs sm:text-sm">
                با بازیابی اطلاعات، تمام داده‌های فعلی جایگزین خواهند شد!
              </AlertDescription>
            </Alert>
          </div>

          <div className={getInnerCardClasses()}>
            <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">آپلود فایل پشتیبان:</h4>
            <div className="mt-3 sm:mt-4">
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button 
                onClick={handleRestoreClick} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                size={deviceInfo.isMobile ? "sm" : "default"}
              >
                {isLoading ? (
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <div className="animate-spin rounded-full h-3 w-3 xs:h-4 xs:w-4 border-t-2 border-r-2 border-white"></div>
                    <span>در حال بازیابی...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>انتخاب فایل پشتیبان</span>
                  </div>
                )}
              </Button>
            </div>
            
            {restoreSuccess !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg ${
                  restoreSuccess 
                    ? "bg-green-50 dark:bg-green-900/30" 
                    : "bg-red-50 dark:bg-red-900/30"
                }`}
              >
                <p className={`text-xs sm:text-sm font-medium flex items-center gap-1 ${
                  restoreSuccess 
                    ? "text-green-700 dark:text-green-300" 
                    : "text-red-700 dark:text-red-300"
                }`}>
                  {restoreSuccess ? (
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  ) : (
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  )}
                  {restoreMessage}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
