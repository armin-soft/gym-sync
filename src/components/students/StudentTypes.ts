
export interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment: string;
  exercises?: number[];
  exercisesDay1?: number[];
  exercisesDay2?: number[];
  exercisesDay3?: number[];
  exercisesDay4?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
  notes?: string;
}

export interface Exercise {
  id: number;
  name: string;
  category?: string;
  description?: string;
  equipment?: string;
  targetMuscle?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  instructions?: string[];
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
  dosage?: string;
  timing?: string;
}

export interface Vitamin {
  id: number;
  name: string;
  type?: string;
  description?: string;
  dosage?: string;
  timing?: string;
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

export interface WorkoutPlan {
  day: number;
  exercises: number[];
  notes?: string;
}
