
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { OverviewSection } from "./sections/OverviewSection";
import { TypesSection } from "./sections/TypesSection";
import { CategoriesSection } from "./sections/CategoriesSection";
import { ExercisesSection } from "./sections/ExercisesSection";
import { Exercise, ExerciseCategory } from "@/types/exercise";

interface ExerciseContentProps {
  activeView: "overview" | "types" | "categories" | "exercises";
  onViewChange: (view: "overview" | "types" | "categories" | "exercises") => void;
  selectedTypeId: string | null;
  selectedCategoryId: string | null;
  onTypeSelect: (typeId: string | null) => void;
  onCategorySelect: (categoryId: string | null) => void;
  exerciseTypes: string[];
  categories: ExerciseCategory[];
  exercises: Exercise[];
  isLoading: boolean;
}

export const ExerciseContent: React.FC<ExerciseContentProps> = ({
  activeView,
  onViewChange,
  selectedTypeId,
  selectedCategoryId,
  onTypeSelect,
  onCategorySelect,
  exerciseTypes,
  categories,
  exercises,
  isLoading
}) => {
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: 0.98,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Card className="h-full border-0 shadow-xl bg-white/80 backdrop-blur-lg overflow-hidden">
      <div className="h-full p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-full"
          >
            {activeView === "overview" && (
              <OverviewSection 
                exerciseTypes={exerciseTypes}
                categories={categories}
                exercises={exercises}
                onViewChange={onViewChange}
              />
            )}
            
            {activeView === "types" && (
              <TypesSection 
                exerciseTypes={exerciseTypes}
                selectedTypeId={selectedTypeId}
                onTypeSelect={onTypeSelect}
                onViewChange={onViewChange}
              />
            )}
            
            {activeView === "categories" && (
              <CategoriesSection 
                categories={categories}
                exerciseTypes={exerciseTypes}
                selectedTypeId={selectedTypeId}
                selectedCategoryId={selectedCategoryId}
                onCategorySelect={onCategorySelect}
                onViewChange={onViewChange}
              />
            )}
            
            {activeView === "exercises" && (
              <ExercisesSection 
                exercises={exercises}
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onViewChange={onViewChange}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
};
