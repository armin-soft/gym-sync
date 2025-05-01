
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
        ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white" 
        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
    )}>
      <Dumbbell className="w-2.5 h-2.5" />
    </div>
  );
};

export default DayTabIcon;
