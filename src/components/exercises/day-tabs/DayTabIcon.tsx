
import React from "react";
import { cn } from "@/lib/utils";
import { Dumbbell } from "lucide-react";

interface DayTabIconProps {
  active: boolean;
}

const DayTabIcon: React.FC<DayTabIconProps> = ({ active }) => {
  return (
    <div className={cn(
      "w-4 h-4 rounded-full flex items-center justify-center",
      active 
        ? "bg-gradient-to-br from-orange-500 to-gold-500 text-black" 
        : "bg-black-200 dark:bg-black-700 text-black-500 dark:text-black-400"
    )}>
      <Dumbbell className="w-2.5 h-2.5" />
    </div>
  );
};

export default DayTabIcon;
