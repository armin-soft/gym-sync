
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
    <motion.div
      initial={{ scale: 0.9, rotate: -5 }}
      animate={{ 
        scale: isActive ? 1.1 : 1,
        rotate: 0 
      }}
      transition={{ duration: 0.2 }}
    >
      <Icon 
        className={cn(
          "h-4 w-4 transition-all duration-300", 
          isActive 
            ? "text-primary filter drop-shadow-md" 
            : "text-muted-foreground"
        )}
      />
    </motion.div>
  );
};

export default DayTabIcon;
