
// انواع حرکت‌های اصلی
export type ExerciseType = string;

// دسته‌بندی‌های هر نوع حرکت
export interface ExerciseCategory {
  id: number;
  name: string;
  type: ExerciseType;
  description?: string;
  color?: string;
  icon?: string;
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
  difficulty?: "easy" | "medium" | "hard"; // سطح دشواری تمرین
  imageUrl?: string; // آدرس تصویر حرکت
  videoUrl?: string; // آدرس ویدیوی آموزشی
  instructions?: string[]; // دستورالعمل‌های انجام حرکت
  muscles?: string[]; // عضلات درگیر
}

// Interface for exercise with sets and reps information
export interface ExerciseWithSets {
  id: number;
  sets: number;
  reps: string; // Making reps a required field instead of optional
  rest?: string;
  day?: number;
  weight?: string;
  intensity?: number;
}

export const defaultExerciseTypes: ExerciseType[] = [
  "قدرتی",
  "استقامتی",
  "انعطاف‌پذیری",
  "تعادلی",
  "کاردیو"
];

export const defaultCategories: ExerciseCategory[] = [
  { id: 1, name: "سینه", type: "قدرتی" },
  { id: 2, name: "پشت", type: "قدرتی" },
  { id: 3, name: "شانه", type: "قدرتی" },
  { id: 4, name: "بازو", type: "قدرتی" },
  { id: 5, name: "پا", type: "قدرتی" },
  { id: 6, name: "شکم", type: "قدرتی" },
  { id: 7, name: "کشش", type: "انعطاف‌پذیری" }
];

export const defaultExercises: Exercise[] = [
  { id: 101, name: "پرس سینه", categoryId: 1, targetMuscle: "سینه", equipment: "دمبل" },
  { id: 102, name: "زیر بغل", categoryId: 2, targetMuscle: "پشت", equipment: "هالتر" },
  { id: 103, name: "پرس سرشانه", categoryId: 3, targetMuscle: "شانه", equipment: "دمبل" }
];
