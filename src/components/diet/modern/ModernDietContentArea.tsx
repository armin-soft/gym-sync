
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10"
    >
      <ScrollArea className="h-[calc(100vh-400px)] w-full">
        <div className="p-8">
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
