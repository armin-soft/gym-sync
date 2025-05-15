
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ExerciseTabContent } from "../ExerciseTabContent";
import { Exercise } from "@/types/exercise";
import { ExerciseCategory } from "@/types/exercise";

interface DayTabContentProps {
  day: string;
  dayNumber: number;
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
  dayNumber,
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
      <ExerciseTabContent
        exercises={filteredExercises}
        selectedExercises={selectedExercises}
        toggleExercise={toggleExercise}
        exerciseSets={exerciseSets}
        handleSetsChange={onSetsChange || (() => {})}
        exerciseReps={repsInfo}
        handleRepsChange={onRepsChange || (() => {})}
        viewMode={viewMode}
        categories={categories}
        filteredExercises={filteredExercises}
      />
    </TabsContent>
  );
};

export default DayTabContent;
