export interface Student {
  id: number;
  name: string;
  phone: string;
  startDate?: string;
  endDate?: string;
  picture?: string;
  status?: boolean;
  progress?: number;
  measurements?: {
    weight?: number;
    height?: number;
    bodyFat?: number;
    chest?: number;
    waist?: number;
    hip?: number;
    arm?: number;
    thigh?: number;
  };
  createdAt?: string;
  updatedAt?: string;
  age?: number;
  gender?: 'male' | 'female';
  goal?: string;
  trainingDays?: number;
  trainingTime?: string;
  address?: string;
  email?: string;
  
  // Additional optional properties
  height?: string;
  weight?: string;
  image?: string;
  payment?: string;
  grade?: string;
  group?: string;
  lastVisit?: string;
  
  // Program-related properties that we're keeping for compatibility
  exercises?: number[];
  exercisesDay1?: number[];
  exercisesDay2?: number[];
  exercisesDay3?: number[];
  exercisesDay4?: number[];
  exercisesDay5?: number[];
  exerciseSets?: Record<number, number>;
  exerciseSetsDay1?: Record<number, number>;
  exerciseSetsDay2?: Record<number, number>;
  exerciseSetsDay3?: Record<number, number>;
  exerciseSetsDay4?: Record<number, number>;
  exerciseSetsDay5?: Record<number, number>;
  exerciseReps?: Record<number, string>;
  exerciseRepsDay1?: Record<number, string>;
  exerciseRepsDay2?: Record<number, string>;
  exerciseRepsDay3?: Record<number, string>;
  exerciseRepsDay4?: Record<number, string>;
  exerciseRepsDay5?: Record<number, string>;
  meals?: number[];
  mealsDay1?: number[];
  mealsDay2?: number[];
  mealsDay3?: number[];
  mealsDay4?: number[];
  mealsDay5?: number[];
  mealsDay6?: number[];
  mealsDay7?: number[];
  supplements?: number[];
  supplementsDay1?: number[];
  supplementsDay2?: number[];
  supplementsDay3?: number[];
  supplementsDay4?: number[];
  supplementsDay5?: number[];
  supplementsDay6?: number[];
  supplementsDay7?: number[];
  vitamins?: number[];
  vitaminsDay1?: number[];
  vitaminsDay2?: number[];
  vitaminsDay3?: number[];
  vitaminsDay4?: number[];
  vitaminsDay5?: number[];
  vitaminsDay6?: number[];
  vitaminsDay7?: number[];
}

// Basic models for exercise, meal and supplement
export interface Exercise {
  id: number;
  name: string;
  categoryId: number;
  description?: string;
}

export interface Meal {
  id: number;
  name: string;
  type: string;
  description?: string;
}

export interface Supplement {
  id: number;
  name: string;
  type: string;
  description?: string;
}
