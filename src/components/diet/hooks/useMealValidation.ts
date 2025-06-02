
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
    // لاگ برای دیباگ با جزئیات بیشتر
    console.log("====== DUPLICATE CHECK ======");
    console.log("Checking for duplicate meal:", data);
    console.log("Meal ID for edit check:", mealId);
    console.log("Total meals to compare against:", meals.length);
    
    const normalizedNewName = normalizeMealName(data.name);
    const normalizedNewDay = normalizeDay(data.day || '');
    const newType = data.type;
    
    console.log(`Normalized new meal: Name="${normalizedNewName}", Day="${normalizedNewDay}", Type="${newType}"`);
    
    // بررسی تمام وعده‌های موجود با جزئیات بیشتر برای دیباگ
    let duplicateFound = false;
    let duplicateMealId = null;
    
    for (const existingMeal of meals) {
      // اگر در حال ویرایش هستیم، مقایسه با خود غذا را نادیده بگیریم
      if (mealId !== undefined && existingMeal.id === mealId) {
        console.log(`Skipping self-comparison for meal ID ${mealId}`);
        continue;
      }
      
      // استاندارد کردن داده های غذای موجود
      const normalizedExistingName = normalizeMealName(existingMeal.name);
      const normalizedExistingDay = normalizeDay(existingMeal.day || '');
      const existingType = existingMeal.type;
      
      const isDuplicate = 
        normalizedExistingName === normalizedNewName && 
        normalizedExistingDay === normalizedNewDay &&
        existingType === newType;
      
      if (isDuplicate) {
        duplicateFound = true;
        duplicateMealId = existingMeal.id;
        console.log("DUPLICATE FOUND!");
        console.log(`Existing meal (ID: ${existingMeal.id}):`, {
          name: existingMeal.name,
          normalizedName: normalizedExistingName,
          day: existingMeal.day,
          normalizedDay: normalizedExistingDay,
          type: existingMeal.type
        });
        console.log(`New/Edited meal:`, {
          name: data.name,
          normalizedName: normalizedNewName,
          day: data.day,
          normalizedDay: normalizedNewDay,
          type: data.type,
          mealIdForEdit: mealId
        });
        break;
      }
    }
    
    console.log(`Duplicate check result: ${duplicateFound ? 'DUPLICATE' : 'UNIQUE'}`);
    if (duplicateFound) {
      console.log(`Duplicate found with meal ID: ${duplicateMealId}`);
    }
    console.log("====== END DUPLICATE CHECK ======");
    
    return duplicateFound;
  };
  
  const validateMeal = (data: Omit<Meal, "id">, mealId?: number): boolean => {
    console.log(`Validating meal with provided ID: ${mealId !== undefined ? mealId : 'new meal'}`);
    
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
