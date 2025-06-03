
import { useState, useEffect } from 'react';
import { Meal } from '../types';
import { useToast } from '@/hooks/use-toast';

export const useMealManagement = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // بارگذاری وعده‌های غذایی از localStorage
  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        const parsedMeals = JSON.parse(savedMeals);
        setMeals(Array.isArray(parsedMeals) ? parsedMeals : []);
      }
    } catch (error) {
      console.error('خطا در بارگذاری وعده‌های غذایی:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // حذف وعده غذایی
  const deleteMeal = (id: number) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    setMeals(updatedMeals);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
    
    toast({
      title: "حذف موفق",
      description: "وعده غذایی با موفقیت حذف شد"
    });
  };

  // افزودن یا ویرایش وعده غذایی
  const saveMeal = (mealData: Omit<Meal, 'id'>, editingMeal?: Meal) => {
    if (editingMeal) {
      // ویرایش
      const updatedMeals = meals.map(meal => 
        meal.id === editingMeal.id ? { ...mealData, id: editingMeal.id } : meal
      );
      setMeals(updatedMeals);
      localStorage.setItem('meals', JSON.stringify(updatedMeals));
    } else {
      // افزودن جدید
      const newMeal = {
        ...mealData,
        id: Math.max(0, ...meals.map(m => m.id)) + 1
      };
      const updatedMeals = [...meals, newMeal];
      setMeals(updatedMeals);
      localStorage.setItem('meals', JSON.stringify(updatedMeals));
    }
  };

  return {
    meals,
    loading,
    deleteMeal,
    saveMeal
  };
};
