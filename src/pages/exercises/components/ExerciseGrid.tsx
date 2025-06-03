
import React from "react";
import { motion } from "framer-motion";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseListItem } from "./ExerciseListItem";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "./EmptyState";

interface ExerciseGridProps {
  exercises: any[];
  categories: any[];
  viewMode: "grid" | "list";
  isLoading: boolean;
}

export const ExerciseGrid: React.FC<ExerciseGridProps> = ({
  exercises,
  categories,
  viewMode,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="بارگذاری تمرینات..." />
      </div>
    );
  }

  if (exercises.length === 0) {
    return <EmptyState />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (viewMode === "list") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {exercises.map((exercise) => (
          <motion.div key={exercise.id} variants={itemVariants}>
            <ExerciseListItem exercise={exercise} categories={categories} />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {exercises.map((exercise) => (
        <motion.div key={exercise.id} variants={itemVariants}>
          <ExerciseCard exercise={exercise} categories={categories} />
        </motion.div>
      ))}
    </motion.div>
  );
};
