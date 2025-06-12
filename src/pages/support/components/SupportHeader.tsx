
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, CheckCheck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SupportHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

export const SupportHeader: React.FC<SupportHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead
}) => {
  const deviceInfo = useDeviceInfo();

  const getHeaderPadding = () => {
    if (deviceInfo.isMobile) return "p-6";
    if (deviceInfo.isTablet) return "p-8";
    return "p-10";
  };

  const getTitleSize = () => {
    if (deviceInfo.isMobile) return "text-2xl";
    if (deviceInfo.isTablet) return "text-3xl";
    return "text-4xl";
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-12 h-12";
    if (deviceInfo.isTablet) return "w-16 h-16";
    return "w-20 h-20";
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 rounded-2xl shadow-xl"
      dir="rtl"
    >
      <div className={cn("relative overflow-hidden", getHeaderPadding())}>
        {/* المان‌های تزیینی */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div 
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 bg-white"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15 bg-white"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between" dir="rtl">
          <div className="flex items-center gap-6">
            <div className={cn(
              "rounded-3xl flex items-center justify-center backdrop-blur-sm bg-white/20 shadow-lg",
              getIconSize()
            )}>
              <MessageCircle className={cn(
                "text-white",
                deviceInfo.isMobile ? "w-6 h-6" : deviceInfo.isTablet ? "w-8 h-8" : "w-10 h-10"
              )} />
            </div>
            <div className="text-right">
              <h1 className={cn(
                "font-black text-white mb-2",
                getTitleSize()
              )}>
                مرکز پشتیبانی حرفه‌ای
              </h1>
              <p className={cn(
                "text-emerald-100",
                deviceInfo.isMobile ? "text-sm" : deviceInfo.isTablet ? "text-lg" : "text-xl"
              )}>
                مدیریت هوشمند پیام‌های شاگردان
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <div className="flex items-center gap-3">
                <motion.div
                  className="relative"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Bell className="w-6 h-6 text-white" />
                  <div className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </div>
                </motion.div>
                
                <Button
                  onClick={onMarkAllAsRead}
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                >
                  <CheckCheck className="w-4 h-4 ml-2" />
                  همه را خوانده علامت‌گذاری کن
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
