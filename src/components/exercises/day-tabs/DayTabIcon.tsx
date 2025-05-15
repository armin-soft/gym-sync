
import React from "react";
import { Calendar, CalendarCheck, CalendarClock, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayTabIconProps {
  tabId: string;
  isActive: boolean;
}

const DayTabIcon: React.FC<DayTabIconProps> = ({ tabId, isActive }) => {
  const getIconProps = () => ({
    className: cn(
      "h-4 w-4",
      isActive ? "text-primary" : "text-muted-foreground"
    )
  });
  
  switch(tabId) {
    case "day1":
      return <Calendar {...getIconProps()} />;
    case "day2":
      return <CalendarCheck {...getIconProps()} />;
    case "day3":
      return <CalendarDays {...getIconProps()} />;
    case "day4":
      return <CalendarClock {...getIconProps()} />;
    default:
      return <Calendar {...getIconProps()} />;
  }
};

export default DayTabIcon;
