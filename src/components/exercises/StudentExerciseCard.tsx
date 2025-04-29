
import React from "react";
import { ExerciseCard } from "./ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { ExerciseSetsInput } from "./ExerciseSetsInput";

interface StudentExerciseCardProps {
  exercise: Exercise;
  category: ExerciseCategory | undefined;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onClick: () => void;
  sets: number;
  onSetsChange?: (exerciseId: number, sets: number) => void;
}

export const StudentExerciseCard: React.FC<StudentExerciseCardProps> = ({
  exercise,
  category,
  isSelected,
  viewMode,
  onClick,
  sets = 3,
  onSetsChange
}) => {
  return (
    <div className="flex flex-col gap-2">
      <ExerciseCard
        exercise={exercise}
        category={category}
        isSelected={isSelected}
        viewMode={viewMode}
        onClick={onClick}
      />
      
      {isSelected && onSetsChange && (
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">تعداد ست:</span>
          <ExerciseSetsInput
            exerciseId={exercise.id}
            sets={sets}
            onSetsChange={onSetsChange}
            className="w-24"
          />
        </div>
      )}
    </div>
  );
};
