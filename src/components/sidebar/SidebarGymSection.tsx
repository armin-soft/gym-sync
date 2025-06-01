
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
        "border-b border-gradient-to-r from-violet-200/30 via-blue-200/30 to-purple-200/30 dark:from-violet-700/30 dark:via-blue-700/30 dark:to-purple-700/30 bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm flex-shrink-0",
        deviceInfo.isMobile ? "px-4 py-2" : "px-6 py-4"
      )}
      dir="rtl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-center gap-2">
        <div className={cn(
          "rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg",
          deviceInfo.isMobile ? "p-1.5" : "p-2"
        )}>
          <Crown className={cn(deviceInfo.isMobile ? "h-4 w-4" : "h-5 w-5", "text-white")} />
        </div>
        <h4 className={cn(
          "font-bold text-center bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent",
          deviceInfo.isMobile ? "text-sm" : 
          deviceInfo.isTablet ? "text-base" : "text-lg"
        )}>
          {gymName || "پنل مدیریت حرفه‌ای"}
        </h4>
      </div>
    </motion.div>
  );
};
