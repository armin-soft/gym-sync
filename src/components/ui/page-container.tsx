
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

export const PageContainer = React.memo(({ 
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
  
  // بهینه‌سازی پدینگ ریسپانسیو براساس نوع دستگاه با مقادیر ثابت
  const getPadding = React.useMemo(() => {
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
  }, [noPadding, deviceInfo.isMobile, deviceInfo.isTablet, deviceInfo.isSmallLaptop]);
  
  const backgroundElements = withBackground ? (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10" />
      <div className={`absolute inset-0 bg-[url('${patternUrl}')] opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:opacity-30 -z-10`} />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 -z-10" />
    </>
  ) : null;
  
  // ثابت کردن کلاس‌های استایل برای جلوگیری از رندرهای مجدد
  const containerClasses = React.useMemo(() => {
    return cn(
      "w-full flex flex-col overflow-hidden",
      fullHeight || fullScreen ? "h-full min-h-screen" : "h-full",
      fullScreen && "fixed inset-0 z-50",
      withBackground && "relative",
      fullWidth ? "max-w-none" : "max-w-full mx-auto",
      className
    );
  }, [fullHeight, fullScreen, withBackground, fullWidth, className]);
  
  const contentClasses = React.useMemo(() => {
    return cn(
      "w-full h-full flex-1 overflow-auto",
      getPadding
    );
  }, [getPadding]);
  
  return (
    <div className={containerClasses}>
      {backgroundElements}
      <div className={contentClasses}>
        {children}
      </div>
    </div>
  );
});

PageContainer.displayName = "PageContainer";
