
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
      } else {
        console.log("No saved meals found in localStorage, checking existing data...");
        
        // بررسی اگر اطلاعاتی در localStorage وجود دارد ولی با کلید دیگری
        const allKeys = Object.keys(localStorage);
        console.log("All localStorage keys:", allKeys);
        
        // جستجو برای هر کلیدی که ممکن است حاوی داده‌های غذایی باشد
        const possibleKeys = allKeys.filter(key => 
          key.toLowerCase().includes('meal') || 
          key.toLowerCase().includes('diet') || 
          key.toLowerCase().includes('food')
        );
        
        console.log("Possible meal keys found:", possibleKeys);
        
        if (possibleKeys.length > 0) {
          // تلاش برای بارگذاری از اولین کلید احتمالی
          const testData = localStorage.getItem(possibleKeys[0]);
          if (testData) {
            try {
              const testParsed = JSON.parse(testData);
              if (Array.isArray(testParsed) && testParsed.length > 0) {
                console.log("Found meals in alternative key:", possibleKeys[0]);
                setMeals(testParsed);
                // ذخیره در کلید صحیح
                localStorage.setItem('meals', testData);
                return;
              }
            } catch (e) {
              console.log("Failed to parse data from", possibleKeys[0]);
            }
          }
        }
        
        // اگر هیچ داده‌ای یافت نشد، مقادیر نمونه ایجاد کن
        console.log("Creating sample meals data...");
        const sampleMeals: Meal[] = [
          {
            id: 1,
            name: "املت با نان سبوس‌دار",
            type: "صبحانه",
            day: "شنبه",
            description: "همراه با چای یا قهوه"
          },
          {
            id: 2,
            name: "موز و بادام",
            type: "میان وعده صبح",
            day: "شنبه",
            description: "منبع انرژی و پروتئین"
          },
          {
            id: 3,
            name: "مرغ گریل شده با برنج قهوه‌ای و سبزیجات",
            type: "ناهار",
            day: "شنبه",
            description: "غذای سالم و مغذی"
          }
        ];
        
        localStorage.setItem('meals', JSON.stringify(sampleMeals));
        setMeals(sampleMeals);
        console.log("Sample meals created and saved");
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
