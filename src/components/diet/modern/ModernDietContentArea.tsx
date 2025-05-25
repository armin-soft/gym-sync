
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModernDayMeals } from "./ModernDayMeals";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { motion } from "framer-motion";

interface ModernDietContentAreaProps {
  meals: Meal[];
  mealTypes: MealType[];
  selectedDay: WeekDay;
  sortOrder: "asc" | "desc";
  onDayChange: (day: WeekDay) => void;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const ModernDietContentArea = ({
  meals,
  mealTypes,
  selectedDay,
  sortOrder,
  onDayChange,
  onEdit,
  onDelete,
}: ModernDietContentAreaProps) => {
  console.log('ModernDietContentArea - Received meals:', meals.length);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm"
    >
      <ScrollArea className="h-[calc(100vh-300px)] w-full">
        <div className="p-6">
          <ModernDayMeals
            meals={meals}
            mealTypes={mealTypes}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </ScrollArea>
    </motion.div>
  );
};
