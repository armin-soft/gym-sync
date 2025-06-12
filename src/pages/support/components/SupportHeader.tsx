
import React from "react";
import { MessageSquare, Users, Bell } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function SupportHeader() {
  const deviceInfo = useDeviceInfo();
  
  const getHeaderClasses = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-5";
    return "p-6";
  };

  const getTitleSize = () => {
    if (deviceInfo.isMobile) return "text-xl";
    if (deviceInfo.isTablet) return "text-2xl";
    return "text-3xl";
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-8 h-8";
    if (deviceInfo.isTablet) return "w-10 h-10";
    return "w-12 h-12";
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white shadow-2xl",
      getHeaderClasses()
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10 flex items-center gap-4" dir="rtl">
        <div className={cn(
          "flex-shrink-0 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center",
          getIconSize()
        )}>
          <MessageSquare className={cn(
            "text-white",
            deviceInfo.isMobile ? "w-5 h-5" : deviceInfo.isTablet ? "w-6 h-6" : "w-7 h-7"
          )} />
        </div>
        
        <div className="flex-1 text-right">
          <h1 className={cn(
            "font-black text-white mb-1",
            getTitleSize()
          )}>
            سیستم پشتیبانی
          </h1>
          <p className={cn(
            "text-violet-100",
            deviceInfo.isMobile ? "text-sm" : deviceInfo.isTablet ? "text-base" : "text-lg"
          )}>
            مدیریت پیام‌ها و ارتباط با شاگردان
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Bell className="w-4 h-4 text-violet-200" />
            <span className="text-xs text-violet-200">فعال</span>
          </div>
        </div>
      </div>
    </div>
  );
}
