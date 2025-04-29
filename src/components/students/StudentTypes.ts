
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
    waist?: number;
    hip?: number;
    arm?: number;
    thigh?: number;
  };
  exercises?: number[];
  exerciseSets?: Record<number, number>; // Map exercise ID to sets
  exercisesDay1?: number[];
  exerciseSetsDay1?: Record<number, number>; // Map exercise ID to sets for day 1
  exercisesDay2?: number[];
  exerciseSetsDay2?: Record<number, number>; // Map exercise ID to sets for day 2
  exercisesDay3?: number[];
  exerciseSetsDay3?: Record<number, number>; // Map exercise ID to sets for day 3
  exercisesDay4?: number[];
  exerciseSetsDay4?: Record<number, number>; // Map exercise ID to sets for day 4
  meals?: number[];
  mealNotes?: string;
  supplements?: number[];
  vitamins?: number[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  age?: number;
  gender?: 'male' | 'female';
  goal?: string;
  trainingDays?: number;
  trainingTime?: string;
  address?: string;
  email?: string;
  
  // Add the missing properties being referenced throughout the application
  height?: string;
  weight?: string;
  image?: string;
  payment?: string;
}
