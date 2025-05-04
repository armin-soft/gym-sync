
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Meal, WeekDay } from "@/types/meal";

/**
 * خوک برای مدیریت ذخیره‌سازی وعده‌های غذایی
 */
export const useDietStorage = () => {
  const { toast } = useToast();
  
  // بارگیری وعده‌های غذایی از localStorage یا شروع با آرایه خالی
  const [meals, setMeals] = useState<Meal[]>(() => {
    try {
      const savedMeals = localStorage.getItem('meals');
      const parsedMeals = savedMeals ? JSON.parse(savedMeals) : [];
      console.log("Loaded meals from localStorage:", parsedMeals.length);
      return parsedMeals;
    } catch (error) {
      console.error('Error loading meals:', error);
      return [];
    }
  });
  
  // ذخیره وعده‌های غذایی در localStorage
  const saveMeals = (newMeals: Meal[]) => {
    try {
      // استاندارد کردن روزهای هفته قبل از ذخیره‌سازی
      const normalizedMeals = newMeals.map(meal => ({
        ...meal,
        day: meal.day ? normalizeDay(meal.day) as WeekDay : meal.day
      }));
      
      localStorage.setItem('meals', JSON.stringify(normalizedMeals));
      // Now use setMeals with the processed array that matches the Meal[] type
      setMeals(normalizedMeals);
      return true;
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
  return day.replace(/\s+/g, ' ');  // استفاده از فضای خالی معمولی
};
