
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
    hidden: { opacity: 0, x: 20, y: 10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: index * 0.05
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
          "relative block rounded-xl transition-all duration-200 overflow-hidden group",
          "py-2.5 px-3",
          isActive 
            ? "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 text-white shadow-lg transform scale-[1.01]" 
            : "hover:bg-gradient-to-br hover:from-white/60 hover:via-gray-50/40 hover:to-violet-50/30 dark:hover:from-gray-700/40 dark:hover:via-gray-600/30 dark:hover:to-violet-800/15 hover:shadow-md hover:scale-[1.005]"
        )}
        dir="rtl"
      >
        {/* Background Effects */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/5" />
        )}
        
        {!isActive && isHovered && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-violet-500/8 via-blue-500/4 to-purple-500/8 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          />
        )}
        
        <div className="relative flex items-center gap-3" dir="rtl">
          {/* Icon Container */}
          <motion.div 
            className={cn(
              "flex-shrink-0 rounded-lg flex items-center justify-center relative overflow-hidden",
              deviceInfo.isMobile ? "w-8 h-8" : "w-9 h-9",
              isActive 
                ? "bg-white/15 text-white shadow-sm" 
                : `bg-gradient-to-br ${gradient} text-white shadow-sm group-hover:shadow-md`
            )}
            whileHover={{ rotate: isActive ? 0 : 3, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
            )}
            <Icon className={cn(
              "relative z-10",
              deviceInfo.isMobile ? "w-4 h-4" : "w-4.5 h-4.5"
            )} />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0" dir="rtl">
            <div className="flex items-center justify-between" dir="rtl">
              <motion.span 
                className={cn(
                  "font-semibold text-right truncate",
                  deviceInfo.isMobile ? "text-sm" : "text-base",
                  isActive ? "text-white" : "text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
                )}
                layoutId={`title-${href}`}
              >
                {title}
              </motion.span>
              
              {badge && (
                <motion.span 
                  className={cn(
                    "px-1.5 py-0.5 rounded-full font-medium text-xs ml-1 shadow-sm",
                    badgeColor || "bg-orange-500",
                    isActive ? "text-white bg-white/15" : "text-white"
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {badge}
                </motion.span>
              )}
            </div>
            
            {description && !deviceInfo.isMobile && (
              <motion.p 
                className={cn(
                  "text-right leading-tight mt-0.5",
                  "text-xs",
                  isActive ? "text-white/75" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {description}
              </motion.p>
            )}
          </div>
          
          {/* Arrow Indicator */}
          <motion.div
            className={cn(
              "flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              isActive && "opacity-100"
            )}
            animate={{ x: isHovered || isActive ? -3 : 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ChevronLeft className={cn(
              "w-4 h-4",
              isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
            )} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
