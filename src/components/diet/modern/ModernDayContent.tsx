
import React from "react";
import { ModernMealTypeSection } from "./ModernMealTypeSection";
import { mealTypeOrder } from "../MealTypeUtils";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

interface ModernDayContentProps {
  day: string;
  mealTypes: MealType[];
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
  centered?: boolean;
}

export const ModernDayContent = ({ day, mealTypes, meals, onEdit, onDelete, centered = false }: ModernDayContentProps) => {
  const sortedMealTypes = [...mealTypes].sort((a, b) => mealTypeOrder[a] - mealTypeOrder[b]);
  
  console.log(`ModernDayContent - Day: ${day}, Total meals: ${meals.length}`);
  meals.forEach(meal => {
    console.log(`Meal: ${meal.name}, Type: ${meal.type}, Day: ${meal.day}`);
  });
  
  return (
    <div className="space-y-6">
      {/* Day Header */}
      <div className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/30">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            برنامه غذایی روز {day}
          </h2>
          <p className="text-blue-600 dark:text-blue-400">
            {meals.length > 0 ? `${meals.length} وعده غذایی` : "هیچ وعده‌ای ثبت نشده"}
          </p>
        </div>
      </div>

      {/* Meal Types */}
      {sortedMealTypes.map((type, typeIndex) => {
        const typeMeals = meals.filter(meal => meal.type === type);
        
        return (
          <ModernMealTypeSection
            key={`${day}-${type}`}
            type={type}
            meals={typeMeals}
            day={day}
            onEdit={onEdit}
            onDelete={onDelete}
            typeIndex={typeIndex}
            centered={centered}
          />
        );
      })}
      
      {/* Empty State */}
      {meals.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed className="w-8 h-8 text-gray-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            هنوز برنامه‌ای تنظیم نشده
          </h3>
          
          <p className="text-gray-500 dark:text-gray-400">
            برای روز {day} هیچ وعده غذایی ثبت نشده است
          </p>
        </motion.div>
      )}
    </div>
  );
};
