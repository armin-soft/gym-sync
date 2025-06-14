
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItemIconProps {
  icon: LucideIcon;
  isActive: boolean;
  iconSize?: string;
  iconContainer?: string;
  isNew?: boolean;
  gradient?: string;
}

export const NavigationItemIcon: React.FC<NavigationItemIconProps> = ({
  icon: Icon,
  isActive,
  iconSize = "w-5 h-5",
  iconContainer = "w-9 h-9",
  isNew = false,
  gradient = "from-emerald-500 to-sky-600"
}) => {
  return (
    <motion.div 
      className={cn(
        "flex-shrink-0 rounded-lg flex items-center justify-center relative overflow-hidden",
        iconContainer,
        isActive 
          ? "bg-white/25 text-white shadow-md" 
          : `bg-gradient-to-br ${gradient} text-white shadow-sm`
      )}
      whileHover={{ scale: 1.05, rotate: isActive ? 0 : 3 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {!isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      )}
      <Icon className={cn(iconSize, "relative z-10")} />
      
      {isNew && (
        <motion.div
          className="absolute -top-0.5 -right-0.5"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
        </motion.div>
      )}
    </motion.div>
  );
};
