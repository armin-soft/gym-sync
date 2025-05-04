
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { DayContent } from "./DayContent";

interface DayMealsProps {
  meals: Meal[];
  mealTypes: MealType[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  const deviceInfo = useDeviceInfo();
  
  // Group meals by type for the current day
  const mealsByType: Record<MealType, Meal[]> = {} as Record<MealType, Meal[]>;
  
  mealTypes.forEach(type => {
    mealsByType[type] = meals.filter(meal => meal.type === type);
  });
  
  return (
    <div dir="rtl">
      <ScrollArea className="w-full">
        <div className="space-y-4 sm:space-y-6">
          {mealTypes.map((type, index) => (
            mealsByType[type].length > 0 ? (
              <DayContent
                key={type}
                day={mealsByType[type][0].day || ""}
                mealTypes={[type]}
                meals={mealsByType[type]}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ) : null
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
