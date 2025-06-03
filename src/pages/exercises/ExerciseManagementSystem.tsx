
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { ExerciseHeader } from "./components/ExerciseHeader";
import { ExerciseStats } from "./components/ExerciseStats";
import { ExerciseFilters } from "./components/ExerciseFilters";
import { ExerciseGrid } from "./components/ExerciseGrid";
import { CreateExerciseModal } from "./components/CreateExerciseModal";
import { useExerciseData } from "./hooks/useExerciseData";
import { useExerciseFilters } from "./hooks/useExerciseFilters";

export const ExerciseManagementSystem: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { exercises, categories, exerciseTypes, isLoading } = useExerciseData();
  const {
    filteredExercises,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy
  } = useExerciseFilters(exercises, categories, exerciseTypes);

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50"
    >
      <div className="w-full h-full flex flex-col p-4 md:p-6 lg:p-8" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <ExerciseHeader onCreateNew={() => setIsCreateModalOpen(true)} />
          
          <ExerciseStats 
            totalExercises={exercises.length}
            totalCategories={categories.length}
            totalTypes={exerciseTypes.length}
          />
          
          <ExerciseFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            categories={categories}
            exerciseTypes={exerciseTypes}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          
          <div className="flex-1">
            <ExerciseGrid
              exercises={filteredExercises}
              categories={categories}
              viewMode={viewMode}
              isLoading={isLoading}
            />
          </div>
        </motion.div>

        <CreateExerciseModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          categories={categories}
          exerciseTypes={exerciseTypes}
        />
      </div>
    </PageContainer>
  );
};
