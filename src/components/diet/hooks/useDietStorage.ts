
import { useState, useEffect } from "react";
import { Meal, WeekDay } from "@/types/meal";
import { useToast } from "@/hooks/use-toast";

/**
 * استاندارد کردن روزهای هفته برای جلوگیری از مشکلات تکراری
 */
export const normalizeDay = (day: string): string => {
  // حذف فضای خالی و یکسان‌سازی
  const normalizedDay = day.trim().toLowerCase();
  
  // نگاشت برای استاندارد کردن نوشتار روزها
  const dayMap: Record<string, WeekDay> = {
    'شنبه': 'شنبه',
    'يکشنبه': 'یکشنبه',
    'یک شنبه': 'یکشنبه',
    'یکشنبه': 'یکشنبه',
    'دوشنبه': 'دوشنبه',
    'دو شنبه': 'دوشنبه',
    'سه‌شنبه': 'سه شنبه',
    'سه شنبه': 'سه شنبه',
    'سه‌ شنبه': 'سه شنبه',
    'سهشنبه': 'سه شنبه',
    'چهارشنبه': 'چهارشنبه',
    'چهار شنبه': 'چهارشنبه',
    'پنج‌شنبه': 'پنج شنبه',
    'پنجشنبه': 'پنج شنبه',
    'پنج شنبه': 'پنج شنبه',
    'جمعه': 'جمعه'
  };
  
  // یافتن معادل استاندارد
  for (const [key, value] of Object.entries(dayMap)) {
    if (key.toLowerCase() === normalizedDay) {
      return value;
    }
  }
  
  // در صورت عدم تطابق، مقدار اصلی را برگردان
  return day;
};

export const useDietStorage = () => {
  const { toast } = useToast();
  const [meals, setMeals] = useState<Meal[]>([]);
  
  // بارگذاری برنامه‌های غذایی از localStorage
  useEffect(() => {
    try {
      console.log("=== DIET STORAGE DEBUG ===");
      const savedMeals = localStorage.getItem('meals');
      console.log("Raw saved meals from localStorage:", savedMeals);
      
      if (savedMeals) {
        const parsedMeals = JSON.parse(savedMeals);
        console.log("Parsed meals:", parsedMeals);
        console.log("Is array:", Array.isArray(parsedMeals));
        console.log("Meals count:", parsedMeals?.length || 0);
        
        const mealsArray = Array.isArray(parsedMeals) ? parsedMeals : [];
        setMeals(mealsArray);
        
        console.log("Set meals in state:", mealsArray);
        
        // تست سریع یک وعده غذایی برای دیباگ
        if (mealsArray.length === 0) {
          console.log("No meals found, creating test meal...");
          const testMeal: Meal = {
            id: 1,
            name: "صبحانه تست",
            type: "صبحانه",
            day: "شنبه",
            description: "یک وعده غذایی تست"
          };
          const testMeals = [testMeal];
          localStorage.setItem('meals', JSON.stringify(testMeals));
          setMeals(testMeals);
          console.log("Test meal created and saved");
        }
      } else {
        console.log("No saved meals found in localStorage");
        setMeals([]);
      }
      console.log("=== END DIET STORAGE DEBUG ===");
    } catch (error) {
      console.error('خطا در بارگیری برنامه‌های غذایی از localStorage:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری برنامه‌های غذایی رخ داده است."
      });
      setMeals([]);
    }
  }, [toast]);
  
  // ذخیره برنامه‌های غذایی در localStorage
  const saveMeals = (updatedMeals: Meal[]): boolean => {
    try {
      console.log("Saving meals to localStorage:", updatedMeals);
      localStorage.setItem('meals', JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
      console.log("Meals saved successfully");
      return true;
    } catch (error) {
      console.error('خطا در ذخیره‌سازی برنامه‌های غذایی در localStorage:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه‌های غذایی رخ داده است."
      });
      return false;
    }
  };
  
  return {
    meals,
    setMeals,
    saveMeals
  };
};
