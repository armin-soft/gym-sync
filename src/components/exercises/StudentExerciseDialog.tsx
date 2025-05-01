import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useExerciseSelection } from "@/hooks/exercise-selection";
import ExerciseDialogFooter from "./ExerciseDialogFooter";
import ExerciseDialogHeader from "./ExerciseDialogHeader";
import ExerciseDialogLoading from "./dialog/ExerciseDialogLoading";
import ExerciseDialogContent from "./dialog/ExerciseDialogContent";
import { useExerciseDialogData } from "@/hooks/exercises/useExerciseDialogData";
import { useExerciseDialogState } from "@/hooks/exercises/useExerciseDialogState";
import { ExerciseWithSets } from "@/hooks/exercise-selection";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
}

const StudentExerciseDialog: React.FC<StudentExerciseDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
}) => {
  // Fetch exercises data
  const { exercises, categories, exerciseTypes, isLoading } = useExerciseDialogData();

  // Exercise selection state from hook
  const {
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
    getSelectedExercisesWithSetsDay1,
    getSelectedExercisesWithSetsDay2,
    getSelectedExercisesWithSetsDay3,
    getSelectedExercisesWithSetsDay4
  } = useExerciseSelection(
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4
  );

  // Dialog state management
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedExerciseType,
    setSelectedExerciseType,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredExercises,
    filteredCategories,
    handleClearSearch,
    handleSaveDay
  } = useExerciseDialogState({
    open,
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4,
    categories,
    exercises
  });

  const getActiveTabSelectedExercises = () => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      default: return [];
    }
  };

  const getActiveTabSelectedExercisesWithSets = () => {
    switch(activeTab) {
      case "day1": return getSelectedExercisesWithSetsDay1();
      case "day2": return getSelectedExercisesWithSetsDay2();
      case "day3": return getSelectedExercisesWithSetsDay3();
      case "day4": return getSelectedExercisesWithSetsDay4();
      default: return [];
    }
  };

  const handleSave = () => {
    const selectedExercisesWithSets = getActiveTabSelectedExercisesWithSets();
    const dayNumber = parseInt(activeTab.replace("day", ""));
    
    const success = handleSaveDay(selectedExercisesWithSets, onSave, dayNumber);
    if (success) {
      // If this was the last day and all days are saved, close the dialog
      if (dayNumber === 4) {
        onOpenChange(false);
      }
    }
    return success;
  };

  // Always use fullScreen mode for true fullscreen experience
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] p-0 m-0 h-[100vh] w-[100vw] rounded-none border-none overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
        <ExerciseDialogHeader studentName={studentName} />

        {isLoading ? (
          <ExerciseDialogLoading />
        ) : (
          <ExerciseDialogContent
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
            viewMode={viewMode}
            setViewMode={setViewMode}
            filteredExercises={filteredExercises}
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
            handleSaveExercises={onSave}
          />
        )}

        <ExerciseDialogFooter
          activeTab={activeTab}
          selectedExercisesCount={getActiveTabSelectedExercises().length}
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
