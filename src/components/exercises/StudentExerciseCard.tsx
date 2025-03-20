
import React from "react";
import { ExerciseCard } from "./ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }}
    >
      <ExerciseCard
        exercise={exercise}
        category={category}
        isSelected={isSelected}
        viewMode={viewMode}
        onClick={onClick}
      />
    </motion.div>
  );
};
