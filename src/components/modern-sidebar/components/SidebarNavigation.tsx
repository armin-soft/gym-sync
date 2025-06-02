
import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNavigationItem } from "./SidebarNavigationItem";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SidebarItem } from "../types";

interface SidebarNavigationProps {
  items: SidebarItem[];
  onClose: () => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  items,
  onClose
}) => {
  const deviceInfo = useDeviceInfo();
  
  const getPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-5";
    return "p-6";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  return (
    <ScrollArea className="h-full">
      <motion.div 
        className={cn("space-y-2", getPadding())}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        dir="rtl"
      >
        {/* Navigation Header */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-lg font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent mb-1">
            پنل مدیریت حرفه‌ای
          </h4>
          <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
            دسترسی سریع به تمام بخش‌های سیستم
          </p>
          
          {/* Decorative line */}
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full mx-auto mt-3"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>

        {/* Navigation Items */}
        <div className="space-y-1">
          {items.map((item, index) => (
            <SidebarNavigationItem
              key={item.id}
              item={item}
              index={index}
              onClose={onClose}
            />
          ))}
        </div>

        {/* Bottom decorative section */}
        <motion.div
          className="mt-8 pt-6 border-t border-emerald-200/30 dark:border-emerald-700/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center">
            <p className="text-xs text-emerald-600/60 dark:text-emerald-400/60 leading-relaxed">
              سیستم مدیریت پیشرفته برای مربیان حرفه‌ای
            </p>
            <p className="text-2xs text-emerald-500/50 dark:text-emerald-400/50 mt-1">
              همراه شما در مسیر موفقیت ورزشی
            </p>
          </div>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};
