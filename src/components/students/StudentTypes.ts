
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
  progress?: number; // اضافه کردن progress
  
  // General exercise fields
  exercises?: ExerciseWithSets[];
  exerciseSets?: Record<number, number>;
  exerciseReps?: Record<number, string>;
  
  // Day-specific exercise fields
  exercisesDay1?: ExerciseWithSets[];
  exerciseSetsDay1?: Record<number, number>;
  exerciseRepsDay1?: Record<number, string>;
  
  exercisesDay2?: ExerciseWithSets[];
  exerciseSetsDay2?: Record<number, number>;
  exerciseRepsDay2?: Record<number, string>;
  
  exercisesDay3?: ExerciseWithSets[];
  exerciseSetsDay3?: Record<number, number>;
  exerciseRepsDay3?: Record<number, string>;
  
  exercisesDay4?: ExerciseWithSets[];
  exerciseSetsDay4?: Record<number, number>;
  exerciseRepsDay4?: Record<number, string>;
  
  exercisesDay5?: ExerciseWithSets[];
  exerciseSetsDay5?: Record<number, number>;
  exerciseRepsDay5?: Record<number, string>;
  
  exercisesDay6?: ExerciseWithSets[];
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

export interface ExerciseWithSets {
  id: number;
  sets: string;
  reps?: string;
  name?: string;
  day?: string;
}
