
import React from "react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContextMenuItemWithAnimationProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  index: number;
  variant?: "purple" | "blue" | "green" | "orange" | "red";
  customContent?: React.ReactNode;
}

export const ContextMenuItemWithAnimation: React.FC<ContextMenuItemWithAnimationProps> = ({
  icon,
  title,
  subtitle,
  onClick,
  index,
  variant = "blue",
  customContent
}) => {
  // Define colors for different variants
  const getVariantClasses = () => {
    switch (variant) {
      case "purple":
        return {
          iconBg: "bg-purple-50 dark:bg-purple-900/30",
          iconColor: "text-purple-600 dark:text-purple-400",
          hoverBg: "hover:bg-purple-50/80 dark:hover:bg-purple-900/20",
        };
      case "green":
        return {
          iconBg: "bg-green-50 dark:bg-green-900/30",
          iconColor: "text-green-600 dark:text-green-400",
          hoverBg: "hover:bg-green-50/80 dark:hover:bg-green-900/20",
        };
      case "orange":
        return {
          iconBg: "bg-orange-50 dark:bg-orange-900/30",
          iconColor: "text-orange-600 dark:text-orange-400",
          hoverBg: "hover:bg-orange-50/80 dark:hover:bg-orange-900/20",
        };
      case "red":
        return {
          iconBg: "bg-red-50 dark:bg-red-900/30",
          iconColor: "text-red-600 dark:text-red-400",
          hoverBg: "hover:bg-red-50/80 dark:hover:bg-red-900/20",
        };
      case "blue":
      default:
        return {
          iconBg: "bg-blue-50 dark:bg-blue-900/30",
          iconColor: "text-blue-600 dark:text-blue-400",
          hoverBg: "hover:bg-blue-50/80 dark:hover:bg-blue-900/20",
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: index * 0.05, duration: 0.2 } 
      }}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      {customContent ? (
        <div className={cn(
          "flex flex-col p-2 rounded-lg cursor-pointer",
          variantClasses.hoverBg
        )}>
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-md", variantClasses.iconBg, variantClasses.iconColor)}>
              {icon}
            </div>
            {customContent}
          </div>
        </div>
      ) : (
        <ContextMenuItem 
          onClick={onClick}
          className={cn(
            "flex flex-col p-2 focus:bg-transparent focus:text-inherit",
            variantClasses.hoverBg
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-md", variantClasses.iconBg, variantClasses.iconColor)}>
              {icon}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">{title}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>
            </div>
          </div>
        </ContextMenuItem>
      )}
    </motion.div>
  );
};
