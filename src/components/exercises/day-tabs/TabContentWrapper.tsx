
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayTabContent from "./DayTabContent";
import { Exercise } from "@/types/exercise";
import { ExerciseCategory } from "@/types/exercise";

interface TabContentWrapperProps {
  activeTab: string;
  filteredExercises: Exercise[];
  categories: ExerciseCategory[];
  viewMode: "grid" | "list";
  handleClearSearch: () => void;
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  toggleExerciseDay1: (id: number) => void;
  toggleExerciseDay2: (id: number) => void;
  toggleExerciseDay3: (id: number) => void;
  toggleExerciseDay4: (id: number) => void;
  exerciseSetsDay1: Record<number, number>;
  exerciseSetsDay2: Record<number, number>;
  exerciseSetsDay3: Record<number, number>;
  exerciseSetsDay4: Record<number, number>;
  handleSetsChangeDay1?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4?: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1: Record<number, string>;
  exerciseRepsDay2: Record<number, string>;
  exerciseRepsDay3: Record<number, string>;
  exerciseRepsDay4: Record<number, string>;
  handleRepsChangeDay1?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay2?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4?: (exerciseId: number, reps: string) => void;
}

export const TabContentWrapper: React.FC<TabContentWrapperProps> = ({
  activeTab,
  filteredExercises,
  categories,
  viewMode,
  handleClearSearch,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  toggleExerciseDay1,
  toggleExerciseDay2,
  toggleExerciseDay3,
  toggleExerciseDay4,
  exerciseSetsDay1,
  exerciseSetsDay2,
  exerciseSetsDay3,
  exerciseSetsDay4,
  handleSetsChangeDay1,
  handleSetsChangeDay2,
  handleSetsChangeDay3,
  handleSetsChangeDay4,
  exerciseRepsDay1,
  exerciseRepsDay2,
  exerciseRepsDay3,
  exerciseRepsDay4,
  handleRepsChangeDay1,
  handleRepsChangeDay2,
  handleRepsChangeDay3,
  handleRepsChangeDay4
}) => {
  // Tab content variants for animation
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        className="flex-1 overflow-auto"
        variants={tabContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <DayTabContent
          day="day1"
          filteredExercises={filteredExercises}
          viewMode={viewMode}
          selectedExercises={selectedExercisesDay1}
          toggleExercise={toggleExerciseDay1}
          categories={categories}
          handleClearSearch={handleClearSearch}
          exerciseSets={exerciseSetsDay1}
          onSetsChange={handleSetsChangeDay1}
          repsInfo={exerciseRepsDay1}
          onRepsChange={handleRepsChangeDay1}
        />
        
        <DayTabContent
          day="day2"
          filteredExercises={filteredExercises}
          viewMode={viewMode}
          selectedExercises={selectedExercisesDay2}
          toggleExercise={toggleExerciseDay2}
          categories={categories}
          handleClearSearch={handleClearSearch}
          exerciseSets={exerciseSetsDay2}
          onSetsChange={handleSetsChangeDay2}
          repsInfo={exerciseRepsDay2}
          onRepsChange={handleRepsChangeDay2}
        />
        
        <DayTabContent
          day="day3"
          filteredExercises={filteredExercises}
          viewMode={viewMode}
          selectedExercises={selectedExercisesDay3}
          toggleExercise={toggleExerciseDay3}
          categories={categories}
          handleClearSearch={handleClearSearch}
          exerciseSets={exerciseSetsDay3}
          onSetsChange={handleSetsChangeDay3}
          repsInfo={exerciseRepsDay3}
          onRepsChange={handleRepsChangeDay3}
        />
        
        <DayTabContent
          day="day4"
          filteredExercises={filteredExercises}
          viewMode={viewMode}
          selectedExercises={selectedExercisesDay4}
          toggleExercise={toggleExerciseDay4}
          categories={categories}
          handleClearSearch={handleClearSearch}
          exerciseSets={exerciseSetsDay4}
          onSetsChange={handleSetsChangeDay4}
          repsInfo={exerciseRepsDay4}
          onRepsChange={handleRepsChangeDay4}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default TabContentWrapper;
