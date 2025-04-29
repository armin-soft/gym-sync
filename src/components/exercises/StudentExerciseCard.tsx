
import React from "react";
import { ExerciseCard } from "./ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { ExerciseSetsInput } from "./ExerciseSetsInput";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Dumbbell, BarChart } from "lucide-react";

interface StudentExerciseCardProps {
  exercise: Exercise;
  category: ExerciseCategory | undefined;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onClick: () => void;
  sets: number;
  onSetsChange?: (exerciseId: number, sets: number) => void;
  reps?: string;  
  onRepsChange?: (exerciseId: number, reps: string) => void;  
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
    <div className={cn(
      "flex flex-col transition-all duration-300",
      isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:shadow-md"
    )}>
      <ExerciseCard
        exercise={exercise}
        category={category}
        isSelected={isSelected}
        viewMode={viewMode}
        onClick={onClick}
      />
      
      {isSelected && (
        <motion.div 
          className="flex flex-col gap-3 px-4 py-3 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-100 dark:border-gray-800 rounded-b-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-xs text-muted-foreground mb-2 font-medium">
            جزئیات تمرین
          </div>
          
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <div className="p-1 bg-primary/10 rounded-full">
                <Dumbbell className="h-3.5 w-3.5 text-primary" />
              </div>
              <Label htmlFor={`sets-${exercise.id}`} className="text-xs font-medium text-gray-700 dark:text-gray-300">
                تعداد ست:
              </Label>
            </div>
            {onSetsChange && (
              <ExerciseSetsInput
                exerciseId={exercise.id}
                sets={sets}
                onSetsChange={onSetsChange}
                className="w-28"
              />
            )}
          </div>
          
          {onRepsChange && (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <div className="p-1 bg-primary/10 rounded-full">
                  <BarChart className="h-3.5 w-3.5 text-primary" />
                </div>
                <Label htmlFor={`reps-${exercise.id}`} className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  تکرار هر ست:
                </Label>
              </div>
              <Input
                id={`reps-${exercise.id}`}
                value={reps}
                onChange={(e) => onRepsChange(exercise.id, e.target.value)}
                className="w-28 h-8 text-sm"
                placeholder="12-15"
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
