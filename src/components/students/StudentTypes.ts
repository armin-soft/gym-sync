
export interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment?: string;
  exercises?: number[];
  exercisesDay1?: number[];
  exercisesDay2?: number[];
  exercisesDay3?: number[];
  exercisesDay4?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
  progress?: number;
}
