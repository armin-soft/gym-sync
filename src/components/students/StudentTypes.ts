
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
  exerciseReps?: Record<number, string>; // Map exercise ID to reps (string type)
  exercisesDay1?: number[];
  exerciseSetsDay1?: Record<number, number>; // Map exercise ID to sets for day 1
  exerciseRepsDay1?: Record<number, string>; // Map exercise ID to reps for day 1 (string type)
  exercisesDay2?: number[];
  exerciseSetsDay2?: Record<number, number>; // Map exercise ID to sets for day 2
  exerciseRepsDay2?: Record<number, string>; // Map exercise ID to reps for day 2 (string type)
  exercisesDay3?: number[];
  exerciseSetsDay3?: Record<number, number>; // Map exercise ID to sets for day 3
  exerciseRepsDay3?: Record<number, string>; // Map exercise ID to reps for day 3 (string type)
  exercisesDay4?: number[];
  exerciseSetsDay4?: Record<number, number>; // Map exercise ID to sets for day 4
  exerciseRepsDay4?: Record<number, string>; // Map exercise ID to reps for day 4 (string type)
  exercisesDay5?: number[];
  exerciseSetsDay5?: Record<number, number>; // Map exercise ID to sets for day 5
  exerciseRepsDay5?: Record<number, string>; // Map exercise ID to reps for day 5 (string type)
  meals?: number[];
  mealsDay1?: number[]; // شنبه
  mealsDay2?: number[]; // یکشنبه
  mealsDay3?: number[]; // دوشنبه
  mealsDay4?: number[]; // سه شنبه
  mealsDay5?: number[]; // چهارشنبه
  mealsDay6?: number[]; // پنج شنبه
  mealsDay7?: number[]; // جمعه
  mealNotes?: string;
  supplements?: number[];
  vitamins?: number[];
  supplementNotes?: string; // Add the missing property
  supplementsDay1?: number[]; // Add support for day-specific supplements
  vitaminsDay1?: number[];    // Add support for day-specific vitamins
  supplementsDay2?: number[];
  vitaminsDay2?: number[];
  supplementsDay3?: number[];
  vitaminsDay3?: number[];
  supplementsDay4?: number[];
  vitaminsDay4?: number[];
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
  
  // تمام ویژگی‌های مورد نیاز را به صورت اختیاری تعریف می‌کنیم
  height?: string;
  weight?: string;
  image?: string;
  payment?: string;
  grade?: string; // Added grade property
  group?: string; // Added group property
}

// مدل‌های تمرین، غذا و مکمل که باید اضافه شوند
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
