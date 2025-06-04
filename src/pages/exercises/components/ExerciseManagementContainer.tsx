
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { ExerciseHeader } from "./ExerciseHeader";
import { ExerciseStats } from "./ExerciseStats";
import { ExerciseContent } from "./ExerciseContent";
import { useExerciseData } from "../hooks/useExerciseData";
import { useDataRefresh } from "@/hooks/useDataRefresh";

export const ExerciseManagementContainer: React.FC = () => {
  const [activeView, setActiveView] = useState<"overview" | "types" | "categories" | "exercises">("overview");
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  const { exerciseTypes, categories, exercises, isLoading } = useExerciseData();

  // Auto-refresh data
  useDataRefresh({
    keys: ['exercises', 'exerciseCategories', 'exerciseTypes'],
    interval: 5000,
    onStorageChange: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50"
    >
      <motion.div 
        className="h-full flex flex-col p-4 md:p-6 lg:p-8 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <ExerciseHeader 
            activeView={activeView}
            onViewChange={setActiveView}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ExerciseStats 
            typesCount={exerciseTypes.length}
            categoriesCount={categories.length}
            exercisesCount={exercises.length}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex-1 min-h-0">
          <ExerciseContent
            activeView={activeView}
            onViewChange={setActiveView}
            selectedTypeId={selectedTypeId}
            selectedCategoryId={selectedCategoryId}
            onTypeSelect={setSelectedTypeId}
            onCategorySelect={setSelectedCategoryId}
            exerciseTypes={exerciseTypes}
            categories={categories}
            exercises={exercises}
            isLoading={isLoading}
          />
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};
