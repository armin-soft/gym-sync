
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MealType } from "@/types/meal";

interface SelectedMealsListProps {
  meals: any[];
  selectedMeals: number[];
  toggleMeal: (mealId: number) => void;
  currentDayName?: string;
  currentMealType?: MealType;
}

const SelectedMealsList: React.FC<SelectedMealsListProps> = ({
  meals,
  selectedMeals,
  toggleMeal,
  currentDayName,
  currentMealType
}) => {
  // Get selected meals details
  const selectedMealDetails = meals.filter(meal => selectedMeals.includes(meal.id));
  
  // Filter by current meal type if specified
  const filteredMeals = currentMealType
    ? selectedMealDetails.filter(meal => meal.type === currentMealType)
    : selectedMealDetails;

  if (selectedMeals.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-400">هیچ غذایی انتخاب نشده است</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-64 pr-3">
      <div className="space-y-2">
        {filteredMeals.map(meal => (
          <div 
            key={meal.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border",
              currentDayName && meal.day === currentDayName 
                ? "bg-green-50 border-green-200" 
                : "bg-white"
            )}
          >
            <div>
              <div className="font-medium">{meal.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {meal.type}
                {meal.day && ` - ${meal.day}`}
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full" 
              onClick={() => toggleMeal(meal.id)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">حذف</span>
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SelectedMealsList;
