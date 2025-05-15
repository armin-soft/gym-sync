
import React from "react";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseTable } from "./ExerciseTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Exercise } from "@/types/exercise";
import { cn } from "@/lib/utils";

interface ExerciseTabContentProps {
  exercises: Exercise[];
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  exerciseSets: Record<number, number>;
  handleSetsChange: (id: number, sets: number) => void;
  exerciseReps: Record<number, string>;
  handleRepsChange: (id: number, reps: string) => void;
  viewMode: "grid" | "list";
  temporaryExercise: Exercise | null;
}

export const ExerciseTabContent: React.FC<ExerciseTabContentProps> = ({
  exercises,
  selectedExercises,
  toggleExercise,
  exerciseSets,
  handleSetsChange,
  exerciseReps,
  handleRepsChange,
  viewMode,
  temporaryExercise
}) => {
  // Combine regular exercises with any temporary exercises
  const combinedExercises = React.useMemo(() => {
    if (temporaryExercise && !exercises.some(e => e.id === temporaryExercise.id)) {
      return [...exercises, temporaryExercise];
    }
    return exercises;
  }, [exercises, temporaryExercise]);
  
  // Filter to show only selected exercises
  const displayedExercises = combinedExercises.filter(
    exercise => selectedExercises.includes(exercise.id)
  );
  
  // Check if we have any exercises to display
  const hasExercises = displayedExercises.length > 0;
  
  return (
    <ScrollArea className="h-full">
      <div className={cn(
        "p-4", 
        viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" : ""
      )}>
        {hasExercises ? (
          viewMode === "grid" ? (
            displayedExercises.map(exercise => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isSelected={selectedExercises.includes(exercise.id)}
                onToggle={() => toggleExercise(exercise.id)}
                sets={exerciseSets[exercise.id] || 0}
                onSetsChange={(sets) => handleSetsChange(exercise.id, sets)}
                reps={exerciseReps[exercise.id] || ""}
                onRepsChange={(reps) => handleRepsChange(exercise.id, reps)}
                isTemporary={temporaryExercise?.id === exercise.id}
              />
            ))
          ) : (
            <ExerciseTable
              exercises={displayedExercises}
              selectedExercises={selectedExercises}
              onToggleExercise={toggleExercise}
              exerciseSets={exerciseSets}
              onSetsChange={handleSetsChange}
              exerciseReps={exerciseReps}
              onRepsChange={handleRepsChange}
              temporaryExerciseId={temporaryExercise?.id}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center p-4">
            <p className="text-muted-foreground">هیچ تمرینی برای این روز انتخاب نشده است.</p>
            <p className="text-sm text-muted-foreground mt-2">تمرین‌های مورد نظر خود را از لیست انتخاب کنید یا با گفتار اضافه کنید.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
