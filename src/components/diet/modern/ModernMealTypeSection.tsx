
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModernMealTypeHeader } from "./ModernMealTypeHeader";
import { ModernMealCard } from "./ModernMealCard";
import type { Meal, MealType } from "@/types/meal";

interface ModernMealTypeSectionProps {
  type: MealType;
  meals: Meal[];
  day: string;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
  typeIndex: number;
  centered?: boolean;
}

export const ModernMealTypeSection = ({ type, meals, day, onEdit, onDelete, typeIndex, centered = false }: ModernMealTypeSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: typeIndex * 0.1 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm"
    >
      <ModernMealTypeHeader type={type} count={meals.length} />

      <div className="p-3 sm:p-4">
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
            {meals.map((meal, index) => (
              <ModernMealCard 
                key={`${meal.id}-${index}`}
                meal={meal}
                onEdit={onEdit}
                onDelete={onDelete}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className={cn(
            "py-6 sm:py-8 text-gray-500 dark:text-gray-400",
            "text-right"
          )}>
            <p className="text-sm sm:text-base">هیچ موردی برای {type} در روز {day} یافت نشد</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
