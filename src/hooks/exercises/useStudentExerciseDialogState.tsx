
import { ExerciseWithSets } from "@/hooks/exercise-selection/types";
import { useExerciseDialogData } from "./useExerciseDialogData";
import { useExerciseSelection } from "@/hooks/exercise-selection";
import { useExerciseDialogState } from "./useExerciseDialogState";

interface UseStudentExerciseDialogStateProps {
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

/**
 * Custom hook that manages all state for the student exercise dialog
 */
export const useStudentExerciseDialogState = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = []
}: UseStudentExerciseDialogStateProps) => {
  // Fetch exercises data
  const { exercises, categories, exerciseTypes, isLoading } = useExerciseDialogData();

  // Exercise selection state from hook
  const exerciseSelection = useExerciseSelection({
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4
  });
  
  // Destructure the properties we need from exerciseSelection
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
  } = exerciseSelection;

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
    
    const typedOnSave = onSave as (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
    const success = handleSaveDay(selectedExercisesWithSets, typedOnSave, dayNumber);
    
    if (success) {
      // If this was the last day and all days are saved, close the dialog
      if (dayNumber === 4) {
        onOpenChange(false);
      }
    }
    return success;
  };

  return {
    // Data
    isLoading,
    exercises,
    categories,
    exerciseTypes,
    
    // Tab state
    activeTab,
    setActiveTab,
    
    // Search and filter state
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
    
    // Day 1 state
    selectedExercisesDay1,
    toggleExerciseDay1,
    exerciseSetsDay1,
    handleSetsChangeDay1,
    exerciseRepsDay1,
    handleRepsChangeDay1,
    
    // Day 2 state
    selectedExercisesDay2,
    toggleExerciseDay2,
    exerciseSetsDay2,
    handleSetsChangeDay2,
    exerciseRepsDay2,
    handleRepsChangeDay2,
    
    // Day 3 state
    selectedExercisesDay3,
    toggleExerciseDay3,
    exerciseSetsDay3,
    handleSetsChangeDay3,
    exerciseRepsDay3,
    handleRepsChangeDay3,
    
    // Day 4 state
    selectedExercisesDay4,
    toggleExerciseDay4,
    exerciseSetsDay4,
    handleSetsChangeDay4,
    exerciseRepsDay4,
    handleRepsChangeDay4,
    
    // Helper functions
    getActiveTabSelectedExercises,
    getActiveTabSelectedExercisesWithSets,
    handleSave,
    handleSaveDay
  };
};
