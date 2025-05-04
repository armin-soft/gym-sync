
import { useToast } from "@/components/ui/use-toast";
import { Meal, WeekDay } from "@/types/meal";
import { normalizeDay } from "./useDietStorage";

/**
 * هوک برای اعتبارسنجی وعده‌های غذایی
 */
export const useMealValidation = (meals: Meal[]) => {
  const { toast } = useToast();
  
  // بررسی تکراری بودن وعده غذایی در همان روز و همان نوع وعده - با دقت بیشتر
  const isMealDuplicate = (data: Omit<Meal, "id">, mealId?: number): boolean => {
    // لاگ برای دیباگ
    console.log("Checking for duplicate meal:", data);
    
    const duplicate = meals.some(existingMeal => {
      // استاندارد کردن نام روزها و نام غذاها قبل از مقایسه
      const normalizedExistingDay = normalizeDay(existingMeal.day || '');
      const normalizedNewDay = normalizeDay(data.day || '');
      
      const existingMealNameLower = existingMeal.name.trim().toLowerCase();
      const newMealNameLower = data.name.trim().toLowerCase();
      
      // مقایسه دقیق نام غذا، نوع وعده و روز
      const isDuplicate = 
        existingMealNameLower === newMealNameLower && 
        existingMeal.type === data.type && 
        normalizedExistingDay === normalizedNewDay &&
        existingMeal.id !== mealId;
      
      if (isDuplicate) {
        console.log("Found duplicate:", existingMeal, "comparing with:", data);
        console.log("Name comparison:", existingMealNameLower === newMealNameLower);
        console.log("Type comparison:", existingMeal.type === data.type);
        console.log("Day comparison:", normalizedExistingDay === normalizedNewDay);
      }
      
      return isDuplicate;
    });
    
    console.log("Duplicate found:", duplicate);
    return duplicate;
  };
  
  const validateMeal = (data: Omit<Meal, "id">, mealId?: number): boolean => {
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
