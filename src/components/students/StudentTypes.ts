

export interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image?: string;
  payment?: string;
  password?: string;
  age?: string;
  grade?: string;
  group?: string;
  createdAt?: string | Date;
  progress?: number;
  
  // General exercise fields - using number[] for exercise IDs
  exercises?: number[];
  exerciseSets?: Record<number, number>;
  exerciseReps?: Record<number, string>;
  
  // Day-specific exercise fields - using number[] for exercise IDs
  exercisesDay1?: number[];
  exerciseSetsDay1?: Record<number, number>;
  exerciseRepsDay1?: Record<number, string>;
  
  exercisesDay2?: number[];
  exerciseSetsDay2?: Record<number, number>;
  exerciseRepsDay2?: Record<number, string>;
  
  exercisesDay3?: number[];
  exerciseSetsDay3?: Record<number, number>;
  exerciseRepsDay3?: Record<number, string>;
  
  exercisesDay4?: number[];
  exerciseSetsDay4?: Record<number, number>;
  exerciseRepsDay4?: Record<number, string>;
  
  exercisesDay5?: number[];
  exerciseSetsDay5?: Record<number, number>;
  exerciseRepsDay5?: Record<number, string>;
  
  exercisesDay6?: number[];
  exerciseSetsDay6?: Record<number, number>;
  exerciseRepsDay6?: Record<number, string>;
  
  // General diet and supplement fields
  meals?: any[];
  supplements?: any[];
  vitamins?: any[];
  
  // Day-specific meal fields
  mealsDay1?: number[];
  mealsDay2?: number[];
  mealsDay3?: number[];
  mealsDay4?: number[];
  mealsDay5?: number[];
  mealsDay6?: number[];
  mealsDay7?: number[];
  
  // Day-specific supplement fields
  supplementsDay1?: number[];
  vitaminsDay1?: number[];
}

// Remove the duplicate ExerciseWithSets definition and use the one from types/exercise.ts

