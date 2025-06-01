
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExerciseSearchFilters } from "../search-filters";
import ExerciseDayTabs from "../ExerciseDayTabs";

interface ExerciseDialogContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: any[];
  categories: any[];
  filteredCategories: any[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: any[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  selectedExercisesDay5: number[];
  selectedExercisesDay6: number[];
  toggleExerciseDay1: (id: number) => void;
  toggleExerciseDay2: (id: number) => void;
  toggleExerciseDay3: (id: number) => void;
  toggleExerciseDay4: (id: number) => void;
  toggleExerciseDay5: (id: number) => void;
  toggleExerciseDay6: (id: number) => void;
  exerciseSetsDay1: Record<number, number>;
  exerciseSetsDay2: Record<number, number>;
  exerciseSetsDay3: Record<number, number>;
  exerciseSetsDay4: Record<number, number>;
  exerciseSetsDay5: Record<number, number>;
  exerciseSetsDay6: Record<number, number>;
  handleSetsChangeDay1: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay5: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay6: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1: Record<number, string>;
  exerciseRepsDay2: Record<number, string>;
  exerciseRepsDay3: Record<number, string>;
  exerciseRepsDay4: Record<number, string>;
  exerciseRepsDay5: Record<number, string>;
  exerciseRepsDay6: Record<number, string>;
  handleRepsChangeDay1: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay2: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay5: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay6: (exerciseId: number, reps: string) => void;
  handleSaveExercises: (exercisesWithSets: any[], dayNumber?: number) => boolean;
}

const ExerciseDialogContent: React.FC<ExerciseDialogContentProps> = ({
  searchQuery,
  setSearchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  categories,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
  viewMode,
  setViewMode,
  filteredExercises,
  activeTab,
  setActiveTab,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  selectedExercisesDay5,
  selectedExercisesDay6,
  toggleExerciseDay1,
  toggleExerciseDay2,
  toggleExerciseDay3,
  toggleExerciseDay4,
  toggleExerciseDay5,
  toggleExerciseDay6,
  exerciseSetsDay1,
  exerciseSetsDay2,
  exerciseSetsDay3,
  exerciseSetsDay4,
  exerciseSetsDay5,
  exerciseSetsDay6,
  handleSetsChangeDay1,
  handleSetsChangeDay2,
  handleSetsChangeDay3,
  handleSetsChangeDay4,
  handleSetsChangeDay5,
  handleSetsChangeDay6,
  exerciseRepsDay1,
  exerciseRepsDay2,
  exerciseRepsDay3,
  exerciseRepsDay4,
  exerciseRepsDay5,
  exerciseRepsDay6,
  handleRepsChangeDay1,
  handleRepsChangeDay2,
  handleRepsChangeDay3,
  handleRepsChangeDay4,
  handleRepsChangeDay5,
  handleRepsChangeDay6,
  handleSaveExercises
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0.5, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.5, y: 10 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <ExerciseSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedExerciseType={selectedExerciseType}
          setSelectedExerciseType={setSelectedExerciseType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          exerciseTypes={exerciseTypes}
          categories={categories}
          filteredCategories={filteredCategories}
          filteredExercises={filteredExercises}
          onClearSearch={handleClearSearch}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <ExerciseDayTabs
          filteredExercises={filteredExercises}
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedExercisesDay1={selectedExercisesDay1}
          selectedExercisesDay2={selectedExercisesDay2}
          selectedExercisesDay3={selectedExercisesDay3}
          selectedExercisesDay4={selectedExercisesDay4}
          selectedExercisesDay5={selectedExercisesDay5}
          selectedExercisesDay6={selectedExercisesDay6}
          toggleExerciseDay1={toggleExerciseDay1}
          toggleExerciseDay2={toggleExerciseDay2}
          toggleExerciseDay3={toggleExerciseDay3}
          toggleExerciseDay4={toggleExerciseDay4}
          toggleExerciseDay5={toggleExerciseDay5}
          toggleExerciseDay6={toggleExerciseDay6}
          exerciseSetsDay1={exerciseSetsDay1}
          exerciseSetsDay2={exerciseSetsDay2}
          exerciseSetsDay3={exerciseSetsDay3}
          exerciseSetsDay4={exerciseSetsDay4}
          exerciseSetsDay5={exerciseSetsDay5}
          exerciseSetsDay6={exerciseSetsDay6}
          handleSetsChangeDay1={handleSetsChangeDay1}
          handleSetsChangeDay2={handleSetsChangeDay2}
          handleSetsChangeDay3={handleSetsChangeDay3}
          handleSetsChangeDay4={handleSetsChangeDay4}
          handleSetsChangeDay5={handleSetsChangeDay5}
          handleSetsChangeDay6={handleSetsChangeDay6}
          exerciseRepsDay1={exerciseRepsDay1}
          exerciseRepsDay2={exerciseRepsDay2}
          exerciseRepsDay3={exerciseRepsDay3}
          exerciseRepsDay4={exerciseRepsDay4}
          exerciseRepsDay5={exerciseRepsDay5}
          exerciseRepsDay6={exerciseRepsDay6}
          handleRepsChangeDay1={handleRepsChangeDay1}
          handleRepsChangeDay2={handleRepsChangeDay2}
          handleRepsChangeDay3={handleRepsChangeDay3}
          handleRepsChangeDay4={handleRepsChangeDay4}
          handleRepsChangeDay5={handleRepsChangeDay5}
          handleRepsChangeDay6={handleRepsChangeDay6}
          handleSaveExercises={handleSaveExercises}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ExerciseDialogContent;
