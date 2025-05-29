import { ExerciseWithSets } from "@/types/exercise";

export interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment: string;
  password: string;
  age?: string;
  grade?: string;
  group?: string;
  
  // Progress tracking
  progress?: number;
  
  // Exercise properties
  exercises: ExerciseWithSets[];
  exerciseSets?: Record<number, number>;
  exerciseReps?: Record<number, string>;
  
  // Daily exercise properties
  exercisesDay1: ExerciseWithSets[];
  exerciseSetsDay1?: Record<number, number>;
  exerciseRepsDay1?: Record<number, string>;
  
  exercisesDay2: ExerciseWithSets[];
  exerciseSetsDay2?: Record<number, number>;
  exerciseRepsDay2?: Record<number, string>;
  
  exercisesDay3: ExerciseWithSets[];
  exerciseSetsDay3?: Record<number, number>;
  exerciseRepsDay3?: Record<number, string>;
  
  exercisesDay4: ExerciseWithSets[];
  exerciseSetsDay4?: Record<number, number>;
  exerciseRepsDay4?: Record<number, string>;
  
  exercisesDay5?: ExerciseWithSets[];
  exerciseSetsDay5?: Record<number, number>;
  exerciseRepsDay5?: Record<number, string>;
  
  exercisesDay6?: ExerciseWithSets[];
  exerciseSetsDay6?: Record<number, number>;
  exerciseRepsDay6?: Record<number, string>;
  
  // Meal properties
  meals: number[];
  mealsDay1?: number[];
  mealsDay2?: number[];
  mealsDay3?: number[];
  mealsDay4?: number[];
  mealsDay5?: number[];
  mealsDay6?: number[];
  mealsDay7?: number[];
  
  // Supplement properties
  supplements: number[];
  supplementsDay1?: number[];
  
  // Vitamin properties
  vitamins: number[];
  vitaminsDay1?: number[];
  
  // Other properties
  picture?: string; // Alternative to image for some components
  lastUpdate?: string;
}

export type StudentFormData = Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins" | "lastUpdate">;
