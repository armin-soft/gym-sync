
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import TabHeader from "./day-tabs/TabHeader";
import TabContentWrapper from "./day-tabs/TabContentWrapper";
import { Exercise } from "@/types/exercise";

interface ExerciseDayTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  toggleExerciseDay1: (id: number) => void;
  toggleExerciseDay2: (id: number) => void;
  toggleExerciseDay3: (id: number) => void;
  toggleExerciseDay4: (id: number) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: Exercise[];
  categories: any[];
  handleClearSearch: () => void;
  handleSaveExercises: (exercisesWithSets: any[], dayNumber?: number) => boolean;
  selectedCategoryId: number | null;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  exerciseSetsDay1?: Record<number, number>;
  exerciseSetsDay2?: Record<number, number>;
  exerciseSetsDay3?: Record<number, number>;
  exerciseSetsDay4?: Record<number, number>;
  handleSetsChangeDay1?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4?: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1?: Record<number, string>;  
  exerciseRepsDay2?: Record<number, string>;
  exerciseRepsDay3?: Record<number, string>;
  exerciseRepsDay4?: Record<number, string>;
  handleRepsChangeDay1?: (exerciseId: number, reps: string) => void;  
  handleRepsChangeDay2?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4?: (exerciseId: number, reps: string) => void;
}

const ExerciseDayTabs: React.FC<ExerciseDayTabsProps> = ({
  activeTab,
  setActiveTab,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  toggleExerciseDay1,
  toggleExerciseDay2,
  toggleExerciseDay3,
  toggleExerciseDay4,
  viewMode,
  setViewMode,
  filteredExercises,
  categories,
  handleClearSearch,
  selectedCategoryId,
  toggleSortOrder,
  sortOrder,
  exerciseSetsDay1 = {},
  exerciseSetsDay2 = {},
  exerciseSetsDay3 = {},
  exerciseSetsDay4 = {},
  handleSetsChangeDay1,
  handleSetsChangeDay2,
  handleSetsChangeDay3,
  handleSetsChangeDay4,
  exerciseRepsDay1 = {},
  exerciseRepsDay2 = {},
  exerciseRepsDay3 = {},
  exerciseRepsDay4 = {},
  handleRepsChangeDay1,
  handleRepsChangeDay2,
  handleRepsChangeDay3,
  handleRepsChangeDay4
}) => {
  // Available day tabs
  const dayTabs = ["day1", "day2", "day3", "day4"];
  
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex-1 flex flex-col overflow-hidden px-4 pb-2"
    >
      <TabHeader 
        activeTab={activeTab}
        dayTabs={dayTabs}
        selectedExercisesDay1={selectedExercisesDay1}
        selectedExercisesDay2={selectedExercisesDay2}
        selectedExercisesDay3={selectedExercisesDay3}
        selectedExercisesDay4={selectedExercisesDay4}
        viewMode={viewMode}
        setViewMode={setViewMode}
        toggleSortOrder={toggleSortOrder}
        sortOrder={sortOrder}
      />
      
      <TabContentWrapper
        activeTab={activeTab}
        filteredExercises={filteredExercises}
        categories={categories}
        viewMode={viewMode}
        handleClearSearch={handleClearSearch}
        selectedExercisesDay1={selectedExercisesDay1}
        selectedExercisesDay2={selectedExercisesDay2}
        selectedExercisesDay3={selectedExercisesDay3}
        selectedExercisesDay4={selectedExercisesDay4}
        toggleExerciseDay1={toggleExerciseDay1}
        toggleExerciseDay2={toggleExerciseDay2}
        toggleExerciseDay3={toggleExerciseDay3}
        toggleExerciseDay4={toggleExerciseDay4}
        exerciseSetsDay1={exerciseSetsDay1}
        exerciseSetsDay2={exerciseSetsDay2}
        exerciseSetsDay3={exerciseSetsDay3}
        exerciseSetsDay4={exerciseSetsDay4}
        handleSetsChangeDay1={handleSetsChangeDay1}
        handleSetsChangeDay2={handleSetsChangeDay2}
        handleSetsChangeDay3={handleSetsChangeDay3}
        handleSetsChangeDay4={handleSetsChangeDay4}
        exerciseRepsDay1={exerciseRepsDay1}
        exerciseRepsDay2={exerciseRepsDay2}
        exerciseRepsDay3={exerciseRepsDay3}
        exerciseRepsDay4={exerciseRepsDay4}
        handleRepsChangeDay1={handleRepsChangeDay1}
        handleRepsChangeDay2={handleRepsChangeDay2}
        handleRepsChangeDay3={handleRepsChangeDay3}
        handleRepsChangeDay4={handleRepsChangeDay4}
      />
    </Tabs>
  );
};

export default ExerciseDayTabs;
