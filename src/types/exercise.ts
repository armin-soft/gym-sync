
export interface Exercise {
  id: number;
  name: string;
  category: "دلتوئید خلفی" | "دلتوئید جلویی";
}

// فقط دسته‌بندی‌های اصلی، بدون حرکات پیش‌فرض
export const defaultExercises: Exercise[] = [];
