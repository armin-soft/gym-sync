
import React from "react";
import { motion } from "framer-motion";
import { Exercise } from "@/types/exercise";

export interface ExercisesListProps {
  viewMode?: "grid" | "list";
  onEdit?: (exercise: Exercise) => void;
  onDelete?: (exerciseId: number) => void;
}

const ExercisesList: React.FC<ExercisesListProps> = ({
  viewMode = "grid",
  onEdit,
  onDelete
}) => {
  // This is a placeholder component
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div className="p-4 text-center text-muted-foreground">
        No exercises to display
      </div>
    </motion.div>
  );
};

export default ExercisesList;
