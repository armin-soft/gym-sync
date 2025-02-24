
// انواع حرکت‌های اصلی
export type ExerciseType = string;

// دسته‌بندی‌های هر نوع حرکت
export interface ExerciseCategory {
  id: number;
  name: string;
  type: ExerciseType;
}

// حرکت‌های تمرینی
export interface Exercise {
  id: number;
  name: string;
  categoryId: number;
}

// مقادیر پیش‌فرض
export const defaultExerciseTypes: ExerciseType[] = [
  "سرشانه",
  "پا",
  "زیر بغل",
  "سیم کش"
];

export const defaultCategories: ExerciseCategory[] = [];
export const defaultExercises: Exercise[] = [];
