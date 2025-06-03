
import { ExerciseStatsCards } from "@/components/exercises/ExerciseStatsCards";

interface ExerciseStatsSectionProps {
  exerciseTypesCount: number;
  categoriesCount: number;
  exercisesCount: number;
}

export const ExerciseStatsSection = ({ 
  exerciseTypesCount, 
  categoriesCount, 
  exercisesCount 
}: ExerciseStatsSectionProps) => {
  return (
    <ExerciseStatsCards 
      exerciseTypesCount={exerciseTypesCount}
      categoriesCount={categoriesCount}
      exercisesCount={exercisesCount}
    />
  );
};
