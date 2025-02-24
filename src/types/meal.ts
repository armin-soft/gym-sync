
export type MealType = "صبحانه" | "میان وعده صبح" | "ناهار" | "میان وعده عصر" | "شام";
export type WeekDay = "شنبه" | "یکشنبه" | "دوشنبه" | "سه شنبه" | "چهارشنبه" | "پنج شنبه" | "جمعه";

export interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  type: MealType;
  day: WeekDay;
}
