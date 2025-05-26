
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

  // Further filter by current day if specified
  const dayFilteredMeals = currentDayName
    ? displayMeals.filter(meal => !meal.day || meal.day === currentDayName)
    : displayMeals;

  const toggleMeal = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(prev => prev.filter(id => id !== mealId));
    } else {
      setSelectedMeals(prev => [...prev, mealId]);
    }
  };

  // If no day is selected, show a message
  if (!currentDay) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 text-right" dir="rtl">
        <Utensils className="h-16 w-16 text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg text-right">لطفا یک روز از هفته را انتخاب کنید</p>
        <p className="text-gray-400 text-sm mt-2 text-right">برای مشاهده و انتخاب وعده‌های غذایی، ابتدا روز مورد نظر را انتخاب کنید</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-right" dir="rtl">
        <Card className="shadow-sm text-right" dir="rtl">
          <CardContent className="p-4 text-right" dir="rtl">
            <h4 className="font-medium mb-3 flex items-center gap-2 text-right justify-start" dir="rtl">
              <Utensils className="h-4 w-4 text-green-500" />
              <span className="text-right">غذاهای انتخاب شده ({toPersianNumbers(selectedMeals.length)})</span>
              {currentMealType && <span className="text-sm text-blue-500 mr-1">({currentMealType})</span>}
            </h4>
            
            <div className="text-right" dir="rtl">
              <SelectedMealsList
                meals={meals}
                selectedMeals={selectedMeals}
                toggleMeal={toggleMeal}
                currentDayName={currentDayName}
                currentMealType={currentMealType}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm text-right" dir="rtl">
          <CardContent className="p-4 text-right" dir="rtl">
            <h4 className="font-medium mb-3 text-right">
              لیست غذاها
              {currentMealType && <span className="text-sm text-blue-500 mr-2">({currentMealType})</span>}
            </h4>
            
            <div className="text-right" dir="rtl">
              <MealsList
                meals={dayFilteredMeals}
                selectedMeals={selectedMeals}
                toggleMeal={toggleMeal}
                currentDayName={currentDayName}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                currentMealType={currentMealType}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDietSelector;
