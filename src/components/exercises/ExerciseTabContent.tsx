
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Exercise } from "@/types/exercise";
import { StudentExerciseCard } from "./StudentExerciseCard";
import StudentExerciseListWrapper from "./StudentExerciseListWrapper";
import { ArrowLeftIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExerciseTabContentProps {
  filteredExercises: Exercise[];
  viewMode: "grid" | "list";
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  categories: any[];
  handleClearSearch: () => void;
  exerciseSets: Record<number, number>;
  onSetsChange?: (exerciseId: number, sets: number) => void;
}

export const ExerciseTabContent: React.FC<ExerciseTabContentProps> = ({
  filteredExercises,
  viewMode,
  selectedExercises,
  toggleExercise,
  categories,
  handleClearSearch,
  exerciseSets,
  onSetsChange
}) => {
  if (filteredExercises.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-10 px-4 text-center"
      >
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-4">
          <Info className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          حرکتی یافت نشد
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md">
          حرکت مورد نظر شما پیدا نشد. می‌توانید معیارهای جستجو را تغییر دهید یا
          حرکت جدیدی اضافه کنید.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearSearch}
          className="flex items-center gap-1"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>پاک کردن فیلترها</span>
        </Button>
      </motion.div>
    );
  }

  return (
    <StudentExerciseListWrapper viewMode={viewMode}>
      <AnimatePresence>
        {filteredExercises.map((exercise) => {
          const isSelected = selectedExercises.includes(exercise.id);
          const category = categories.find(
            (cat) => cat.id === exercise.categoryId
          );
          const sets = exerciseSets?.[exercise.id] || 3;

          return (
            <motion.div
              key={exercise.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex",
                viewMode === "list" ? "w-full" : "flex-col"
              )}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      <StudentExerciseCard
                        exercise={exercise}
                        category={category}
                        isSelected={isSelected}
                        viewMode={viewMode}
                        onClick={() => toggleExercise(exercise.id)}
                        sets={sets}
                        onSetsChange={onSetsChange}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center">
                    <p className="text-xs">{exercise.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </StudentExerciseListWrapper>
  );
};

export default ExerciseTabContent;
