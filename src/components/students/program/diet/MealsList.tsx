
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Meal, MealType } from "@/types/meal";
import MealTypeGroup from "./MealTypeGroup";

interface MealsListProps {
  meals: Meal[];
  selectedMeals: number[];
  toggleMeal: (mealId: number) => void;
  currentDayName?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MealsList: React.FC<MealsListProps> = ({
  meals,
  selectedMeals,
  toggleMeal,
  currentDayName,
  searchQuery,
  setSearchQuery
}) => {
  // Filter meals by search query
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = searchQuery.trim() === "" || 
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (meal.category && meal.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (meal.type && meal.type.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });
  
  // Sort meals to prioritize meals tagged for the current day
  const sortedMeals = [...filteredMeals].sort((a, b) => {
    // If meal is tagged for current day, prioritize it
    if (a.day === currentDayName && b.day !== currentDayName) return -1;
    if (a.day !== currentDayName && b.day === currentDayName) return 1;
    
    // If both or neither are tagged for current day, sort by meal type
    const mealTypeOrder = {
      "صبحانه": 1,
      "میان وعده صبح": 2,
      "ناهار": 3, 
      "میان وعده عصر": 4,
      "شام": 5,
      "میان وعده": 6
    };
    
    return (mealTypeOrder[a.type] || 99) - (mealTypeOrder[b.type] || 99);
  });

  // Group meals by type for better organization
  const mealsByType: Record<MealType, Meal[]> = {
    "صبحانه": [],
    "میان وعده صبح": [],
    "ناهار": [],
    "میان وعده عصر": [],
    "شام": [],
    "میان وعده": []
  };

  sortedMeals.forEach(meal => {
    // Create a clean version of the meal with description removed
    const cleanMeal = {
      ...meal,
      description: "" // Remove all descriptions/comments
    };
    
    if (cleanMeal.type) {
      mealsByType[cleanMeal.type].push(cleanMeal);
    } else {
      mealsByType["میان وعده"].push(cleanMeal);
    }
  });

  return (
    <>
      <Input
        placeholder="جستجوی غذا..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-3"
      />
      
      <ScrollArea className="h-[300px] pr-4">
        {Object.entries(mealsByType).map(([type, typeMeals]) => (
          <MealTypeGroup
            key={type}
            typeName={type}
            meals={typeMeals}
            selectedMeals={selectedMeals}
            toggleMeal={toggleMeal}
            currentDayName={currentDayName}
          />
        ))}
        
        {Object.values(mealsByType).every(meals => meals.length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500">هیچ غذایی با این جستجو یافت نشد</p>
          </div>
        )}
      </ScrollArea>
    </>
  );
};

export default MealsList;
