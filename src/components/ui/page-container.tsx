
import React from "react";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/utils/basePath";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  withBackground?: boolean;
  fullWidth?: boolean;
  noPadding?: boolean;
  fullHeight?: boolean;
  fullScreen?: boolean;
}

export const PageContainer = ({ 
  children, 
  className = "",
  withBackground = false,
  fullWidth = false,
  noPadding = false,
  fullHeight = false,
  fullScreen = false
}: PageContainerProps) => {
  const deviceInfo = useDeviceInfo();
  const patternUrl = getAssetPath("Assets/Image/Pattern.svg");
  
  // بهینه‌سازی پدینگ ریسپانسیو براساس نوع دستگاه
  const getPadding = () => {
    if (noPadding) return "p-0";
    
    if (deviceInfo.isMobile) {
      return "px-2 py-1";
    } else if (deviceInfo.isTablet) {
      return "px-3 py-2";
    } else if (deviceInfo.isSmallLaptop) {
      return "px-4 py-3";
    } else {
      return "px-5 py-4";
    }
  };
  
  return (
    <div className={cn(
      "w-full flex flex-col",
      fullHeight || fullScreen ? "h-full min-h-screen" : "h-full",
      fullScreen && "fixed inset-0 z-50",
      withBackground && "relative",
      fullWidth ? "max-w-none" : "max-w-full mx-auto",
      className
    )}>
      {withBackground && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10" />
          <div className={`absolute inset-0 bg-[url('${patternUrl}')] opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:opacity-30 -z-10`} />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 -z-10" />
        </>
      )}
      <div className={cn(
        "w-full h-full flex-1 overflow-auto",
        getPadding()
      )}>
        {children}
      </div>
    </div>
  );
};
