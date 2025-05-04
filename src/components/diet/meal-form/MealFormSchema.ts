
import * as z from "zod";
import type { Meal, MealType, WeekDay } from "@/types/meal";

export const mealFormSchema = z.object({
  name: z.string().min(2, "نام غذا باید حداقل ۲ کاراکتر باشد").transform(val => val.trim()),
  type: z.string().min(1, "نوع وعده غذایی الزامی است"),
  day: z.string().min(1, "روز هفته الزامی است"),
  description: z.string(),
  category: z.string().optional(),
}).required();

export type MealFormData = z.infer<typeof mealFormSchema>;

export interface MealFormProps {
  form: any;
  mealTypes: MealType[];
  weekDays: WeekDay[];
}
