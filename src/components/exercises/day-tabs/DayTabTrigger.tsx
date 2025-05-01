
import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import DayTabIcon from "./DayTabIcon";
import { motion } from "framer-motion";

interface DayTabTriggerProps {
  day: string;
  activeTab: string;
  selectedExercisesCount: number;
}

export const DayTabTrigger: React.FC<DayTabTriggerProps> = ({
  day,
  activeTab,
  selectedExercisesCount
}) => {
  const dayNumber = day.replace("day", "");
  const isActive = activeTab === day;

  return (
    <TabsTrigger 
      key={day}
      value={day} 
      className={cn(
        "flex-1 min-w-[80px] relative rounded-lg transition-all duration-300",
        isActive 
          ? "bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md" 
          : "hover:bg-gray-100/70 dark:hover:bg-gray-800/40"
      )}
    >
      <div className="flex items-center gap-2">
        <DayTabIcon day={day} isActive={isActive} />
        <span className={cn(
          "transition-all duration-300",
          isActive ? "font-semibold text-primary" : "text-muted-foreground"
        )}>روز {dayNumber}</span>
      </div>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: selectedExercisesCount > 0 ? 1 : 0 }}
        className={cn(
          "absolute -top-2 -right-1 px-1.5 py-0.5 text-2xs rounded-full text-white font-medium",
          isActive 
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20" 
            : "bg-gray-400 dark:bg-gray-600"
        )}
      >
        {selectedExercisesCount}
      </motion.div>
    </TabsTrigger>
  );
};

export default DayTabTrigger;
