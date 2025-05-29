
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
  exercises: ExerciseWithSets[];
  exercisesDay1: ExerciseWithSets[];
  exercisesDay2: ExerciseWithSets[];
  exercisesDay3: ExerciseWithSets[];
  exercisesDay4: ExerciseWithSets[];
  meals: number[];
  supplements: number[];
  vitamins: number[];
  lastUpdate?: string;
}

export type StudentFormData = Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins" | "lastUpdate">;
