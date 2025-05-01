
import React from "react";
import { TabsList } from "@/components/ui/tabs";
import DayTabTrigger from "./DayTabTrigger";
import ExerciseViewControls from "../ExerciseViewControls";
import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <TabsList className="flex bg-muted/30 dark:bg-muted/10 p-1 rounded-xl shadow-sm backdrop-blur-sm border border-gray-200/40 dark:border-gray-800/40">
          {dayTabs.map((day) => (
            <DayTabTrigger
              key={day}
              day={day}
              activeTab={activeTab}
              selectedExercisesCount={getSelectedExercisesCount(day)}
            />
          ))}
        </TabsList>
      </motion.div>
      
      <motion.div variants={item}>
        <ExerciseViewControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
      </motion.div>
    </motion.div>
  );
};

export default TabHeader;
