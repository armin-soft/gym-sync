
import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs } from "@/components/ui/tabs";
import { DayMeals } from "@/components/diet/DayMeals";
import { MealList } from "@/components/diet/MealList";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { DayTabs } from "./DayTabs";

interface DietContentAreaProps {
  meals: Meal[];
  mealTypes: MealType[];
  selectedDay: WeekDay;
  viewMode: "grid" | "list";
  onDayChange: (day: WeekDay) => void;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const DietContentArea = ({
  meals,
  mealTypes,
  selectedDay,
  viewMode,
  onDayChange,
  onEdit,
  onDelete,
}: DietContentAreaProps) => {
  // Filter meals for the selected day
  const dayMeals = meals.filter((meal) => meal.day === selectedDay);
  
  // Get the meal time property for list view
  const getListMeals = () => {
    return dayMeals.map((meal) => ({
      id: meal.id,
      name: meal.name,
      time: meal.type,
      calories: meal.calories ? Number(meal.calories) : 0,
      protein: meal.protein ? Number(meal.protein) : 0,
      carbs: meal.carbs ? Number(meal.carbs) : 0,
      fat: meal.fat ? Number(meal.fat) : 0,
      description: meal.description || "",
    }));
  };

  return (
    <Card className="overflow-hidden border-primary/10 shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 h-[calc(100vh-180px)]">
      <ScrollArea className="h-full w-full">
        <div className="p-6">
          <Tabs defaultValue={selectedDay} value={selectedDay} className="w-full">
            <DayTabs
              weekDays={mealTypes.length > 0 ? mealTypes.map(() => selectedDay).filter((v, i, a) => a.indexOf(v) === i) : []}
              selectedDay={selectedDay}
              onDayChange={onDayChange}
            />
              
            <div className="mt-6">
              {viewMode === "grid" ? (
                <DayMeals
                  meals={dayMeals}
                  mealTypes={mealTypes}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ) : (
                <MealList
                  meals={getListMeals()}
                  onEdit={(listMeal) => {
                    // Find the original meal to edit
                    const originalMeal = dayMeals.find(m => m.id === listMeal.id);
                    if (originalMeal) {
                      onEdit(originalMeal);
                    }
                  }}
                  onDelete={onDelete}
                />
              )}
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </Card>
  );
};
