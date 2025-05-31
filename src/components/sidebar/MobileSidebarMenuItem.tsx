
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { LucideIcon, ChevronLeft } from "lucide-react";

interface MobileSidebarItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  gradient?: string;
  badge?: string;
  badgeColor?: string;
  index: number;
  onClose: () => void;
}

export function MobileSidebarMenuItem({ 
  title, 
  href, 
  icon: Icon, 
  description, 
  gradient = "from-slate-500 to-gray-600",
  badge, 
  badgeColor, 
  index,
  onClose 
}: MobileSidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === href;
  const [isHovered, setIsHovered] = useState(false);
  const deviceInfo = useDeviceInfo();
  
  const itemVariants = {
    hidden: { opacity: 0, x: 15, y: 5 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        delay: index * 0.03
      }
    }
  };
  
  return (
    <motion.div 
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir="rtl"
      className="relative group"
    >
      <Link
        to={href}
        onClick={onClose}
        className={cn(
          "relative block rounded-lg transition-all duration-200 overflow-hidden group",
          "py-1.5 px-2.5",
          isActive 
            ? "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 text-white shadow-md transform scale-[1.005]" 
            : "hover:bg-gradient-to-br hover:from-white/50 hover:via-gray-50/30 hover:to-violet-50/20 dark:hover:from-gray-700/30 dark:hover:via-gray-600/20 dark:hover:to-violet-800/10 hover:shadow-sm"
        )}
        dir="rtl"
      >
        {/* Background Effects */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />
        )}
        
        <div className="relative flex items-center gap-2.5" dir="rtl">
          {/* Icon Container */}
          <motion.div 
            className={cn(
              "flex-shrink-0 rounded-md flex items-center justify-center relative overflow-hidden",
              "w-7 h-7",
              isActive 
                ? "bg-white/15 text-white shadow-sm" 
                : `bg-gradient-to-br ${gradient} text-white shadow-sm`
            )}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            )}
            <Icon className="relative z-10 w-3.5 h-3.5" />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0" dir="rtl">
            <div className="flex items-center justify-between" dir="rtl">
              <motion.span 
                className={cn(
                  "font-medium text-right truncate text-xs",
                  isActive ? "text-white" : "text-slate-800 dark:text-slate-200"
                )}
                layoutId={`title-${href}`}
              >
                {title}
              </motion.span>
              
              {badge && (
                <motion.span 
                  className={cn(
                    "px-1 py-0.5 rounded-full font-medium text-2xs ml-1 shadow-sm",
                    badgeColor || "bg-orange-500",
                    isActive ? "text-white bg-white/15" : "text-white"
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {badge}
                </motion.span>
              )}
            </div>
          </div>
          
          {/* Arrow Indicator */}
          <motion.div
            className={cn(
              "flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              isActive && "opacity-100"
            )}
            animate={{ x: isHovered || isActive ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ChevronLeft className={cn(
              "w-3 h-3",
              isActive ? "text-white" : "text-slate-400"
            )} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
