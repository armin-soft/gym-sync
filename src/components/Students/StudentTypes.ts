
export interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment: string; // Changed from optional to required to match expected type
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

// Adding missing types needed by export.ts
export interface Exercise {
  id: number;
  name: string;
  category?: string;
  description?: string;
  type?: string;
}

export interface Meal {
  id: number;
  name: string;
  category?: string;
  description?: string;
  type?: string;
  day?: string;
}

export interface Supplement {
  id: number;
  name: string;
  type: string;
  dosage?: string;
  timing?: string;
  category?: string;
  description?: string;
}
