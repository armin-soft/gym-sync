
import React from "react";
import { CalendarDays, CalendarCheck2, CalendarClock, CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Icon 
      className={cn(
        "h-4 w-4 transition-colors", 
        isActive ? "text-primary" : "text-muted-foreground"
      )} 
    />
  );
};

export default DayTabIcon;
