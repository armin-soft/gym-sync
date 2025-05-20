
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface MenuItemWithIconProps {
  icon: React.ReactNode;
  onClick?: () => void;
  title: string;
  subtitle: string;
  iconClassName?: string;
  hoverClassName?: string;
  disabled?: boolean;
  custom?: number;
  disableAnimation?: boolean;
}

export const MenuItemWithIcon = ({
  icon,
  onClick,
  title,
  subtitle,
  iconClassName,
  hoverClassName,
  disabled = false,
  custom = 0,
  disableAnimation = false
}: MenuItemWithIconProps) => {
  
  // نسخه بدون انیمیشن برای سرعت بیشتر
  if (disableAnimation) {
    return (
      <DropdownMenuItem
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "flex items-center gap-3 p-2 cursor-pointer rounded-lg",
          "transition-colors duration-150 text-slate-700 dark:text-slate-200 group/item",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <div className={cn(
          "p-1.5 rounded-md shadow-sm",
          iconClassName
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <p className={cn("text-sm font-medium", hoverClassName)}>
            {title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </DropdownMenuItem>
    );
  }
  
  // نسخه با انیمیشن (پیش‌فرض)
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: custom * 0.05, duration: 0.15 } 
      }}
      exit={{ opacity: 0, x: -5 }}
    >
      <DropdownMenuItem 
        onClick={onClick} 
        disabled={disabled}
        className={cn(
          "flex items-center gap-3 p-2 cursor-pointer rounded-lg", 
          "transition-all duration-200 text-slate-700 dark:text-slate-200 group/item",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <div className={cn(
          "p-1.5 rounded-md shadow-sm",
          iconClassName
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <p className={cn("text-sm font-medium", hoverClassName)}>
            {title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </DropdownMenuItem>
    </motion.div>
  );
};
