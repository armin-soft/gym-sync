
export interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment?: string;
  exercises?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
  exercisesDay1?: number[];
  exercisesDay2?: number[];
  exercisesDay3?: number[];
  exercisesDay4?: number[];
  progress?: number;
}

export interface Exercise {
  id: number;
  name: string;
  type?: string;
  category?: string;
  description?: string;
}

export interface Meal {
  id: number;
  name: string;
  type?: string;
  description?: string;
}

export interface Supplement {
  id: number;
  name: string;
  type?: string;
  description?: string;
}
