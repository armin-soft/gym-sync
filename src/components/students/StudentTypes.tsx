
import { WorkoutCategory } from "@/types/workout";

export interface Student {
  id: number;
  name: string;
  phone: string;
  startDate?: string;
  endDate?: string;
  picture?: string;
  status?: 'active' | 'pending' | 'completed';
  progress?: number;
  measurements?: {
    weight?: number;
    height?: number;
    bodyFat?: number;
    chest?: number;
    arms?: number;
    waist?: number;
    thigh?: number;
  };
  nextAppointment?: {
    date: string;
    time: string;
  };
  notes?: string;
  
  // Exercise-related fields
  exercises?: number[];
  exerciseSets?: Record<number, number>;
  exerciseReps?: Record<number, string>;
  
  // Day 1
  exercisesDay1?: number[];
  exerciseSetsDay1?: Record<number, number>;
  exerciseRepsDay1?: Record<number, string>;
  
  // Day 2
  exercisesDay2?: number[];
  exerciseSetsDay2?: Record<number, number>;
  exerciseRepsDay2?: Record<number, string>;
  
  // Day 3
  exercisesDay3?: number[];
  exerciseSetsDay3?: Record<number, number>;
  exerciseRepsDay3?: Record<number, string>;
  
  // Day 4
  exercisesDay4?: number[];
  exerciseSetsDay4?: Record<number, number>;
  exerciseRepsDay4?: Record<number, string>;
  
  // Day 5
  exercisesDay5?: number[];
  exerciseSetsDay5?: Record<number, number>;
  exerciseRepsDay5?: Record<number, string>;
  
  // Diet-related fields
  meals?: number[];
  mealsDay1?: number[];
  mealsDay2?: number[];
  mealsDay3?: number[];
  mealsDay4?: number[];
  
  // Supplement-related fields
  supplements?: number[];
  vitamins?: number[];
  supplementsDay1?: number[];
  vitaminsDay1?: number[];
  supplementsDay2?: number[];
  vitaminsDay2?: number[];
  supplementsDay3?: number[];
  vitaminsDay3?: number[];
  supplementsDay4?: number[];
  vitaminsDay4?: number[];
  
  // Workout tracking
  workouts?: {
    date: string;
    exercises: {
      id: number;
      sets: {
        reps: number;
        weight: number;
      }[];
    }[];
    notes?: string;
    category?: WorkoutCategory;
  }[];
  
  // Preferences
  preferences?: {
    activeTab?: string;
    reminderTime?: string;
    notifications?: boolean;
  };
  
  // Grouping
  group?: string;
}

export interface StudentHistoryEntry {
  id: number;
  studentId: number;
  studentName: string;
  action: string;
  detail: string;
  timestamp: string;
}
