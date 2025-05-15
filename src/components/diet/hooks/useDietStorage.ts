
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Meal, WeekDay } from "@/types/meal";
import { safeJSONParse, safeJSONSave, notifyDataChange } from "@/utils/database";

/**
 * خوک برای مدیریت ذخیره‌سازی وعده‌های غذایی با بهینه‌سازی عملکرد و مدیریت خطای بهتر
 */
export const useDietStorage = () => {
  const { toast } = useToast();
  
  // بارگیری وعده‌های غذایی از localStorage با مدیریت خطای بهتر
  const [meals, setMeals] = useState<Meal[]>(() => {
    return safeJSONParse<Meal[]>('meals', []);
  });
  
  // ذخیره وعده‌های غذایی در localStorage با مدیریت خطا و اعلان تغییرات
  const saveMeals = (newMeals: Meal[]) => {
    try {
      // استاندارد کردن روزهای هفته قبل از ذخیره‌سازی
      const normalizedMeals = newMeals.map(meal => ({
        ...meal,
        day: meal.day ? normalizeDay(meal.day) as WeekDay : meal.day
      }));
      
      if (safeJSONSave('meals', normalizedMeals)) {
        // Now use setMeals with the processed array that matches the Meal[] type
        setMeals(normalizedMeals);
        notifyDataChange('meals');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving meals:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره سازی",
        description: "مشکلی در ذخیره برنامه غذایی پیش آمده است"
      });
      return false;
    }
  };
  
  return {
    meals,
    saveMeals
  };
};

// تابع کمکی برای استاندارد کردن نام روزها
export const normalizeDay = (day: string | WeekDay): string => {
  return day.replace(/\s+/g, ' ').trim();  // استفاده از فضای خالی معمولی و حذف فضاهای اضافه
};
