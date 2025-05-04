
import { useToast } from "@/components/ui/use-toast";
import { Meal, WeekDay } from "@/types/meal";
import { normalizeDay } from "./useDietStorage";

/**
 * هوک برای اعتبارسنجی وعده‌های غذایی
 */
export const useMealValidation = (meals: Meal[]) => {
  const { toast } = useToast();
  
  // تابع کمکی برای استاندارد کردن نام غذاها (حذف فاصله‌های اضافی، یکسان‌سازی حروف)
  const normalizeMealName = (name: string): string => {
    return name.trim().toLowerCase();
  };
  
  // بررسی تکراری بودن وعده غذایی در همان روز و همان نوع وعده - با دقت بیشتر
  const isMealDuplicate = (data: Omit<Meal, "id">, mealId?: number): boolean => {
    // لاگ برای دیباگ
    console.log("Checking for duplicate meal:", data);
    
    const normalizedNewName = normalizeMealName(data.name);
    const normalizedNewDay = normalizeDay(data.day || '');
    const newType = data.type;
    
    console.log(`Normalized new meal: Name="${normalizedNewName}", Day="${normalizedNewDay}", Type="${newType}"`);
    
    // بررسی تمام وعده‌های موجود
    const duplicate = meals.some(existingMeal => {
      // اگر مقایسه با خود غذا است (در حالت ویرایش)، نباید به عنوان تکراری محسوب شود
      if (mealId !== undefined && existingMeal.id === mealId) {
        console.log(`Skipping comparison with self (ID: ${mealId})`);
        return false;
      }
      
      // استاندارد کردن نام روزها و نام غذاها قبل از مقایسه
      const normalizedExistingDay = normalizeDay(existingMeal.day || '');
      const normalizedExistingName = normalizeMealName(existingMeal.name);
      const existingType = existingMeal.type;
      
      // مقایسه دقیق نام غذا، نوع وعده و روز
      const isDuplicate = 
        normalizedExistingName === normalizedNewName && 
        existingType === newType && 
        normalizedExistingDay === normalizedNewDay;
      
      if (isDuplicate) {
        console.log("Found duplicate meal:", {
          existing: {
            id: existingMeal.id,
            name: existingMeal.name,
            normalizedName: normalizedExistingName,
            type: existingMeal.type,
            day: existingMeal.day,
            normalizedDay: normalizedExistingDay
          },
          new: {
            name: data.name,
            normalizedName: normalizedNewName,
            type: data.type,
            day: data.day,
            normalizedDay: normalizedNewDay,
            mealId
          }
        });
      }
      
      return isDuplicate;
    });
    
    console.log("Duplicate meal found:", duplicate);
    return duplicate;
  };
  
  const validateMeal = (data: Omit<Meal, "id">, mealId?: number): boolean => {
    console.log("Validating meal with ID:", mealId, "and data:", data);
    
    // بررسی تکراری بودن وعده غذایی در همان روز و همان نوع وعده
    if (isMealDuplicate(data, mealId)) {
      toast({
        variant: "destructive",
        title: "خطا در ثبت وعده غذایی",
        description: "این وعده غذایی قبلاً برای این روز و نوع وعده ثبت شده است",
      });
      return false;
    }
    return true;
  };
  
  return {
    validateMeal,
    isMealDuplicate
  };
};
