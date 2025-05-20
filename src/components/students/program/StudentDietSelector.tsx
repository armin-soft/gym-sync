
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { Meal, MealType } from "@/types/meal";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { weekDayMap } from "./diet/utils";
import SelectedMealsList from "./diet/SelectedMealsList";
import MealsList from "./diet/MealsList";

interface StudentDietSelectorProps {
  meals: Meal[];
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  currentDay?: number;
  currentMealType?: MealType;
}

const StudentDietSelector: React.FC<StudentDietSelectorProps> = ({
  meals,
  selectedMeals,
  setSelectedMeals,
  currentDay,
  currentMealType
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const currentDayName = currentDay ? weekDayMap[currentDay] : undefined;

  // Filter meals by type if currentMealType is specified
  const displayMeals = currentMealType 
    ? meals.filter(meal => meal.type === currentMealType)
    : meals;

  const toggleMeal = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(prev => prev.filter(id => id !== mealId));
    } else {
      setSelectedMeals(prev => [...prev, mealId]);
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Utensils className="h-4 w-4 text-green-500" />
              غذاهای انتخاب شده ({toPersianNumbers(selectedMeals.length)})
              {currentMealType && <span className="text-sm text-blue-500 mr-1">({currentMealType})</span>}
            </h4>
            
            <SelectedMealsList
              meals={meals}
              selectedMeals={selectedMeals}
              toggleMeal={toggleMeal}
              currentDayName={currentDayName}
              currentMealType={currentMealType}
            />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">
              لیست غذاها
              {currentMealType && <span className="text-sm text-blue-500 mr-2">({currentMealType})</span>}
            </h4>
            
            <MealsList
              meals={displayMeals}
              selectedMeals={selectedMeals}
              toggleMeal={toggleMeal}
              currentDayName={currentDayName}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              currentMealType={currentMealType}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDietSelector;
