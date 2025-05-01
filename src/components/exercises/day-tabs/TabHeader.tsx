
import React from "react";
import { TabsList } from "@/components/ui/tabs";
import DayTabTrigger from "./DayTabTrigger";
import ExerciseViewControls from "../ExerciseViewControls";

interface TabHeaderProps {
  activeTab: string;
  dayTabs: string[];
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

export const TabHeader: React.FC<TabHeaderProps> = ({
  activeTab,
  dayTabs,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  viewMode,
  setViewMode,
  toggleSortOrder,
  sortOrder
}) => {
  // Helper function to get selected exercises count for a day
  const getSelectedExercisesCount = (day: string): number => {
    switch (day) {
      case "day1": return selectedExercisesDay1.length;
      case "day2": return selectedExercisesDay2.length;
      case "day3": return selectedExercisesDay3.length;
      case "day4": return selectedExercisesDay4.length;
      default: return 0;
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
      <TabsList className="flex bg-muted/60 p-1 rounded-xl">
        {dayTabs.map((day) => (
          <DayTabTrigger
            key={day}
            day={day}
            activeTab={activeTab}
            selectedExercisesCount={getSelectedExercisesCount(day)}
          />
        ))}
      </TabsList>
      
      <ExerciseViewControls
        viewMode={viewMode}
        setViewMode={setViewMode}
        toggleSortOrder={toggleSortOrder}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default TabHeader;
