
import React from "react";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  withBackground?: boolean;
  fullWidth?: boolean;
  noPadding?: boolean;
  fullHeight?: boolean;
  fullScreen?: boolean;
  maxWidth?: string;
  scrollable?: boolean;
}

export const PageContainer = React.memo(({ 
  children, 
  className = "",
  withBackground = false,
  fullWidth = true,
  noPadding = false,
  fullHeight = true,
  fullScreen = false,
  maxWidth = "none",
  scrollable = true
}: PageContainerProps) => {
  const deviceInfo = useDeviceInfo();
  
  // بهینه‌سازی پدینگ ریسپانسیو با مقادیر فول اسکرین
  const getPadding = React.useMemo(() => {
    if (noPadding) return "p-0";
    
    if (deviceInfo.isMobile) {
      return "px-1 py-1 xs:px-2 xs:py-2";
    } else if (deviceInfo.isTablet) {
      return "px-2 py-2 sm:px-3 sm:py-3";
    } else if (deviceInfo.isSmallLaptop) {
      return "px-3 py-3 md:px-4 md:py-4";
    } else {
      return "px-4 py-4 lg:px-6 lg:py-6 xl:px-8 xl:py-8";
    }
  }, [noPadding, deviceInfo.isMobile, deviceInfo.isTablet, deviceInfo.isSmallLaptop]);
  
  const backgroundElements = withBackground ? (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 -z-10" />
    </>
  ) : null;
  
  // کلاس‌های کانتینر اصلی فول اسکرین - حل مشکل اسکرول
  const containerClasses = React.useMemo(() => {
    return cn(
      "w-full flex flex-col relative",
      fullHeight || fullScreen ? "h-screen min-h-screen max-h-screen" : "h-full min-h-full",
      fullScreen && "fixed inset-0 z-50",
      withBackground && "relative",
      fullWidth ? "max-w-none" : maxWidth !== "none" ? maxWidth : "max-w-full mx-auto",
      scrollable ? "overflow-auto" : "overflow-visible",
      className
    );
  }, [fullHeight, fullScreen, withBackground, fullWidth, maxWidth, scrollable, className]);
  
  // کلاس‌های محتوای فول ریسپانسیو - حل مشکل اسکرول
  const contentClasses = React.useMemo(() => {
    return cn(
      "w-full h-full flex-1",
      scrollable ? "overflow-auto" : "overflow-visible",
      getPadding
    );
  }, [getPadding, scrollable]);
  
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
