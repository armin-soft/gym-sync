export interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment: string;
  exercises?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
}

export interface Exercise {
  id: number;
  name: string;
  category?: string;
  description?: string;
}

export interface Meal {
  id: number;
  name: string;
  category?: string;
  description?: string;
}

export interface Supplement {
  id: number;
  name: string;
  type?: string;
  description?: string;
}

export interface Vitamin {
  id: number;
  name: string;
  type?: string;
  description?: string;
}

export interface TrainingSession {
  id: number;
  student: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}
