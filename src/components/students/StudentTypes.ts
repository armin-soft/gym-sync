
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
  createdAt?: string | Date; // اضافه کردن تاریخ ایجاد
  
  // Exercise fields
  exercisesDay1?: ExerciseWithSets[];
  exercisesDay2?: ExerciseWithSets[];
  exercisesDay3?: ExerciseWithSets[];
  exercisesDay4?: ExerciseWithSets[];
  exercisesDay5?: ExerciseWithSets[];
  
  // Diet and supplement fields
  meals?: any[];
  supplements?: any[];
  vitamins?: any[];
}

export interface ExerciseWithSets {
  id: number;
  sets: string;
  reps?: string;
  name?: string;
  day?: string;
}
