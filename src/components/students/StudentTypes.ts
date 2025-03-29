
export interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment?: string;
  exercises?: any[];
  meals?: any[];
  supplements?: any[];
  vitamins?: any[];
  exercisesDay1?: any[];
  exercisesDay2?: any[];
  exercisesDay3?: any[];
  exercisesDay4?: any[];
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
