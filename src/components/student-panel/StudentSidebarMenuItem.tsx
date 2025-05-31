
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentSidebarItemProps {
  title: string;
  href: string;
  icon: React.ElementType;
  description?: string;
  badge?: string;
  badgeColor?: string;
  onClose: () => void;
}

export function StudentSidebarMenuItem({ 
  title, 
  href, 
  icon: Icon, 
  description, 
  badge, 
  badgeColor, 
  onClose 
}: StudentSidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === href;
  const [isHovered, setIsHovered] = useState(false);
  const deviceInfo = useDeviceInfo();
  
  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 20 }
  };
  
  // تنظیم اندازه منو بر اساس دستگاه
  const getMenuPadding = () => {
    if (deviceInfo.isMobile) return "py-2 px-3";
    if (deviceInfo.isTablet) return "py-2.5 px-3.5";
    return "py-3 px-4";
  };
  
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-4 h-4";
    if (deviceInfo.isTablet) return "w-4.5 h-4.5";
    return "w-5 h-5";
  };
  
  const getIconContainer = () => {
    if (deviceInfo.isMobile) return "w-8 h-8";
    if (deviceInfo.isTablet) return "w-8.5 h-8.5";
    return "w-9 h-9";
  };
  
  const getFontSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-base";
  };
  
  const getDescriptionSize = () => {
    if (deviceInfo.isMobile) return "text-[10px]";
    if (deviceInfo.isTablet) return "text-xs";
    return "text-xs";
  };
  
  return (
    <motion.div 
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir="rtl"
    >
      <Link
        to={href}
        onClick={onClose}
        className={cn(
          "relative block mb-1 rounded-lg transition-all duration-200",
          getMenuPadding(),
          isActive 
            ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg" 
            : "hover:bg-white/50 dark:hover:bg-gray-800/50"
        )}
        dir="rtl"
      >
        {isActive && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600/20 to-indigo-600/20"></div>
        )}
        
        <AnimatePresence>
          {isHovered && !isActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-lg bg-white/30 dark:bg-gray-700/30"
            ></motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative flex items-center" dir="rtl">
          <div className={cn(
            "flex-shrink-0 rounded-md flex items-center justify-center ml-3",
            getIconContainer(),
            isActive 
              ? "bg-white/20 text-white" 
              : "bg-violet-100 dark:bg-violet-800 text-violet-600 dark:text-violet-300"
          )}>
            <Icon className={getIconSize()} />
          </div>
          
          <div className="flex-1" dir="rtl">
            <div className="flex items-center justify-between" dir="rtl">
              <span className={cn(
                "font-medium text-right",
                getFontSize(),
                isActive ? "text-white" : "text-gray-800 dark:text-gray-200"
              )}>
                {title}
              </span>
              
              {badge && (
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full font-medium mr-2",
                  "text-[10px]",
                  badgeColor || "bg-violet-500",
                  isActive ? "text-white bg-white/20" : "text-white"
                )}>
                  {badge}
                </span>
              )}
            </div>
            
            {description && (
              <p className={cn(
                "mt-0.5 text-right",
                getDescriptionSize(),
                isActive ? "text-white/70" : "text-gray-600 dark:text-gray-400"
              )}>
                {description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
