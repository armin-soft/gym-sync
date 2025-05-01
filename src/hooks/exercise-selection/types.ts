
/**
 * Types related to exercise selection functionality
 */
export interface ExerciseWithSets {
  id: number;
  sets: number;
  reps?: string;
}

export type ExerciseSets = Record<number, number>;
export type ExerciseReps = Record<number, string>;
