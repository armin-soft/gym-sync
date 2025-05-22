
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Dumbbell } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface SidebarFooterProps {
  gymName: string;
}

export function SidebarFooter({ gymName }: SidebarFooterProps) {
  const deviceInfo = useDeviceInfo();
  const [appVersion, setAppVersion] = useState("1.9.3");
  
  // Fetch the version from Manifest.json
  useEffect(() => {
    fetch('/Manifest.json')
      .then(response => response.json())
      .then(data => {
        if (data && data.version) {
          setAppVersion(data.version);
        }
      })
      .catch(err => {
        console.error('Error loading Manifest.json:', err);
      });
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
      <div className={cn("flex items-center gap-3 rounded-lg bg-muted/50", getContentPadding())}>
        <div className={cn("flex-shrink-0 rounded-full bg-primary/10", getIconPadding())}>
          <Dumbbell className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className={cn("font-medium", getTextSize())}>{gymName || "برنامه مدیریت"}</span>
          <div className={cn("text-muted-foreground", getVersionSize())}>
            <span>نسخه {toPersianNumbers(appVersion)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
