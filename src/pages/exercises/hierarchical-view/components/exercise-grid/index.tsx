
import React from "react";
import { Exercise } from "@/types/exercise";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

interface ExerciseGridProps {
  exercises: Exercise[];
  onSelect: (exerciseId: string) => void;
  initialSelection?: string[];
  maxSelection?: number;
}

export const ExerciseGrid: React.FC<ExerciseGridProps> = ({
  exercises,
  onSelect,
  initialSelection = [],
  maxSelection = 5
}) => {
  const { categories } = useExerciseData();
  
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
  
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {exercises.map((exercise) => {
        const category = categories.find(cat => cat.id === exercise.categoryId);
        const isSelected = initialSelection.includes(exercise.id.toString());
        
        return (
          <motion.div 
            key={exercise.id} 
            variants={itemVariants}
            className={cn(
              "cursor-pointer transition-all duration-300",
              isSelected ? "scale-[1.02]" : "hover:scale-[1.01]"
            )}
            onClick={() => onSelect(exercise.id.toString())}
          >
            <ExerciseCard
              exercise={exercise}
              category={category}
              isSelected={isSelected}
              viewMode="grid"
              onClick={() => onSelect(exercise.id.toString())}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
