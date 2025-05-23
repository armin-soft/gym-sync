
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
  
  // تمام ویژگی‌های مورد نیاز را به صورت اختیاری تعریف می‌کنیم
  height?: string;
  weight?: string;
  image?: string;
  payment?: string;
  grade?: string;
  group?: string;
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
