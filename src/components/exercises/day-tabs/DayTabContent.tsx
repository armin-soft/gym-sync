
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ExerciseTabContent } from "../ExerciseTabContent";
import { Exercise } from "@/types/exercise";
import { ExerciseCategory } from "@/types/exercise";
import { motion } from "framer-motion";

interface DayTabContentProps {
  day: string;
  filteredExercises: Exercise[];
  viewMode: "grid" | "list";
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  categories: ExerciseCategory[];
  handleClearSearch: () => void;
  exerciseSets?: Record<number, number>;
  onSetsChange?: (exerciseId: number, sets: number) => void;
  repsInfo?: Record<number, string>;
  onRepsChange?: (exerciseId: number, reps: string) => void;
}

export const DayTabContent: React.FC<DayTabContentProps> = ({
  day,
  filteredExercises,
  viewMode,
  selectedExercises,
  toggleExercise,
  categories,
  handleClearSearch,
  exerciseSets = {},
  onSetsChange,
  repsInfo = {},
  onRepsChange
}) => {
  return (
    <TabsContent
      value={day}
      className="flex-1 overflow-auto mt-0 p-0 border-none data-[state=active]:h-full"
    >
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <ExerciseTabContent
          filteredExercises={filteredExercises}
          viewMode={viewMode}
          selectedExercises={selectedExercises}
          toggleExercise={toggleExercise}
          categories={categories}
          handleClearSearch={handleClearSearch}
          exerciseSets={exerciseSets}
          onSetsChange={onSetsChange}
          repsInfo={repsInfo}
          onRepsChange={onRepsChange}
        />
      </motion.div>
    </TabsContent>
  );
};

export default DayTabContent;
