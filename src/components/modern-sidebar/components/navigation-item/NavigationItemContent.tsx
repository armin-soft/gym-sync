
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NavigationItemContentProps {
  title: string;
  description?: string;
  isActive: boolean;
  badge?: string;
  badgeColor?: string;
  isNew?: boolean;
  deviceInfo?: any;
}

export const NavigationItemContent: React.FC<NavigationItemContentProps> = ({
  title,
  description,
  isActive,
  badge,
  badgeColor,
  isNew = false,
  deviceInfo = { isMobile: false }
}) => {
  return (
    <div className="flex-1 min-w-0" dir="rtl">
      <div className="flex items-center justify-between mb-0.5" dir="rtl">
        <motion.h3 
          className={cn(
            "font-bold text-right",
            deviceInfo.isMobile ? "text-sm" : "text-sm",
            isActive ? "text-white" : "text-emerald-800 dark:text-emerald-200"
          )}
          layoutId={`title-${title}`}
        >
          {title}
        </motion.h3>
        
        <div className="flex items-center gap-1">
          {badge && (
            <Badge 
              variant="secondary" 
              className={cn(
                "text-3xs px-1.5 py-0.5 shadow-sm",
                badgeColor || "bg-amber-500",
                isActive ? "bg-white/20 text-white" : "text-white"
              )}
            >
              {badge}
            </Badge>
          )}
          
          {isNew && (
            <Badge variant="secondary" className="text-3xs px-1.5 py-0.5 bg-green-500 text-white shadow-sm">
              جدید
            </Badge>
          )}
        </div>
      </div>
      
      {description && (
        <motion.p 
          className={cn(
            "text-right leading-relaxed",
            deviceInfo.isMobile ? "text-2xs" : "text-xs",
            isActive ? "text-white/85" : "text-emerald-600 dark:text-emerald-400"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
