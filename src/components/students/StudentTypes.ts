
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

export interface Exercise {
  id: number;
  name: string;
  description?: string;
  typeId?: number;
  categoryId?: number;
  image?: string;
}

export interface Meal {
  id: number;
  name: string;
  description?: string;
  categoryId?: number;
  image?: string;
}

export interface Supplement {
  id: number;
  name: string;
  description?: string;
  type?: 'supplement' | 'vitamin';
  categoryId?: number;
  image?: string;
}
