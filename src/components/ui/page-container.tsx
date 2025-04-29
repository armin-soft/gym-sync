
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
}

export const PageContainer = ({ 
  children, 
  className = "",
  withBackground = false,
  fullWidth = false,
  noPadding = false
}: PageContainerProps) => {
  const deviceInfo = useDeviceInfo();
  const patternUrl = getAssetPath("Assets/Image/Pattern.svg");
  
  // Calculate responsive padding based on device type
  const getPadding = () => {
    if (noPadding) return "p-0";
    
    if (deviceInfo.isMobile) {
      return "px-2 py-2";
    } else if (deviceInfo.isTablet) {
      return "px-4 py-3";
    } else if (deviceInfo.isSmallLaptop) {
      return "px-6 py-4";
    } else {
      return "px-8 py-6";
    }
  };
  
  return (
    <div className={cn(
      "w-full h-full flex flex-col",
      withBackground && "relative",
      fullWidth ? "max-w-none" : "max-w-[2000px] mx-auto",
      className
    )}>
      {withBackground && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10" />
          <div className={`absolute inset-0 bg-[url('${patternUrl}')] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50 -z-10`} />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5 -z-10" />
        </>
      )}
      <div className={cn(
        "w-full h-full overflow-auto transition-all duration-300",
        getPadding()
      )}>
        {children}
      </div>
    </div>
  );
};
