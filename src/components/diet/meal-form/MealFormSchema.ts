
import { z } from "zod";

export const mealFormSchema = z.object({
  name: z.string().min(1, "نام وعده غذایی الزامی است"),
  type: z.string().min(1, "نوع وعده غذایی الزامی است"),
  day: z.string().min(1, "روز هفته الزامی است"),
});

export type MealFormData = z.infer<typeof mealFormSchema>;
