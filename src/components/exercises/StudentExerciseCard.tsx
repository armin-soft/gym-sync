
import React from "react";
import { ExerciseCard } from "./ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";

interface StudentExerciseCardProps {
  exercise: Exercise;
  category: ExerciseCategory | undefined;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export const StudentExerciseCard: React.FC<StudentExerciseCardProps> = ({
  exercise,
  category,
  isSelected,
  viewMode,
  onClick
}) => {
  return (
    <ExerciseCard
      exercise={exercise}
      category={category}
      isSelected={isSelected}
      viewMode={viewMode}
      onClick={onClick}
    />
  );
};
