
import React from "react";
import { ModernMealTypeSection } from "./ModernMealTypeSection";
import { mealTypeOrder } from "../MealTypeUtils";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, Calendar } from "lucide-react";

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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "space-y-8",
        centered ? "text-center" : "text-right"
      )}
    >
      {/* Day Header */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-700/30"
      >
        <div className="flex items-center gap-4 justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              برنامه غذایی روز {day}
            </h2>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {meals.length > 0 ? `${meals.length} وعده غذایی` : "هیچ وعده‌ای ثبت نشده"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Meal Types */}
      {sortedMealTypes.map((type, typeIndex) => {
        const typeMeals = meals.filter(meal => meal.type === type);
        
        return (
          <motion.div key={`${day}-${type}`} variants={itemVariants}>
            <ModernMealTypeSection
              type={type}
              meals={typeMeals}
              day={day}
              onEdit={onEdit}
              onDelete={onDelete}
              typeIndex={typeIndex}
              centered={centered}
            />
          </motion.div>
        );
      })}
      
      {/* Empty State */}
      {meals.length === 0 && (
        <motion.div 
          variants={itemVariants}
          className="text-center py-20 px-8"
        >
          <div className="max-w-md mx-auto">
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <UtensilsCrossed className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              هنوز برنامه‌ای تنظیم نشده
            </h3>
            
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              برای روز <span className="font-semibold text-gray-700 dark:text-gray-300">{day}</span> هیچ وعده غذایی ثبت نشده است. 
              برای شروع، وعده غذایی جدیدی اضافه کنید.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
