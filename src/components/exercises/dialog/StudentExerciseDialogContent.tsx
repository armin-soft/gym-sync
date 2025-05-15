
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExerciseSearchFilters } from "../search-filters";
import { cn } from "@/lib/utils";
import ExerciseDayTabs from "../ExerciseDayTabs";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentExerciseDialogContentProps {
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  categories: ExerciseCategory[];
  filteredCategories: ExerciseCategory[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: Exercise[];
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
  exerciseSetsDay1: Record<number, number>;
  exerciseSetsDay2: Record<number, number>;
  exerciseSetsDay3: Record<number, number>;
  exerciseSetsDay4: Record<number, number>;
  handleSetsChangeDay1: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1: Record<number, string>;
  exerciseRepsDay2: Record<number, string>;
  exerciseRepsDay3: Record<number, string>;
  exerciseRepsDay4: Record<number, string>;
  handleRepsChangeDay1: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay2: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4: (exerciseId: number, reps: string) => void;
  handleSaveExercises: (exercisesWithSets: any[], dayNumber?: number) => boolean;
}

const StudentExerciseDialogContent: React.FC<StudentExerciseDialogContentProps> = ({
  isLoading,
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
  toggleExerciseDay1,
  toggleExerciseDay2,
  toggleExerciseDay3,
  toggleExerciseDay4,
  exerciseSetsDay1,
  exerciseSetsDay2,
  exerciseSetsDay3,
  exerciseSetsDay4,
  handleSetsChangeDay1,
  handleSetsChangeDay2,
  handleSetsChangeDay3,
  handleSetsChangeDay4,
  exerciseRepsDay1,
  exerciseRepsDay2,
  exerciseRepsDay3,
  exerciseRepsDay4,
  handleRepsChangeDay1,
  handleRepsChangeDay2,
  handleRepsChangeDay3,
  handleRepsChangeDay4,
  handleSaveExercises
}) => {
  const deviceInfo = useDeviceInfo();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className={cn(
        "sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm",
        deviceInfo.isMobile ? "px-3 py-2" : "px-4 py-3"
      )}>
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
          handleClearSearch={handleClearSearch}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
      </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} className="h-full">
          <ExerciseDayTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedExercisesDay1={selectedExercisesDay1}
            selectedExercisesDay2={selectedExercisesDay2}
            selectedExercisesDay3={selectedExercisesDay3}
            selectedExercisesDay4={selectedExercisesDay4}
            toggleExerciseDay1={toggleExerciseDay1}
            toggleExerciseDay2={toggleExerciseDay2}
            toggleExerciseDay3={toggleExerciseDay3}
            toggleExerciseDay4={toggleExerciseDay4}
            viewMode={viewMode}
            setViewMode={setViewMode}
            filteredExercises={filteredExercises}
            categories={categories}
            handleClearSearch={handleClearSearch}
            selectedCategoryId={selectedCategoryId}
            toggleSortOrder={toggleSortOrder}
            sortOrder={sortOrder}
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
            handleSaveExercises={handleSaveExercises}
          />
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default StudentExerciseDialogContent;
