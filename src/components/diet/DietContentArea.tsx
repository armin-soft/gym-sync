
import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs } from "@/components/ui/tabs";
import { DayMeals } from "@/components/diet/DayMeals";
import { MealList } from "@/components/diet/MealList";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-primary/10 shadow-xl hover:shadow-primary/10 transition-all duration-500 backdrop-blur-sm bg-card/95">
        <ScrollArea className="h-[calc(100vh-200px)] w-full">
          <div className="p-4 sm:p-6">
            {viewMode === "grid" ? (
              <DayMeals
                meals={meals}
                mealTypes={mealTypes}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ) : (
              <MealList
                meals={getListMeals()}
                onEdit={(listMeal) => {
                  // Find the original meal to edit
                  const originalMeal = sortedMeals.find(m => m.id === listMeal.id);
                  if (originalMeal) {
                    onEdit(originalMeal);
                  }
                }}
                onDelete={onDelete}
              />
            )}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  );
};
