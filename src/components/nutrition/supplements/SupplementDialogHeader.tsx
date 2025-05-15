
import React from "react";
import { Beaker, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SupplementDialogHeaderProps {
  activeTab: "supplements" | "vitamins";
  studentName: string;
}

export const SupplementDialogHeader: React.FC<SupplementDialogHeaderProps> = ({ 
  activeTab,
  studentName 
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className={cn(
        "rounded-full flex items-center justify-center shadow-md",
        deviceInfo.isMobile ? "w-8 h-8" : "w-10 h-10",
        activeTab === "supplements" 
          ? "bg-gradient-to-br from-violet-400 to-purple-600" 
          : "bg-gradient-to-br from-blue-400 to-indigo-600"
      )}>
        {activeTab === "supplements" 
          ? <Beaker className={deviceInfo.isMobile ? "h-4 w-4" : "h-5 w-5"} color="white" /> 
          : <Pill className={deviceInfo.isMobile ? "h-4 w-4" : "h-5 w-5"} color="white" />}
      </div>
      <div>
        <h2 className={cn(
          "font-bold text-foreground",
          deviceInfo.isMobile ? "text-base" : "text-lg"
        )}>
          {activeTab === "supplements" ? "مدیریت مکمل‌ها" : "مدیریت ویتامین‌ها"}
        </h2>
        <p className={cn(
          "font-medium text-muted-foreground",
          deviceInfo.isMobile ? "text-xs" : "text-sm"
        )}>
          {studentName}
        </p>
      </div>
    </div>
  );
};
