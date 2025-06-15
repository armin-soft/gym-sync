
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { StudentSidebarItem } from "../types/studentSidebarTypes";
import { useSidebarDimensions } from "@/components/modern-sidebar/utils/deviceUtils";
import { StudentNavigationItemIcon } from "./navigation-item/StudentNavigationItemIcon";
import { StudentNavigationItemContent } from "./navigation-item/StudentNavigationItemContent";

interface StudentSidebarNavigationItemProps {
  item: StudentSidebarItem;
  index: number;
  onClose: () => void;
}

export const StudentSidebarNavigationItem: React.FC<StudentSidebarNavigationItemProps> = ({
  item,
  index,
  onClose
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const [isHovered, setIsHovered] = useState(false);
  const { deviceInfo } = useSidebarDimensions();
  
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
        delay: index * 0.05
      }
    }
  };
  
  const getItemPadding = () => {
    if (deviceInfo.isMobile) return "p-3";
    if (deviceInfo.isTablet) return "p-3";
    return "p-3";
  };
  
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-4 h-4";
    if (deviceInfo.isTablet) return "w-4 h-4";
    return "w-5 h-5";
  };
  
  const getIconContainer = () => {
    if (deviceInfo.isMobile) return "w-10 h-10";
    if (deviceInfo.isTablet) return "w-10 h-10";
    return "w-11 h-11";
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
          "relative block rounded-xl transition-all duration-300 overflow-hidden",
          getItemPadding(),
          isActive 
            ? "bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 text-white shadow-lg transform scale-[1.01]" 
            : "bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80 hover:shadow-md hover:scale-[1.005] backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30"
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
        
        <div className="relative z-10 flex items-center gap-3" dir="rtl">
          <StudentNavigationItemIcon
            item={item}
            isActive={isActive}
            iconSize={getIconSize()}
            iconContainer={getIconContainer()}
          />
          
          <StudentNavigationItemContent
            item={item}
            isActive={isActive}
            deviceInfo={deviceInfo}
          />
          
          <motion.div
            className={cn(
              "flex-shrink-0 transition-all duration-200",
              isActive || isHovered ? "opacity-100" : "opacity-0"
            )}
            animate={{ 
              x: isHovered || isActive ? -2 : 0,
              scale: isActive ? 1.05 : 1
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ChevronLeft className={cn(
              deviceInfo.isMobile ? "w-3.5 h-3.5" : "w-4 h-4",
              isActive ? "text-white" : "text-emerald-500 dark:text-emerald-400"
            )} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};
