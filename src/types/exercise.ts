
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
  description?: string;
  targetMuscle?: string;
  equipment?: string;
  category?: string; // افزودن فیلد category برای سازگاری با سایر بخش‌ها
  sets?: number; // فیلدهای مورد نیاز برای StudentExerciseDialog
  reps?: string;
  rest?: string;
  day?: number;
  type?: string; // نوع تمرین مانند "قدرتی"، "استقامتی" و غیره
}

export const defaultExerciseTypes: ExerciseType[] = [];

export const defaultCategories: ExerciseCategory[] = [];

export const defaultExercises: Exercise[] = [];
