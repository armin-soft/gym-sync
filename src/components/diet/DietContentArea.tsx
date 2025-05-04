
import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DayMeals } from "@/components/diet/DayMeals";
import { MealList } from "@/components/diet/MealList";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { DayTabs } from "./DayTabs";

interface DietContentAreaProps {
  meals: Meal[];
  mealTypes: MealType[];
  selectedDay: WeekDay;
  viewMode: "grid" | "list";
  sortOrder: "asc" | "desc";
  onDayChange: (day: WeekDay) => void;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const DietContentArea = ({
  meals,
  mealTypes,
  selectedDay,
  viewMode,
  sortOrder,
  onDayChange,
  onEdit,
  onDelete,
}: DietContentAreaProps) => {
  // Define all weekdays
  const allWeekDays: WeekDay[] = [
    'شنبه', 
    'یکشنبه', 
    'دوشنبه', 
    'سه‌شنبه', 
    'چهارشنبه', 
    'پنجشنبه', 
    'جمعه'
  ];

  // Get days that have meals
  const daysWithContent = Array.from(new Set(meals.map(meal => meal.day))).filter(Boolean) as WeekDay[];
  
  // Filter meals for the selected day
  const dayMeals = meals.filter((meal) => meal.day === selectedDay);
  
  // Sort meals based on sortOrder
  const sortedMeals = [...dayMeals].sort((a, b) => {
    const typeOrderA = mealTypes.indexOf(a.type);
    const typeOrderB = mealTypes.indexOf(b.type);
    
    // First sort by meal type
    if (typeOrderA !== typeOrderB) {
      return typeOrderA - typeOrderB;
    }
    
    // Then sort by name
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === "asc" ? comparison : -comparison;
  });
  
  // Get the meal time property for list view
  const getListMeals = () => {
    return sortedMeals.map((meal) => ({
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
              weekDays={allWeekDays}
              selectedDay={selectedDay}
              onDayChange={onDayChange}
            >
              {allWeekDays.map((day) => {
                // Filter meals for this specific day
                const daySpecificMeals = meals.filter((meal) => meal.day === day);
                // Sort these meals 
                const sortedDayMeals = [...daySpecificMeals].sort((a, b) => {
                  const typeOrderA = mealTypes.indexOf(a.type);
                  const typeOrderB = mealTypes.indexOf(b.type);
                  if (typeOrderA !== typeOrderB) {
                    return typeOrderA - typeOrderB;
                  }
                  const comparison = a.name.localeCompare(b.name);
                  return sortOrder === "asc" ? comparison : -comparison;
                });

                return (
                  <TabsContent key={day} value={day} className="mt-6">
                    {viewMode === "grid" ? (
                      <div className={daySpecificMeals.length === 0 ? "flex items-center justify-center py-10" : ""}>
                        {daySpecificMeals.length > 0 ? (
                          <DayMeals
                            meals={sortedDayMeals}
                            mealTypes={mealTypes}
                            onEdit={onEdit}
                            onDelete={onDelete}
                          />
                        ) : (
                          <div className="text-muted-foreground text-lg text-center">
                            برای روز {day} برنامه غذایی ثبت نشده است
                          </div>
                        )}
                      </div>
                    ) : (
                      <MealList
                        meals={getListMeals()}
                        onEdit={(listMeal) => {
                          // Find the original meal to edit
                          const originalMeal = sortedDayMeals.find(m => m.id === listMeal.id);
                          if (originalMeal) {
                            onEdit(originalMeal);
                          }
                        }}
                        onDelete={onDelete}
                      />
                    )}
                  </TabsContent>
                );
              })}
            </DayTabs>
          </Tabs>
        </div>
      </ScrollArea>
    </Card>
  );
};
