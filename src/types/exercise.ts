
export type ExerciseCategory = "دلتوئید خلفی" | "دلتوئید جلویی";

export interface Exercise {
  id: number;
  name: string;
  category: ExerciseCategory;
}

// فقط دسته‌بندی‌های اصلی، بدون حرکات پیش‌فرض
export const defaultExercises: Exercise[] = [];

// دسته‌بندی‌های پیش‌فرض
export const defaultCategories: ExerciseCategory[] = [
  "دلتوئید خلفی",
  "دلتوئید جلویی"
];
