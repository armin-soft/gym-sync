
import React from "react";
import { useExerciseDialogData } from "@/hooks/exercises/useExerciseDialogData";
import { useExerciseDialogState } from "@/hooks/exercises/useExerciseDialogState";
import { useExerciseSelection } from "@/hooks/exercise-selection";
import { ExerciseWithSets } from "@/hooks/exercise-selection";

interface StudentExerciseDialogStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
  children: (props: {
    isLoading: boolean;
    exercises: any[];
    categories: any[];
    exerciseTypes: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategoryId: number | null;
    setSelectedCategoryId: (id: number | null) => void;
    selectedExerciseType: string;
    setSelectedExerciseType: (type: string) => void;
    sortOrder: "asc" | "desc";
    toggleSortOrder: () => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    filteredExercises: any[];
    filteredCategories: any[];
    handleClearSearch: () => void;
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
    getActiveTabSelectedExercises: () => number[];
    getActiveTabSelectedExercisesWithSets: () => ExerciseWithSets[];
    handleSave: () => boolean;
    handleSaveDay: (exercisesWithSets: ExerciseWithSets[], onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean, dayNumber: number) => boolean;
  }) => React.ReactNode;
}

export const StudentExerciseDialogState: React.FC<StudentExerciseDialogStateProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
  children
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
  } = useExerciseSelection({
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4
  });

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

  return children({
    isLoading,
    exercises,
    categories,
    exerciseTypes,
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
    getActiveTabSelectedExercises,
    getActiveTabSelectedExercisesWithSets,
    handleSave,
    handleSaveDay
  });
};

export default StudentExerciseDialogState;
