
export interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment?: string;
  password: string;
  age?: string;
  grade?: string;
  group?: string;
  gender: "male" | "female";
  exercises?: number[];
  exerciseSets?: Record<number, number>;
  exerciseReps?: Record<number, string>;
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
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
  createdAt?: string;
  progress?: number;
}

export type StudentFormData = Omit<Student, 'id' | 'createdAt' | 'progress'>;
