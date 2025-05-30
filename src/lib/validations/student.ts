
import * as z from "zod";

// Convert Persian numbers to English for validation
const convertPersianToEnglish = (value: string): string => {
  if (!value) return '';
  return value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
};

// Preprocessing for number fields
const numberPreprocessor = (value: string) => {
  return convertPersianToEnglish(value);
};

export const studentFormSchema = z.object({
  name: z.string().min(2, { message: "نام و نام خانوادگی الزامی است" }),
  phone: z.string()
    .transform(numberPreprocessor)
    .refine(val => /^09\d{9}$/.test(val), { 
      message: "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد" 
    }),
  height: z.string()
    .transform(numberPreprocessor)
    .refine(val => /^\d+$/.test(val), { 
      message: "قد باید عدد باشد" 
    }),
  weight: z.string()
    .transform(numberPreprocessor)
    .refine(val => /^\d+$/.test(val), { 
      message: "وزن باید عدد باشد" 
    }),
  image: z.string().default("/Assets/Image/Place-Holder.svg"),
  payment: z.string()
    .transform(numberPreprocessor)
    .refine(val => /^\d+$/.test(val), { 
      message: "مبلغ باید عدد باشد" 
    }),
  password: z.string()
    .min(8, { message: "گذرواژه باید حداقل ۸ کاراکتر باشد" })
    .refine(val => /^(?=.*[a-zA-Z])(?=.*\d)/.test(val), {
      message: "گذرواژه باید شامل حروف و اعداد باشد"
    }),
  grade: z.string().optional(),
  group: z.string().optional(),
  age: z.string()
    .transform(numberPreprocessor)
    .refine(val => !val || /^\d+$/.test(val), { 
      message: "سن باید عدد باشد" 
    })
    .optional(),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;
