
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { Meal } from "@/types/meal";
import { getMealTypeStyle } from "../MealTypeUtils";

interface ModernMealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
  index: number;
}

export const ModernMealCard = ({ meal, onEdit, onDelete, index }: ModernMealCardProps) => {
  const styles = getMealTypeStyle(meal.type);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Card 
        className="relative border-0 overflow-hidden h-full bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-gray-800/90 dark:via-gray-800/70 dark:to-gray-800/50 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-blue-500 to-violet-500"></div>
        </div>
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-blue-500/0 to-violet-500/0 group-hover:from-emerald-500/5 group-hover:via-blue-500/5 group-hover:to-violet-500/5 transition-all duration-500" />
        
        {/* Top Border Accent */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500" />
        
        <div className="relative p-6 text-right h-full flex flex-col">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl shadow-md backdrop-blur-sm"
                  onClick={() => onEdit(meal)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500 rounded-xl shadow-md backdrop-blur-sm"
                  onClick={() => onDelete(meal.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
            
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                {meal.name}
              </h4>
              {meal.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {meal.description}
                </p>
              )}
            </div>
          </div>
          
          {/* Nutrition Info */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>وعده {meal.type}</span>
            </div>
            
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
              <div className="grid grid-cols-2 gap-2">
                {meal.calories && (
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Badge variant="outline" className="w-full justify-center bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-700/50 shadow-sm">
                      <TrendingUp className="w-3 h-3 ml-1" />
                      {toPersianNumbers(meal.calories)} کالری
                    </Badge>
                  </motion.div>
                )}
                {meal.protein && (
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Badge variant="outline" className="w-full justify-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-400 border-green-200/50 dark:border-green-700/50 shadow-sm">
                      {toPersianNumbers(meal.protein)}g پروتئین
                    </Badge>
                  </motion.div>
                )}
                {meal.carbs && (
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Badge variant="outline" className="w-full justify-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 shadow-sm">
                      {toPersianNumbers(meal.carbs)}g کربوهیدرات
                    </Badge>
                  </motion.div>
                )}
                {meal.fat && (
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Badge variant="outline" className="w-full justify-center bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 text-red-700 dark:text-red-400 border-red-200/50 dark:border-red-700/50 shadow-sm">
                      {toPersianNumbers(meal.fat)}g چربی
                    </Badge>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
