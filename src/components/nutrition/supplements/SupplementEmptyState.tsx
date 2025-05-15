
import React from "react";
import { Beaker, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SupplementEmptyStateProps {
  activeTab: "supplements" | "vitamins";
}

export const SupplementEmptyState: React.FC<SupplementEmptyStateProps> = ({
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
      <div className={cn(
        "rounded-full flex items-center justify-center mb-4 shadow-sm",
        deviceInfo.isMobile ? "w-12 h-12" : "w-16 h-16",
        activeTab === "supplements" 
          ? "bg-gradient-to-b from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900" 
          : "bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900"
      )}>
        {activeTab === "supplements" ? (
          <Beaker className={deviceInfo.isMobile ? "h-6 w-6" : "h-8 w-8"} color={activeTab === "supplements" ? "#8b5cf6" : "#3b82f6"} />
        ) : (
          <Pill className={deviceInfo.isMobile ? "h-6 w-6" : "h-8 w-8"} color={activeTab === "supplements" ? "#8b5cf6" : "#3b82f6"} />
        )}
      </div>
      <h3 className={cn(
        "font-medium text-foreground",
        deviceInfo.isMobile ? "text-base" : "text-lg"
      )}>
        هیچ {activeTab === "supplements" ? "مکملی" : "ویتامینی"} یافت نشد
      </h3>
      <p className="text-sm text-muted-foreground mt-2">
        لطفاً جستجوی خود را تغییر دهید یا فیلترها را بررسی کنید
      </p>
    </div>
  );
};
