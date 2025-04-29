
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { StudentExerciseCard } from "@/components/exercises/StudentExerciseCard";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface ExerciseTabContentProps {
  filteredExercises: Exercise[];
  viewMode: "grid" | "list";
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  categories: ExerciseCategory[];
  handleClearSearch: () => void;
  exerciseSets?: Record<number, number>;
  onSetsChange?: (exerciseId: number, sets: number) => void;
  displayMode?: "edit" | "view";
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
  displayMode = "edit"
}) => {
  const getCategoryForExercise = (exercise: Exercise) => {
    return categories.find(cat => cat.id === exercise.categoryId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  if (filteredExercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-500 dark:text-gray-400">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-lg font-medium mb-2">هیچ تمرینی پیدا نشد!</p>
          <p className="text-sm mb-4">لطفا جستجوی خود را تغییر دهید یا فیلترها را پاک کنید</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleClearSearch}
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            پاک کردن فیلترها
          </Button>
        </motion.div>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4"
      >
        <AnimatePresence>
          {filteredExercises.map(exercise => (
            <StudentExerciseCard
              key={exercise.id}
              exercise={exercise}
              category={getCategoryForExercise(exercise)}
              isSelected={selectedExercises.includes(exercise.id)}
              viewMode={viewMode}
              onClick={() => toggleExercise(exercise.id)}
              sets={exerciseSets[exercise.id] || 3}
              onSetsChange={onSetsChange}
              displayMode={displayMode}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2 pb-4"
    >
      <AnimatePresence>
        {filteredExercises.map(exercise => (
          <StudentExerciseCard
            key={exercise.id}
            exercise={exercise}
            category={getCategoryForExercise(exercise)}
            isSelected={selectedExercises.includes(exercise.id)}
            viewMode={viewMode}
            onClick={() => toggleExercise(exercise.id)}
            sets={exerciseSets[exercise.id] || 3}
            onSetsChange={onSetsChange}
            displayMode={displayMode}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
