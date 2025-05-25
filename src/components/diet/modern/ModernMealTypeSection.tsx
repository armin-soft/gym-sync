
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModernMealTypeHeader } from "./ModernMealTypeHeader";
import { ModernMealCard } from "./ModernMealCard";
import { getMealTypeStyle } from "../MealTypeUtils";
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
  const styles = getMealTypeStyle(type);
  
  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6
      }
    }
  };
  
  return (
    <motion.div
      variants={item}
      className={cn(
        "group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500",
        "bg-gradient-to-br from-white/90 via-white/70 to-white/50",
        "dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-900/50",
        "border border-white/20 dark:border-gray-700/30",
        "backdrop-blur-xl"
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-blue-500 to-violet-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.2),transparent_50%)]"></div>
      </div>
      
      <ModernMealTypeHeader type={type} count={meals.length} />

      <div className="relative p-6 sm:p-8">
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
            "py-16 text-gray-500 dark:text-gray-400",
            centered ? "text-center" : "text-right"
          )}>
            <div className="max-w-sm mx-auto">
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-2xl">🍽️</span>
              </motion.div>
              
              <p className="text-lg font-medium">
                هیچ موردی برای {type} در روز {day} یافت نشد
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                برای اضافه کردن وعده غذایی جدید، دکمه افزودن را کلیک کنید
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
