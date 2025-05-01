
import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import DayTabIcon from "./DayTabIcon";

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
      className="flex-1 min-w-[80px] relative rounded-lg transition-all duration-300"
    >
      <div className="flex items-center gap-1.5">
        <DayTabIcon day={day} isActive={isActive} />
        <span>روز {dayNumber}</span>
      </div>
      <div className={cn(
        "absolute -top-2 -right-1 px-1.5 py-0.5 text-2xs rounded-full bg-primary text-white font-medium transition-all scale-0",
        selectedExercisesCount > 0 && "scale-100"
      )}>
        {selectedExercisesCount}
      </div>
    </TabsTrigger>
  );
};

export default DayTabTrigger;
