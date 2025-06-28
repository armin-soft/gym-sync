
// Database types based on existing Supabase tables
export interface Student {
  id: number;
  name: string;
  phone?: string;
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
  image?: string;
  payment?: string;
  grade?: string;
  group?: string;
  created_at?: string;
  updated_at?: string;
  lastUpdate?: string;
}

export interface Exercise {
  id: number;
  name: string;
  categoryId?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ExerciseCategory {
  id: number;
  name: string;
  type: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExerciseType {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Meal {
  id: number;
  name: string;
  description?: string;
  type?: string;
  day?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Supplement {
  id: number;
  name: string;
  description?: string;
  type?: string;
  category?: string;
  dosage?: string;
  timing?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Vitamin {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TrainerProfile {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  bio?: string;
  gymName?: string;
  gymDescription?: string;
  gymAddress?: string;
  price?: string;
  instagram?: string;
  website?: string;
  image?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

// Student relation tables
export interface StudentExercise {
  id: number;
  student_id?: number;
  exercise_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface StudentMeal {
  id: number;
  student_id?: number;
  meal_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface StudentSupplement {
  id: number;
  student_id?: number;
  supplement_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface StudentVitamin {
  id: number;
  student_id?: number;
  vitamin_id: number;
  created_at?: string;
  updated_at?: string;
}
