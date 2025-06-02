
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Sparkles } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SidebarItem } from "../types";

interface SidebarNavigationItemProps {
  item: SidebarItem;
  index: number;
  onClose: () => void;
}

export const SidebarNavigationItem: React.FC<SidebarNavigationItemProps> = ({
  item,
  index,
  onClose
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;
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
        stiffness: 150,
        damping: 12,
        delay: index * 0.08
      }
    }
  };
  
  const getItemPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-4";
    return "p-5";
  };
  
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-5 h-5";
    if (deviceInfo.isTablet) return "w-5 h-5";
    return "w-6 h-6";
  };
  
  const getIconContainer = () => {
    if (deviceInfo.isMobile) return "w-12 h-12";
    if (deviceInfo.isTablet) return "w-12 h-12";
    return "w-14 h-14";
  };

  return (
    <motion.div 
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      dir="rtl"
    >
      <Link
        to={item.href}
        onClick={onClose}
        className={cn(
          "relative block rounded-2xl transition-all duration-300 overflow-hidden",
          getItemPadding(),
          isActive 
            ? "bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 text-white shadow-xl transform scale-[1.02]" 
            : "bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80 hover:shadow-lg hover:scale-[1.01] backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30"
        )}
        dir="rtl"
      >
        {/* Background effects */}
        {isActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}
        
        {!isActive && isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-sky-100/30 dark:from-emerald-800/30 dark:to-sky-800/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        
        <div className="relative z-10 flex items-center gap-4" dir="rtl">
          {/* Icon Container */}
          <motion.div 
            className={cn(
              "flex-shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden",
              getIconContainer(),
              isActive 
                ? "bg-white/25 text-white shadow-lg" 
                : `bg-gradient-to-br ${item.gradient} text-white shadow-md`
            )}
            whileHover={{ scale: 1.05, rotate: isActive ? 0 : 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            )}
            <item.icon className={cn(getIconSize(), "relative z-10")} />
            
            {/* Sparkle effect for new items */}
            {item.isNew && (
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </motion.div>
            )}
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0" dir="rtl">
            <div className="flex items-center justify-between mb-1" dir="rtl">
              <motion.h3 
                className={cn(
                  "font-bold text-right",
                  deviceInfo.isMobile ? "text-base" : "text-lg",
                  isActive ? "text-white" : "text-emerald-800 dark:text-emerald-200"
                )}
                layoutId={`title-${item.href}`}
              >
                {item.title}
              </motion.h3>
              
              {/* Badges */}
              <div className="flex items-center gap-1">
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-2xs px-2 py-0.5 shadow-sm",
                      item.badgeColor || "bg-amber-500",
                      isActive ? "bg-white/20 text-white" : "text-white"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                
                {item.isNew && (
                  <Badge variant="secondary" className="text-2xs px-2 py-0.5 bg-green-500 text-white shadow-sm">
                    جدید
                  </Badge>
                )}
              </div>
            </div>
            
            <motion.p 
              className={cn(
                "text-right leading-relaxed",
                deviceInfo.isMobile ? "text-xs" : "text-sm",
                isActive ? "text-white/85" : "text-emerald-600 dark:text-emerald-400"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {item.subtitle}
            </motion.p>
          </div>
          
          {/* Arrow indicator */}
          <motion.div
            className={cn(
              "flex-shrink-0 transition-all duration-200",
              isActive || isHovered ? "opacity-100" : "opacity-0"
            )}
            animate={{ 
              x: isHovered || isActive ? -3 : 0,
              scale: isActive ? 1.1 : 1
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ChevronLeft className={cn(
              deviceInfo.isMobile ? "w-4 h-4" : "w-5 h-5",
              isActive ? "text-white" : "text-emerald-500 dark:text-emerald-400"
            )} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};
