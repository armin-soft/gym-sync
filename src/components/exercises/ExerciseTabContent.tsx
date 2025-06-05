
import React from "react";
import { Exercise } from "@/types/exercise";
import { ExerciseCategory } from "@/types/exercise";
import { StudentExerciseCard } from "./StudentExerciseCard";
import { Check, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ExerciseTabContentProps {
  filteredExercises: Exercise[];
  viewMode: "grid" | "list";
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  categories: ExerciseCategory[];
  handleClearSearch: () => void;
  exerciseSets?: Record<number, number>;
  onSetsChange?: (exerciseId: number, sets: number) => void;
  repsInfo?: Record<number, string>;  
  onRepsChange?: (exerciseId: number, reps: string) => void;  
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
  repsInfo = {},  
  onRepsChange
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  if (filteredExercises.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center h-64 gap-3 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center">
          <SearchX className="h-10 w-10 text-muted-foreground/40" />
        </div>
        <h3 className="text-lg font-medium text-center mt-2">هیچ تمرینی پیدا نشد</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          تمرینی با این فیلترها پیدا نشد. لطفا فیلترها را تغییر دهید یا جستجوی جدیدی انجام دهید.
        </p>
        <Button
          onClick={handleClearSearch}
          variant="outline"
          className="mt-3 bg-background/50 border-dashed"
          size="sm"
        >
          پاک کردن جستجو
        </Button>
      </motion.div>
    );
  }

  const selectedCount = selectedExercises.length;

  return (
    <>
      {selectedCount > 0 && (
        <motion.div 
          className="mb-4 py-2 px-3 bg-primary/5 border border-primary/10 rounded-lg flex items-center justify-between"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-full p-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">
              {selectedCount} تمرین انتخاب شده
            </span>
          </div>
        </motion.div>
      )}
      
      <motion.div
        className={cn(
          "grid gap-4 pb-6",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            : "grid-cols-1"
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredExercises.map((exercise) => {
          const category = categories.find((c) => c.id === exercise.categoryId);
          const isSelected = selectedExercises.includes(exercise.id);
          const sets = exerciseSets[exercise.id] || 3;
          const reps = repsInfo[exercise.id] || '12-15';  

          return (
            <motion.div
              key={exercise.id}
              variants={itemVariants}
              className={cn(
                "group transition-all duration-300",
                isSelected ? "scale-[1.02]" : "hover:scale-[1.01]"
              )}
            >
              <StudentExerciseCard
                exercise={exercise}
                category={category}
                isSelected={isSelected}
                viewMode={viewMode}
                onClick={() => toggleExercise(exercise.id)}
                sets={sets}
                onSetsChange={onSetsChange}
                reps={reps}
                onRepsChange={onRepsChange}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};
