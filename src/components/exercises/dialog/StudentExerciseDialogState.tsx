
import React from "react";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import { useStudentExerciseDialogState } from "@/hooks/exercises/useStudentExerciseDialogState";

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
  // Use the custom hook to manage all state
  const stateProps = useStudentExerciseDialogState({
    open,
    onOpenChange,
    studentName,
    onSave,
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4
  });

  // Render the children function with all the state props
  return children(stateProps);
};

export default StudentExerciseDialogState;
