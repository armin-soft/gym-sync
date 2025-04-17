
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: React.ElementType;
  description?: string;
  badge?: string;
  badgeColor?: string;
  onClose: () => void;
}

export function SidebarMenuItem({ 
  title, 
  href, 
  icon: Icon, 
  description, 
  badge, 
  badgeColor, 
  onClose 
}: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === href;
  const [isHovered, setIsHovered] = useState(false);
  
  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 20 }
  };
  
  return (
    <motion.div 
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={href}
        onClick={onClose}
        className={cn(
          "relative block py-3 px-4 mb-1 rounded-lg transition-all duration-200",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-muted"
        )}
      >
        {isActive && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 opacity-80"></div>
        )}
        
        <AnimatePresence>
          {isHovered && !isActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-lg bg-muted"
            ></motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative flex items-center">
          <div className={cn(
            "flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center mr-3.5",
            isActive 
              ? "bg-white/20 text-white" 
              : "bg-muted-foreground/10 text-muted-foreground"
          )}>
            <Icon className="h-5 w-5" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={cn(
                "font-medium",
                isActive ? "text-white" : ""
              )}>
                {title}
              </span>
              
              {badge && (
                <span className={cn(
                  "px-1.5 py-0.5 text-[10px] rounded-full font-medium",
                  badgeColor || "bg-primary",
                  isActive ? "text-white bg-white/20" : "text-white"
                )}>
                  {badge}
                </span>
              )}
            </div>
            
            {description && (
              <p className={cn(
                "text-xs mt-0.5",
                isActive ? "text-white/70" : "text-muted-foreground"
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
