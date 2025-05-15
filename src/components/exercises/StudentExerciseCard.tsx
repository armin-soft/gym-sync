
import React from "react";
import { ExerciseCard } from "./ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { ExerciseSetsInput } from "./ExerciseSetsInput";
import { ExerciseRepsInput } from "./ExerciseRepsInput";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, BarChart, Check } from "lucide-react";
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
    <div 
      className={cn(
        "relative overflow-hidden transition-all duration-300 group",
        isSelected 
          ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-950 shadow-lg" 
          : "hover:shadow-md",
        viewMode === "list" ? "flex items-stretch" : "flex flex-col"
      )}
    >
      <div 
        className={cn(
          "absolute right-2 top-2 z-10",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-70"
        )}
      >
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center transition-all",
          isSelected 
            ? "bg-primary text-white" 
            : "bg-white/70 dark:bg-gray-800/70 text-gray-400"
        )}>
          <Check size={14} />
        </div>
      </div>
      
      <div className={viewMode === "list" ? "flex-[0_0_auto] w-28 md:w-36" : ""}>
        <ExerciseCard
          exercise={exercise}
          category={category}
          isSelected={isSelected}
          viewMode={viewMode}
          onClick={onClick}
        />
      </div>
      
      {isSelected && (
        <AnimatePresence>
          <motion.div 
            className={cn(
              "bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950",
              "border-t border-gray-100 dark:border-gray-800",
              viewMode === "list" 
                ? "flex items-center gap-6 px-6 ml-4" 
                : "flex flex-col gap-3 px-4 py-3 rounded-b-lg"
            )}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {viewMode === "list" ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-primary/10 rounded-full">
                    <Dumbbell className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    تعداد ست:
                  </span>
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
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-primary/10 rounded-full">
                      <BarChart className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      تکرار هر ست:
                    </span>
                    <ExerciseRepsInput
                      exerciseId={exercise.id}
                      reps={reps}
                      onRepsChange={onRepsChange}
                      className="w-24"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-xs text-muted-foreground mb-1 font-medium">
                  جزئیات تمرین
                </div>
                
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 bg-primary/10 rounded-full">
                      <Dumbbell className="h-3.5 w-3.5 text-primary" />
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
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 bg-primary/10 rounded-full">
                        <BarChart className="h-3.5 w-3.5 text-primary" />
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
              </>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
