
export type MealType = "صبحانه" | "میان وعده صبح" | "ناهار" | "میان وعده عصر" | "شام" | "میان وعده";
export type WeekDay = "شنبه" | "یکشنبه" | "دوشنبه" | "سه شنبه" | "چهارشنبه" | "پنج شنبه" | "جمعه";

export interface Meal {
  id: number;
  name: string;
  category?: string;
  description?: string;
  type: MealType;
  day?: WeekDay;
}
