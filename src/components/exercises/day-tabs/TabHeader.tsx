
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

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for children
  const childVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-4 mb-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="relative z-10 mx-auto w-full max-w-xl"
        variants={childVariants}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 blur-md z-0"></div>
        <TabsList className="relative flex justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg p-2 rounded-xl border border-white/10 dark:border-slate-700/30 shadow-lg shadow-primary/5 z-10 w-full">
          {dayTabs.map((day, index) => (
            <motion.div 
              key={day} 
              className="flex-1 text-center max-w-[120px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <DayTabTrigger
                day={day}
                activeTab={activeTab}
                selectedExercisesCount={getSelectedExercisesCount(day)}
              />
            </motion.div>
          ))}
        </TabsList>
      </motion.div>
      
      <motion.div
        variants={childVariants}
        className="flex justify-center md:justify-end"
      >
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
