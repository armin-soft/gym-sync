
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
export const defaultExerciseTypes: ExerciseType[] = ['قدرتی', 'استقامتی', 'کاردیو', 'انعطاف‌پذیری'];
export const defaultCategories: ExerciseCategory[] = [
  { id: 1, name: 'سینه', type: 'قدرتی' },
  { id: 2, name: 'پا', type: 'قدرتی' },
  { id: 3, name: 'کمر', type: 'قدرتی' },
  { id: 4, name: 'شانه', type: 'قدرتی' },
  { id: 5, name: 'شکم', type: 'انعطاف‌پذیری' },
];
export const defaultExercises: Exercise[] = [
  { id: 1, name: 'پرس سینه', categoryId: 1 },
  { id: 2, name: 'پرس سرشانه', categoryId: 4 },
  { id: 3, name: 'اسکات', categoryId: 2 },
  { id: 4, name: 'ددلیفت', categoryId: 3 },
  { id: 5, name: 'کرانچ', categoryId: 5 },
];
