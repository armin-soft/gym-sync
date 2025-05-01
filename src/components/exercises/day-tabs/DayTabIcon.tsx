
import React from "react";
import { CalendarDays, CalendarCheck2, CalendarClock, CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DayTabIconProps {
  day: string;
  isActive: boolean;
}

export const DayTabIcon: React.FC<DayTabIconProps> = ({ day, isActive }) => {
  // Map of day keys to their respective icons
  const dayIcons = {
    day1: CalendarDays,
    day2: CalendarCheck2,
    day3: CalendarClock,
    day4: CalendarRange
  };
  
  const Icon = dayIcons[day as keyof typeof dayIcons];
  
  return (
    <div className="relative">
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-primary/10 rounded-full -m-1 p-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon 
          className={cn(
            "h-4 w-4 transition-all", 
            isActive 
              ? "text-primary filter drop-shadow-sm" 
              : "text-muted-foreground"
          )} 
        />
      </motion.div>
    </div>
  );
};

export default DayTabIcon;
