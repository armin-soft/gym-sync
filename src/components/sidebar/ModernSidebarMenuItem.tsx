
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { LucideIcon, ChevronLeft } from "lucide-react";

interface ModernSidebarItemProps {
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

export function ModernSidebarMenuItem({ 
  title, 
  href, 
  icon: Icon, 
  description, 
  gradient = "from-slate-500 to-gray-600",
  badge, 
  badgeColor, 
  index,
  onClose 
}: ModernSidebarItemProps) {
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
        delay: index * 0.05
      }
    }
  };
  
  // تنظیمات ریسپانسیو
  const getMenuPadding = () => {
    if (deviceInfo.isMobile) return "py-1.5 px-2.5";
    if (deviceInfo.isTablet) return "py-2.5 px-3";
    return "py-3 px-4";
  };
  
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-3.5 h-3.5";
    if (deviceInfo.isTablet) return "w-4.5 h-4.5";
    return "w-5 h-5";
  };
  
  const getIconContainer = () => {
    if (deviceInfo.isMobile) return "w-7 h-7";
    if (deviceInfo.isTablet) return "w-9 h-9";
    return "w-10 h-10";
  };
  
  const getFontSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-base";
  };
  
  const getDescriptionSize = () => {
    if (deviceInfo.isMobile) return "text-2xs";
    if (deviceInfo.isTablet) return "text-xs";
    return "text-sm";
  };
  
  const getGap = () => {
    if (deviceInfo.isMobile) return "gap-2.5";
    if (deviceInfo.isTablet) return "gap-3";
    return "gap-4";
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
          getMenuPadding(),
          isActive 
            ? "bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 text-white shadow-lg transform scale-[1.02]" 
            : "hover:bg-gradient-to-br hover:from-emerald-50/60 hover:via-sky-50/40 hover:to-emerald-50/30 dark:hover:from-emerald-700/40 dark:hover:via-sky-600/30 dark:hover:to-emerald-800/20 hover:shadow-md hover:scale-[1.01]"
        )}
        dir="rtl"
      >
        {/* Background Effects */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/5" />
        )}
        
        <div className={cn("relative flex items-center", getGap())} dir="rtl">
          {/* Icon Container */}
          <motion.div 
            className={cn(
              "flex-shrink-0 rounded-lg flex items-center justify-center relative overflow-hidden",
              getIconContainer(),
              isActive 
                ? "bg-white/20 text-white shadow-sm" 
                : `bg-gradient-to-br ${gradient} text-white shadow-sm`
            )}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
            )}
            <Icon className={cn(getIconSize(), "relative z-10")} />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0" dir="rtl">
            <div className="flex items-center justify-between" dir="rtl">
              <motion.span 
                className={cn(
                  "font-medium text-right truncate",
                  getFontSize(),
                  isActive ? "text-white" : "text-emerald-800 dark:text-emerald-200"
                )}
                layoutId={`title-${href}`}
              >
                {title}
              </motion.span>
              
              {badge && (
                <motion.span 
                  className={cn(
                    "px-1.5 py-0.5 rounded-full font-medium text-2xs ml-1 shadow-sm",
                    badgeColor || "bg-orange-500",
                    isActive ? "text-white bg-white/20" : "text-white"
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {badge}
                </motion.span>
              )}
            </div>
            
            {description && !deviceInfo.isMobile && (
              <motion.p 
                className={cn(
                  "text-right leading-relaxed mt-0.5 truncate",
                  getDescriptionSize(),
                  isActive ? "text-white/80" : "text-emerald-600 dark:text-emerald-400"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
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
            animate={{ x: isHovered || isActive ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ChevronLeft className={cn(
              deviceInfo.isMobile ? "w-3 h-3" : "w-4 h-4",
              isActive ? "text-white" : "text-emerald-400"
            )} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
