
import React from "react";
import { Exercise } from "@/types/exercise";
import { ExerciseCategory } from "@/types/exercise";
import { StudentExerciseCard } from "./StudentExerciseCard";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseTabContentProps {
  filteredExercises: Exercise[];
  viewMode: "grid" | "list";
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  categories: ExerciseCategory[];
  handleClearSearch: () => void;
  exerciseSets?: Record<number, number>;
  onSetsChange?: (exerciseId: number, sets: number) => void;
  repsInfo?: Record<number, string>;  // New prop to store reps information
  onRepsChange?: (exerciseId: number, reps: string) => void;  // New handler for reps changes
}

export const ExerciseTabContent: React.FC<ExerciseTabContentProps> = ({
  filteredExercises,
  viewMode,
  selectedExercises,
  toggleExercise,
  categories,
  handleClearSearch,
  exerciseSets = {},
  onSetsChange,
  repsInfo = {},  // Default to empty object
  onRepsChange
}) => {
  if (filteredExercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2.5 mt-4">
        <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center">
          <Check className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-medium text-center">هیچ تمرینی پیدا نشد</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          تمرینی با این فیلترها پیدا نشد. لطفا فیلترها را تغییر دهید یا جستجوی جدیدی انجام دهید.
        </p>
        <button
          onClick={handleClearSearch}
          className="mt-2 text-primary text-sm font-medium hover:underline"
        >
          پاک کردن جستجو
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-3 pb-6",
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          : "grid-cols-1"
      )}
    >
      {filteredExercises.map((exercise) => {
        const category = categories.find((c) => c.id === exercise.categoryId);
        const isSelected = selectedExercises.includes(exercise.id);
        const sets = exerciseSets[exercise.id] || 3;
        const reps = repsInfo[exercise.id] || '';  // Get reps info or empty string as default

        return (
          <StudentExerciseCard
            key={exercise.id}
            exercise={exercise}
            category={category}
            isSelected={isSelected}
            viewMode={viewMode}
            onClick={() => toggleExercise(exercise.id)}
            sets={sets}
            onSetsChange={onSetsChange}
            reps={reps}  // Pass reps info
            onRepsChange={onRepsChange}  // Pass reps change handler
          />
        );
      })}
    </div>
  );
};
