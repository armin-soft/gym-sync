import { toPersianNumbers } from "@/lib/utils/numbers";
import { GraduationCap } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function StudentSidebarFooter() {
  const deviceInfo = useDeviceInfo();
  const [appVersion, setAppVersion] = useState("در حال بارگذاری...");
  
  // Fetch the version from Manifest.json
  useEffect(() => {
    const getVersionFromManifest = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        
        if (manifest && manifest.version) {
          setAppVersion(manifest.version);
        } else {
          setAppVersion("نامشخص");
        }
      } catch (err) {
        console.error('Error loading Manifest.json:', err);
        setAppVersion("خطا در بارگذاری");
      }
    };
    
    getVersionFromManifest();
  }, []);
  
  // تنظیمات ریسپانسیو برای فوتر
  
  const getFooterPadding = () => {
    if (deviceInfo.isMobile) return "p-3";
    if (deviceInfo.isTablet) return "p-3.5";
    return "p-4";
  };
  
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "p-2";
    if (deviceInfo.isTablet) return "p-2.5";
    return "p-3";
  };
  
  const getIconPadding = () => {
    if (deviceInfo.isMobile) return "p-2";
    if (deviceInfo.isTablet) return "p-2";
    return "p-2.5";
  };
  
  const getTextSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-sm";
  };
  
  const getVersionSize = () => {
    if (deviceInfo.isMobile) return "text-[10px]";
    if (deviceInfo.isTablet) return "text-xs";
    return "text-xs";
  };

  return (
    <div className={cn("border-t", getFooterPadding())}>
      <div className={cn("flex items-center gap-3 rounded-lg bg-gradient-to-r from-violet-100/50 to-indigo-100/50 dark:from-violet-900/30 dark:to-indigo-900/30", getContentPadding())}>
        <div className={cn("flex-shrink-0 rounded-full bg-violet-500/20", getIconPadding())}>
          <GraduationCap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        </div>
        <div className="flex flex-col">
          <span className={cn("font-medium text-violet-700 dark:text-violet-300", getTextSize())}>پنل شاگردان</span>
          <div className={cn("text-violet-600 dark:text-violet-400", getVersionSize())}>
            <span>نسخه {toPersianNumbers(appVersion)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
