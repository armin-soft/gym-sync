
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Meal } from "@/types/meal";

interface UseDietDataReturn {
  meals: Meal[];
  loading: boolean;
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
  addMeal: () => void;
  editMeal: (meal: Meal) => void;
  deleteMeal: (id: number) => void;
}

export const useDietData = (): UseDietDataReturn => {
  const { toast } = useToast();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState("هفته جاری");

  // بارگذاری داده‌ها از localStorage
  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem('gymSync_meals');
      if (savedMeals) {
        const parsedMeals = JSON.parse(savedMeals);
        setMeals(Array.isArray(parsedMeals) ? parsedMeals : []);
      } else {
        // اگر هیچ داده‌ای وجود ندارد، آرایه خالی تنظیم می‌شود
        setMeals([]);
      }
    } catch (error) {
      console.error('خطا در بارگذاری وعده‌های غذایی:', error);
      setMeals([]);
      toast({
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات رخ داده است",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // ذخیره داده‌ها در localStorage
  const saveMeals = (newMeals: Meal[]) => {
    try {
      localStorage.setItem('gymSync_meals', JSON.stringify(newMeals));
      setMeals(newMeals);
    } catch (error) {
      console.error('خطا در ذخیره وعده‌های غذایی:', error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره اطلاعات رخ داده است",
        variant: "destructive"
      });
    }
  };

  const addMeal = () => {
    // در پیاده‌سازی واقعی، اینجا دیالوگ افزودن وعده باز می‌شود
    const newMeal: Meal = {
      id: Date.now(),
      name: "وعده غذایی جدید",
      type: "صبحانه",
      day: "شنبه",
      description: "توضیحات وعده غذایی",
      calories: "300",
      protein: "20",
      carbs: "40",
      fat: "10"
    };

    const updatedMeals = [...meals, newMeal];
    saveMeals(updatedMeals);
    
    toast({
      title: "وعده غذایی اضافه شد",
      description: "وعده غذایی جدید با موفقیت اضافه شد",
    });
  };

  const editMeal = (meal: Meal) => {
    // در پیاده‌سازی واقعی، اینجا دیالوگ ویرایش باز می‌شود
    console.log('ویرایش وعده:', meal);
    toast({
      title: "ویرایش وعده",
      description: `وعده ${meal.name} انتخاب شد`,
    });
  };

  const deleteMeal = (id: number) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    saveMeals(updatedMeals);
    
    toast({
      title: "وعده حذف شد",
      description: "وعده غذایی با موفقیت حذف شد",
    });
  };

  return {
    meals,
    loading,
    selectedWeek,
    setSelectedWeek,
    addMeal,
    editMeal,
    deleteMeal
  };
};
