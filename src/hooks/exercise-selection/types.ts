
import { Exercise } from '@/types/exercise';

// Interface for exercise with sets and reps information
export interface ExerciseWithSets {
  id: number;
  name?: string;
  sets: number;
  reps: string;
  rest?: string;
  day?: number;
  weight?: string;
  intensity?: number;
}

export interface ExerciseDialogState {
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  exercises: Exercise[];
  categories: any[];
  exerciseTypes: string[];
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: Exercise[];
  filteredCategories: any[];
  handleClearSearch: () => void;
  
  // Day 1 state
  selectedExercisesDay1: number[];
  toggleExerciseDay1: (id: number) => void;
  exerciseSetsDay1: Record<number, number>;
  handleSetsChangeDay1: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1: Record<number, string>;
  handleRepsChangeDay1: (exerciseId: number, reps: string) => void;
  
  // Day 2 state
  selectedExercisesDay2: number[];
  toggleExerciseDay2: (id: number) => void;
  exerciseSetsDay2: Record<number, number>;
  handleSetsChangeDay2: (exerciseId: number, sets: number) => void;
  exerciseRepsDay2: Record<number, string>;
  handleRepsChangeDay2: (exerciseId: number, reps: string) => void;
  
  // Day 3 state
  selectedExercisesDay3: number[];
  toggleExerciseDay3: (id: number) => void;
  exerciseSetsDay3: Record<number, number>;
  handleSetsChangeDay3: (exerciseId: number, sets: number) => void;
  exerciseRepsDay3: Record<number, string>;
  handleRepsChangeDay3: (exerciseId: number, reps: string) => void;
  
  // Day 4 state
  selectedExercisesDay4: number[];
  toggleExerciseDay4: (id: number) => void;
  exerciseSetsDay4: Record<number, number>;
  handleSetsChangeDay4: (exerciseId: number, sets: number) => void;
  exerciseRepsDay4: Record<number, string>;
  handleRepsChangeDay4: (exerciseId: number, reps: string) => void;
  
  getActiveTabSelectedExercises: () => number[];
  getActiveTabSelectedExercisesWithSets: () => ExerciseWithSets[];
  handleSaveDay: (
    exercisesWithSets: ExerciseWithSets[],
    onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean,
    dayNumber: number
  ) => boolean;
  handleSave: () => boolean;
}
