
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Utensils } from "lucide-react";
import { Meal } from "@/types/meal";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SelectedMealsListProps {
  meals: Meal[];
  selectedMeals: number[];
  toggleMeal: (mealId: number) => void;
  currentDayName?: string;
}

const SelectedMealsList: React.FC<SelectedMealsListProps> = ({
  meals,
  selectedMeals,
  toggleMeal,
  currentDayName
}) => {
  return (
    <ScrollArea className="h-[300px] pr-4">
      {selectedMeals.length === 0 ? (
        <div className="text-center p-6 text-muted-foreground">
          هنوز غذایی برای روز {currentDayName} انتخاب نشده است.
        </div>
      ) : (
        <div className="space-y-3">
          {selectedMeals.map(mealId => {
            const mealInfo = meals.find(m => m.id === mealId);
            if (!mealInfo) return null;
            
            return (
              <div key={mealId} className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{mealInfo.name}</div>
                    <div className="flex gap-2 mt-1">
                      {mealInfo.type && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          {mealInfo.type}
                        </Badge>
                      )}
                      {mealInfo.day && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {mealInfo.day}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    onClick={() => toggleMeal(mealId)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
                
                {mealInfo.description && (
                  <div className="mt-2 text-sm text-slate-600">
                    {mealInfo.description}
                  </div>
                )}
                
                {(mealInfo.calories || mealInfo.protein || mealInfo.carbs || mealInfo.fat) && (
                  <div className="flex gap-2 mt-2 text-xs text-slate-500">
                    {mealInfo.calories && <span>{toPersianNumbers(mealInfo.calories)} کالری</span>}
                    {mealInfo.protein && <span>{toPersianNumbers(mealInfo.protein)} پروتئین</span>}
                    {mealInfo.carbs && <span>{toPersianNumbers(mealInfo.carbs)} کربوهیدرات</span>}
                    {mealInfo.fat && <span>{toPersianNumbers(mealInfo.fat)} چربی</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </ScrollArea>
  );
};

export default SelectedMealsList;
