
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StudentSidebarItem } from "../../types/studentSidebarTypes";

interface StudentNavigationItemIconProps {
  item: StudentSidebarItem;
  isActive: boolean;
  iconSize: string;
  iconContainer: string;
}

export const StudentNavigationItemIcon: React.FC<StudentNavigationItemIconProps> = ({
  item,
  isActive,
  iconSize,
  iconContainer
}) => {
  const Icon = item.icon;

  return (
    <div className="relative flex-shrink-0">
      <motion.div
        className={cn(
          "rounded-xl flex items-center justify-center transition-all duration-200 shadow-md",
          iconContainer,
          isActive 
            ? "bg-white/20 shadow-lg backdrop-blur-sm" 
            : "bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-emerald-800/50 dark:to-sky-800/50"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className={cn(
          iconSize,
          isActive 
            ? "text-white" 
            : "text-emerald-600 dark:text-emerald-400"
        )} />
      </motion.div>
      
      {item.badge && (
        <motion.div
          className="absolute -top-1 -left-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
        >
          <Badge 
            className={cn(
              "h-5 px-1.5 text-xs font-medium shadow-lg",
              isActive 
                ? "bg-white/90 text-emerald-700 border-white/50" 
                : "bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0"
            )}
          >
            {item.badge}
          </Badge>
        </motion.div>
      )}
      
      {item.isNew && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
};
