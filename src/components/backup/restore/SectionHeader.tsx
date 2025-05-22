
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Database } from "lucide-react";

export function SectionHeader() {
  const deviceInfo = useDeviceInfo();
  
  const getIconContainerClasses = () => {
    return "bg-indigo-100 dark:bg-indigo-900 p-2 sm:p-3 md:p-4 rounded-xl";
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-5 h-5";
    if (deviceInfo.isTablet) return "w-6 h-6";
    if (deviceInfo.isSmallLaptop) return "w-7 h-7";
    return "w-8 h-8";
  };

  return (
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
  );
}
