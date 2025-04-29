
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

// مقادیر پیش‌فرض
export const defaultExerciseTypes: ExerciseType[] = [
  "بدنسازی",
  "کشش",
  "هوازی"
];

export const defaultCategories: ExerciseCategory[] = [
  { id: 1, name: "شانه", type: "بدنسازی" },
  { id: 2, name: "سینه", type: "بدنسازی" },
  { id: 3, name: "پشت", type: "بدنسازی" },
  { id: 4, name: "بازو", type: "بدنسازی" },
  { id: 5, name: "پا", type: "بدنسازی" },
  { id: 6, name: "شکم", type: "بدنسازی" },
  { id: 7, name: "عضلات فوقانی", type: "کشش" },
  { id: 8, name: "عضلات تحتانی", type: "کشش" },
  { id: 9, name: "دویدن", type: "هوازی" },
  { id: 10, name: "دوچرخه", type: "هوازی" }
];

export const defaultExercises: Exercise[] = [
  { id: 1, name: "پرس سینه", categoryId: 2 },
  { id: 2, name: "پرس سرشانه", categoryId: 1 },
  { id: 3, name: "زیربغل", categoryId: 3 },
  { id: 4, name: "جلو بازو", categoryId: 4 },
  { id: 5, name: "اسکات", categoryId: 5 },
  { id: 6, name: "کرانچ", categoryId: 6 },
  { id: 7, name: "کشش عضلات سینه", categoryId: 7 },
  { id: 8, name: "کشش همسترینگ", categoryId: 8 },
  { id: 9, name: "دو استقامتی", categoryId: 9 },
  { id: 10, name: "دوچرخه ثابت", categoryId: 10 }
];
