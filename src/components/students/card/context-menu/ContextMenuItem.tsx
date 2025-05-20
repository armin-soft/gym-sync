
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ContextMenuItem } from "@/components/ui/context-menu";

type MenuItemVariant = "purple" | "blue" | "red" | "green" | "orange" | "slate";

interface ContextMenuItemWithAnimationProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
  disabled?: boolean;
  index: number;
  variant?: MenuItemVariant;
  disableAnimations?: boolean;
}

export const ContextMenuItemWithAnimation: React.FC<ContextMenuItemWithAnimationProps> = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled = false,
  index,
  variant = "purple",
  disableAnimations = false
}) => {
  // تنظیم رنگ براساس نوع آیتم منو
  const getVariantClasses = (variant: MenuItemVariant) => {
    switch(variant) {
      case "purple": return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50";
      case "blue": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50";
      case "red": return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-900/50";
      case "green": return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/50";
      case "orange": return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50";
      case "slate": return "bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700";
      default: return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50";
    }
  };
  
  const getHoverTextColor = (variant: MenuItemVariant) => {
    switch(variant) {
      case "purple": return "group-hover:text-purple-700 dark:group-hover:text-purple-300";
      case "blue": return "group-hover:text-blue-700 dark:group-hover:text-blue-300";
      case "red": return "group-hover:text-red-700 dark:group-hover:text-red-300";
      case "green": return "group-hover:text-green-700 dark:group-hover:text-green-300";
      case "orange": return "group-hover:text-orange-700 dark:group-hover:text-orange-300";
      case "slate": return "group-hover:text-slate-800 dark:group-hover:text-slate-200";
      default: return "group-hover:text-purple-700 dark:group-hover:text-purple-300";
    }
  };

  // اگر disableAnimations فعال است، کامپوننت بدون انیمیشن رندر می‌شود
  if (disableAnimations) {
    return (
      <ContextMenuItem
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "flex items-center gap-3 p-2 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200",
          "transition-colors duration-150 group",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <div className={cn(
          "p-1.5 rounded-md",
          getVariantClasses(variant)
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <p className={cn(
            "text-sm font-medium",
            getHoverTextColor(variant)
          )}>
            {title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </ContextMenuItem>
    );
  }
  
  // نسخه با انیمیشن (استفاده شده در حالت پیش‌فرض)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: index * 0.05, duration: 0.15 } 
      }}
      exit={{ opacity: 0, y: 5, transition: { duration: 0.1 } }}
    >
      <ContextMenuItem
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "flex items-center gap-3 p-2 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200",
          "transition-all duration-200 group",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <motion.div 
          className={cn(
            "p-1.5 rounded-md",
            getVariantClasses(variant)
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.div>
        <div className="flex-1">
          <p className={cn(
            "text-sm font-medium",
            getHoverTextColor(variant)
          )}>
            {title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </ContextMenuItem>
    </motion.div>
  );
};
