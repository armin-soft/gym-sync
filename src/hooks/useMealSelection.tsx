
import { useState, useEffect } from 'react';

export function useMealSelection(initialMeals: number[] = []) {
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  
  useEffect(() => {
    setSelectedMeals(initialMeals);
  }, [initialMeals]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals((prev) => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId) 
        : [...prev, mealId]
    );
  };

  return {
    selectedMeals,
    toggleMeal
  };
}
