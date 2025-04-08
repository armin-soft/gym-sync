
import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  withBackground?: boolean;
}

export const PageContainer = ({ 
  children, 
  className = "",
  withBackground = false
}: PageContainerProps) => {
  return (
    <div className={cn(
      "w-full h-full min-h-screen pb-0 flex flex-col",
      withBackground && "relative",
      className
    )}>
      {withBackground && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50 -z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5 -z-10" />
        </>
      )}
      {children}
    </div>
  );
};
