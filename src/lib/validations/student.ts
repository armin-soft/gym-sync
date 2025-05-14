
import * as z from "zod";

export const studentFormSchema = z.object({
  name: z.string().min(2, {
    message: "نام باید حداقل ۲ حرف داشته باشد",
  }),
  age: z.string().optional(),
  grade: z.string().optional(),
  group: z.string().optional(),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;
