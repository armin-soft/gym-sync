
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { LucideIcon, ChevronLeft, Sparkles } from "lucide-react";

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
    hidden: { opacity: 0, x: 30, y: 20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: index * 0.1
      }
    }
  };
  
  const getMenuPadding = () => {
    if (deviceInfo.isMobile) return "py-3 px-4";
    if (deviceInfo.isTablet) return "py-3.5 px-4";
    return "py-4 px-5";
  };
  
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-5 h-5";
    if (deviceInfo.isTablet) return "w-5.5 h-5.5";
    return "w-6 h-6";
  };
  
  const getIconContainer = () => {
    if (deviceInfo.isMobile) return "w-11 h-11";
    if (deviceInfo.isTablet) return "w-12 h-12";
    return "w-13 h-13";
  };
  
  const getFontSize = () => {
    if (deviceInfo.isMobile) return "text-sm";
    if (deviceInfo.isTablet) return "text-base";
    return "text-lg";
  };
  
  const getDescriptionSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-sm";
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
          "relative block rounded-2xl transition-all duration-300 overflow-hidden group",
          getMenuPadding(),
          isActive 
            ? "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 text-white shadow-2xl transform scale-[1.02]" 
            : "hover:bg-gradient-to-br hover:from-white/80 hover:via-gray-50/60 hover:to-violet-50/40 dark:hover:from-gray-700/60 dark:hover:via-gray-600/40 dark:hover:to-violet-800/20 hover:shadow-xl hover:scale-[1.01]"
        )}
        dir="rtl"
      >
        {/* Background Effects */}
        {isActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </>
        )}
        
        {!isActive && isHovered && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />
        )}
        
        <div className="relative flex items-center gap-4" dir="rtl">
          {/* Icon Container */}
          <motion.div 
            className={cn(
              "flex-shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden",
              getIconContainer(),
              isActive 
                ? "bg-white/20 text-white shadow-lg" 
                : `bg-gradient-to-br ${gradient} text-white shadow-md group-hover:shadow-lg`
            )}
            whileHover={{ rotate: isActive ? 0 : 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            )}
            <Icon className={cn(getIconSize(), "relative z-10")} />
            
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0" dir="rtl">
            <div className="flex items-center justify-between mb-1" dir="rtl">
              <motion.span 
                className={cn(
                  "font-bold text-right truncate",
                  getFontSize(),
                  isActive ? "text-white" : "text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
                )}
                layoutId={`title-${href}`}
              >
                {title}
              </motion.span>
              
              {badge && (
                <motion.span 
                  className={cn(
                    "px-2.5 py-1 rounded-full font-bold text-xs ml-2 shadow-sm",
                    badgeColor || "bg-orange-500",
                    isActive ? "text-white bg-white/20" : "text-white"
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {badge}
                </motion.span>
              )}
            </div>
            
            {description && (
              <motion.p 
                className={cn(
                  "text-right leading-snug",
                  getDescriptionSize(),
                  isActive ? "text-white/80" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {description}
              </motion.p>
            )}
          </div>
          
          {/* Arrow Indicator */}
          <motion.div
            className={cn(
              "flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              isActive && "opacity-100"
            )}
            animate={{ x: isHovered || isActive ? -5 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronLeft className={cn(
              "w-5 h-5",
              isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
            )} />
          </motion.div>
        </div>
        
        {/* Active Item Sparkle Effect */}
        {isActive && (
          <motion.div
            className="absolute top-2 left-2"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}
