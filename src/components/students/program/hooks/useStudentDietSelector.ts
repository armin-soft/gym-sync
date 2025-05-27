
import { useState, useMemo } from "react";
import { Meal } from "@/types/meal";

interface UseStudentDietSelectorProps {
  meals: Meal[];
  currentMealType?: string;
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
}

export const useStudentDietSelector = ({
  meals,
  currentMealType,
  selectedMeals,
  setSelectedMeals
}: UseStudentDietSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter meals based on search and current meal type
  const filteredMeals = useMemo(() => {
    const filtered = meals.filter(meal => {
      const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           meal.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMealType = !currentMealType || currentMealType === "all" || meal.type === currentMealType;
      
      return matchesSearch && matchesMealType;
    });
    
    // Remove duplicates by filtering unique meal IDs
    const uniqueMeals = filtered.filter((meal, index, self) => 
      self.findIndex(m => m.id === meal.id) === index
    );
    
    return uniqueMeals;
  }, [meals, searchQuery, currentMealType]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredMeals,
    toggleMeal
  };
};
