
import React from "react";
import { ExerciseCard } from "./ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { ExerciseSetsInput } from "./ExerciseSetsInput";
import { ExerciseRepsInput } from "./ExerciseRepsInput";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Dumbbell, BarChart } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
  reps = '8',
  onRepsChange
}) => {
  return (
    <motion.div 
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex flex-col transition-all duration-300 overflow-hidden",
        isSelected 
          ? "ring-2 ring-indigo-500 dark:ring-indigo-400 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
          : "hover:shadow-md"
      )}
    >
      <ExerciseCard
        exercise={exercise}
        category={category}
        isSelected={isSelected}
        viewMode={viewMode}
        onClick={onClick}
      />
      
      {isSelected && (
        <motion.div 
          className="flex flex-col gap-3 px-4 py-3 bg-gradient-to-b from-white to-indigo-50/20 dark:from-gray-900 dark:to-indigo-900/5 border-t border-indigo-100 dark:border-indigo-900/30 rounded-b-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs font-medium text-indigo-700 dark:text-indigo-400 mb-2">
            جزئیات تمرین
          </div>
          
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                <Dumbbell className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                تعداد ست:
              </span>
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
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                  <BarChart className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  تکرار هر ست:
                </span>
              </div>
              <ExerciseRepsInput
                exerciseId={exercise.id}
                reps={reps}
                onRepsChange={onRepsChange}
                className="w-28"
              />
            </div>
          )}
          
          <motion.div 
            className="mt-1 pt-2 border-t border-indigo-100/50 dark:border-indigo-900/20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-[10px] text-indigo-600/70 dark:text-indigo-400/70">
              {toPersianNumbers(sets)} ست × {reps} تکرار
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
