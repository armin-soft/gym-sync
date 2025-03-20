
import { useState, useEffect } from 'react';
import { WeekDay } from '@/types/meal';

interface MealSelectionState {
  [key: string]: number[];
}

const defaultWeekDays: WeekDay[] = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];

export function useMealSelection(initialMeals: { [key in WeekDay]?: number[] } = {}) {
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");
  const [selectedMeals, setSelectedMeals] = useState<MealSelectionState>({});
  
  useEffect(() => {
    // Initialize with empty arrays for all days if not provided
    const initialState: MealSelectionState = {};
    
    defaultWeekDays.forEach(day => {
      initialState[day] = initialMeals[day] || [];
    });
    
    setSelectedMeals(initialState);
  }, [initialMeals]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev => {
      const dayMeals = prev[selectedDay] || [];
      const newDayMeals = dayMeals.includes(mealId)
        ? dayMeals.filter(id => id !== mealId)
        : [...dayMeals, mealId];
      
      return {
        ...prev,
        [selectedDay]: newDayMeals
      };
    });
  };

  const getSelectedMealsForDay = (day: WeekDay) => {
    return selectedMeals[day] || [];
  };
  
  const getCurrentDaySelectedMeals = () => {
    return selectedMeals[selectedDay] || [];
  };
  
  const getAllSelectedMeals = () => {
    return selectedMeals;
  };

  return {
    selectedDay,
    setSelectedDay,
    selectedMeals: getCurrentDaySelectedMeals(),
    toggleMeal,
    getSelectedMealsForDay,
    getAllSelectedMeals
  };
}
