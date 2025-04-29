
import React from "react";
import { ExerciseCard } from "./ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { ExerciseSetsInput } from "./ExerciseSetsInput";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";

interface StudentExerciseCardProps {
  exercise: Exercise;
  category: ExerciseCategory | undefined;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onClick: () => void;
  sets: number;
  onSetsChange?: (exerciseId: number, sets: number) => void;
  reps?: string;  // New prop for reps
  onRepsChange?: (exerciseId: number, reps: string) => void;  // Handler for reps changes
}

export const StudentExerciseCard: React.FC<StudentExerciseCardProps> = ({
  exercise,
  category,
  isSelected,
  viewMode,
  onClick,
  sets = 3,
  onSetsChange,
  reps = '',
  onRepsChange
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
      
      {isSelected && (
        <div className="flex flex-col gap-2 px-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`sets-${exercise.id}`} className="text-xs font-medium text-gray-500 dark:text-gray-400">
              تعداد ست:
            </Label>
            {onSetsChange && (
              <ExerciseSetsInput
                exerciseId={exercise.id}
                sets={sets}
                onSetsChange={onSetsChange}
                className="w-24"
              />
            )}
          </div>
          
          {onRepsChange && (
            <div className="flex items-center justify-between">
              <Label htmlFor={`reps-${exercise.id}`} className="text-xs font-medium text-gray-500 dark:text-gray-400">
                تکرار هر ست:
              </Label>
              <Input
                id={`reps-${exercise.id}`}
                value={reps}
                onChange={(e) => onRepsChange(exercise.id, e.target.value)}
                className="w-24 h-8 text-sm"
                placeholder="12-15"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
