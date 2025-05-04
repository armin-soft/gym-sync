
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DayMeals } from "@/components/diet/DayMeals";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { motion } from "framer-motion";

interface DietContentAreaProps {
  meals: Meal[];
  mealTypes: MealType[];
  selectedDay: WeekDay;
  sortOrder: "asc" | "desc";
  onDayChange: (day: WeekDay) => void;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const DietContentArea = ({
  meals,
  mealTypes,
  selectedDay,
  sortOrder,
  onDayChange,
  onEdit,
  onDelete,
}: DietContentAreaProps) => {
  // تعریف همه روزهای هفته
  const allWeekDays: WeekDay[] = [
    'شنبه', 
    'یکشنبه', 
    'دوشنبه', 
    'سه شنبه', 
    'چهارشنبه', 
    'پنج شنبه', 
    'جمعه'
  ];

  // دریافت روزهای دارای محتوا
  const daysWithContent = Array.from(new Set(meals.map(meal => meal.day))).filter(Boolean) as WeekDay[];
  
  // اطلاعات دیباگ
  useEffect(() => {
    console.log("DietContentArea meals:", meals);
    console.log("Days with content:", daysWithContent);
    
    // بررسی دقیق تر وعده های غذایی هر روز
    allWeekDays.forEach(day => {
      const dayMeals = meals.filter(meal => meal.day === day);
      console.log(`Day ${day} has ${dayMeals.length} meals`);
    });
  }, [meals]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-primary/10 shadow-xl hover:shadow-primary/10 transition-all duration-500 backdrop-blur-sm bg-card/95">
        <ScrollArea className="h-[calc(100vh-200px)] w-full">
          <div className="p-4 sm:p-6">
            <DayMeals
              meals={meals}
              mealTypes={mealTypes}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  );
};
