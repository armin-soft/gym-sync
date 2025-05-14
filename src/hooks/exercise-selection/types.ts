
/**
 * Types related to exercise selection functionality
 */
export interface ExerciseWithSets {
  id: number;
  sets: number;
  reps: string;
  day?: number; // Changed from string to number to match the type in exercise.ts
  rest?: string;
  weight?: string;
  intensity?: number;
}

export type ExerciseSets = Record<number, number>;
export type ExerciseReps = Record<number, string>;

// Add interfaces to support day-based exercise selections
export interface ExerciseDaySelections {
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  toggleExerciseDay1: (id: number) => void;
  toggleExerciseDay2: (id: number) => void;
  toggleExerciseDay3: (id: number) => void;
  toggleExerciseDay4: (id: number) => void;
  exerciseSetsDay1: ExerciseSets;
  exerciseSetsDay2: ExerciseSets;
  exerciseSetsDay3: ExerciseSets;
  exerciseSetsDay4: ExerciseSets;
  handleSetsChangeDay1: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1: ExerciseReps;
  exerciseRepsDay2: ExerciseReps;
  exerciseRepsDay3: ExerciseReps;
  exerciseRepsDay4: ExerciseReps;
  handleRepsChangeDay1: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay2: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4: (exerciseId: number, reps: string) => void;
  getSelectedExercisesWithSetsDay1: () => ExerciseWithSets[];
  getSelectedExercisesWithSetsDay2: () => ExerciseWithSets[];
  getSelectedExercisesWithSetsDay3: () => ExerciseWithSets[];
  getSelectedExercisesWithSetsDay4: () => ExerciseWithSets[];
}
