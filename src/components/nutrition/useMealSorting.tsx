
import { useState, useEffect } from 'react';
import { Meal, MealType, WeekDay } from "@/types/meal";

export const mealTypeOrder: Record<MealType, number> = {
  "صبحانه": 1,
  "میان وعده صبح": 2,
  "ناهار": 3,
  "میان وعده عصر": 4,
  "شام": 5,
  "میان وعده": 6
};

export const dayOrder: Record<WeekDay, number> = {
  "شنبه": 0,
  "یکشنبه": 1,
  "دوشنبه": 2,
  "سه شنبه": 3,
  "چهارشنبه": 4,
  "پنج شنبه": 5,
  "جمعه": 6
};

interface UseMealSortingParams {
  meals: Meal[];
  searchQuery: string;
  activeDay: WeekDay | "all";
  activeMealType: MealType | "all";
  sortOrder: "asc" | "desc";
}

export const useMealSorting = ({
  meals,
  searchQuery,
  activeDay,
  activeMealType,
  sortOrder
}: UseMealSortingParams) => {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);

  useEffect(() => {
    let filtered = [...meals];
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(meal => 
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (meal.description && meal.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply day filter
    if (activeDay !== "all") {
      filtered = filtered.filter(meal => meal.day === activeDay);
    }
    
    // Apply meal type filter
    if (activeMealType !== "all") {
      filtered = filtered.filter(meal => meal.type === activeMealType);
    }

    // Sort the filtered meals
    filtered.sort((a, b) => {
      // First sort by day
      if (a.day && b.day) {
        const dayOrderDiff = dayOrder[a.day] - dayOrder[b.day];
        if (dayOrderDiff !== 0) return dayOrderDiff;
      }

      // Then sort by meal type
      const typeOrderDiff = mealTypeOrder[a.type] - mealTypeOrder[b.type];
      if (typeOrderDiff !== 0) return typeOrderDiff;

      // Finally sort by name
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    
    setFilteredMeals(filtered);
  }, [searchQuery, meals, activeDay, activeMealType, sortOrder]);

  return filteredMeals;
};
