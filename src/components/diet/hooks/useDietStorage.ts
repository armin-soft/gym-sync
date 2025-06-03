
import { useState, useEffect } from "react";
import { Meal, WeekDay } from "@/types/meal";
import { useToast } from "@/hooks/use-toast";

/**
 * استاندارد کردن روزهای هفته برای جلوگیری از مشکلات تکراری - نسخه اصلاح شده
 */
export const normalizeDay = (day: string): string => {
  if (!day) return '';
  
  // حذف تمام فضاهای خالی و تبدیل به حروف کوچک
  const cleanDay = day.trim().replace(/\s+/g, '').toLowerCase();
  
  // نگاشت برای استاندارد کردن نوشتار روزها
  const dayMap: Record<string, WeekDay> = {
    'شنبه': 'شنبه',
    'یکشنبه': 'یکشنبه',
    'يکشنبه': 'یکشنبه', // یای عربی
    'یک‌شنبه': 'یکشنبه',
    'دوشنبه': 'دوشنبه',
    'دو‌شنبه': 'دوشنبه',
    'سه‌شنبه': 'سه شنبه',
    'سهشنبه': 'سه شنبه',
    'سه‌ شنبه': 'سه شنبه',
    'چهارشنبه': 'چهارشنبه',
    'چهار‌شنبه': 'چهارشنبه',
    'چهار شنبه': 'چهارشنبه',
    'پنج‌شنبه': 'پنج شنبه',
    'پنجشنبه': 'پنج شنبه',
    'جمعه': 'جمعه'
  };
  
  // جستجو در نگاشت
  for (const [variant, standard] of Object.entries(dayMap)) {
    if (variant.replace(/\s+/g, '').toLowerCase() === cleanDay) {
      return standard;
    }
  }
  
  // اگر پیدا نشد، همان مقدار اصلی را برگردان
  return day;
};

export const useDietStorage = () => {
  const { toast } = useToast();
  const [meals, setMeals] = useState<Meal[]>([]);
  
  // بارگذاری برنامه‌های غذایی از localStorage - بدون هیچ داده نمونه
  useEffect(() => {
    try {
      console.log("=== DIET STORAGE DEBUG - LOADING FROM DATABASE ===");
      const savedMeals = localStorage.getItem('meals');
      console.log("Raw saved meals from localStorage:", savedMeals);
      
      if (savedMeals) {
        const parsedMeals = JSON.parse(savedMeals);
        console.log("Parsed meals from database:", parsedMeals);
        console.log("Is array:", Array.isArray(parsedMeals));
        console.log("Meals count in database:", parsedMeals?.length || 0);
        
        const mealsArray = Array.isArray(parsedMeals) ? parsedMeals : [];
        setMeals(mealsArray);
        
        console.log("Loaded meals from database to state:", mealsArray);
      } else {
        console.log("No saved meals found in localStorage - database is empty");
        setMeals([]); // هیچ داده نمونه‌ای نمی‌گذاریم
      }
      console.log("=== END DIET STORAGE DEBUG ===");
    } catch (error) {
      console.error('خطا در بارگیری برنامه‌های غذایی از localStorage:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری برنامه‌های غذایی از دیتابیس محلی رخ داده است."
      });
      setMeals([]); // در صورت خطا، آرایه خالی برمی‌گردانیم
    }
  }, [toast]);
  
  // ذخیره برنامه‌های غذایی در localStorage
  const saveMeals = (updatedMeals: Meal[]): boolean => {
    try {
      console.log("Saving meals to localStorage database:", updatedMeals);
      localStorage.setItem('meals', JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
      console.log("Meals saved successfully to database");
      return true;
    } catch (error) {
      console.error('خطا در ذخیره‌سازی برنامه‌های غذایی در localStorage:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه‌های غذایی در دیتابیس محلی رخ داده است."
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
