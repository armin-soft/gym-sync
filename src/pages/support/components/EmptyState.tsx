
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Search, Inbox } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  hasMessages: boolean;
  searchQuery: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasMessages, searchQuery }) => {
  const deviceInfo = useDeviceInfo();

  const getPadding = () => {
    if (deviceInfo.isMobile) return "p-8";
    if (deviceInfo.isTablet) return "p-12";
    return "p-16";
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-16 h-16";
    if (deviceInfo.isTablet) return "w-20 h-20";
    return "w-24 h-24";
  };

  const getTitleSize = () => {
    if (deviceInfo.isMobile) return "text-lg";
    if (deviceInfo.isTablet) return "text-xl";
    return "text-2xl";
  };

  const getDescSize = () => {
    if (deviceInfo.isMobile) return "text-sm";
    if (deviceInfo.isTablet) return "text-base";
    return "text-lg";
  };

  const icon = searchQuery ? Search : hasMessages ? Search : Inbox;
  const title = searchQuery 
    ? "نتیجه‌ای یافت نشد" 
    : hasMessages 
    ? "پیامی با این فیلترها یافت نشد"
    : "هنوز پیامی دریافت نشده";
  
  const description = searchQuery
    ? "لطفاً کلمات کلیدی دیگری را امتحان کنید"
    : hasMessages
    ? "فیلترهای خود را تغییر دهید تا پیام‌های بیشتری مشاهده کنید"
    : "پیام‌های ارسالی از سوی شاگردان در اینجا نمایش داده خواهد شد";

  const Icon = icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      className={cn("text-center", getPadding())}
      dir="rtl"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn(
          "mx-auto rounded-full bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center mb-6",
          getIconSize()
        )}
      >
        <Icon className={cn(
          "text-gray-400",
          deviceInfo.isMobile ? "w-8 h-8" : deviceInfo.isTablet ? "w-10 h-10" : "w-12 h-12"
        )} />
      </motion.div>

      <h3 className={cn(
        "font-semibold text-gray-600 mb-3",
        getTitleSize()
      )}>
        {title}
      </h3>

      <p className={cn(
        "text-gray-500 max-w-md mx-auto leading-relaxed",
        getDescSize()
      )}>
        {description}
      </p>
    </motion.div>
  );
};
