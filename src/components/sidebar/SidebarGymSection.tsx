
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SidebarGymSectionProps {
  gymName: string;
}

export const SidebarGymSection = ({ gymName }: SidebarGymSectionProps) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <motion.div 
      className={cn(
        "border-b border-gradient-to-r from-emerald-200/40 via-sky-200/40 to-emerald-200/40 dark:from-emerald-700/40 dark:via-sky-700/40 dark:to-emerald-700/40 bg-gradient-to-r from-emerald-50/80 to-sky-50/60 dark:from-emerald-800/60 dark:to-sky-800/40 backdrop-blur-sm flex-shrink-0",
        deviceInfo.isMobile ? "px-4 py-2" : "px-6 py-4"
      )}
      dir="rtl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-center gap-2">
        <div className={cn(
          "rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 shadow-lg",
          deviceInfo.isMobile ? "p-1.5" : "p-2"
        )}>
          <Crown className={cn(deviceInfo.isMobile ? "h-4 w-4" : "h-5 w-5", "text-white")} />
        </div>
        <h4 className={cn(
          "font-bold text-center bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent",
          deviceInfo.isMobile ? "text-sm" : 
          deviceInfo.isTablet ? "text-base" : "text-lg"
        )}>
          {gymName || "پنل مدیریت حرفه‌ای"}
        </h4>
      </div>
    </motion.div>
  );
};
