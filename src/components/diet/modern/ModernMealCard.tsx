
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Clock, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { Meal } from "@/types/meal";

interface ModernMealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
  index: number;
}

export const ModernMealCard = ({ meal, onEdit, onDelete, index }: ModernMealCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white/90 via-white/95 to-gray-50/90 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-900/90 backdrop-blur-sm h-full shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300">
        
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-4 sm:p-5 text-right h-full flex flex-col" dir="rtl">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg transition-all duration-200"
                onClick={() => onEdit(meal)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-all duration-200"
                onClick={() => onDelete(meal.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg text-right leading-tight">
                {meal.name}
              </h4>
              <div className="flex items-center justify-end gap-2 mt-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {meal.type}
                </span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          {meal.description && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-right line-clamp-2 leading-relaxed">
                {meal.description}
              </p>
            </div>
          )}
          
          {/* Nutrition Info */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 justify-end">
              {meal.calories && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-orange-50/80 dark:bg-orange-950/30 border-orange-200/50 dark:border-orange-700/50 text-orange-700 dark:text-orange-300"
                >
                  <Flame className="h-3 w-3 ml-1" />
                  {toPersianNumbers(meal.calories)} کالری
                </Badge>
              )}
              {meal.protein && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-blue-50/80 dark:bg-blue-950/30 border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300"
                >
                  {toPersianNumbers(meal.protein)}g پروتئین
                </Badge>
              )}
              {meal.carbs && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-green-50/80 dark:bg-green-950/30 border-green-200/50 dark:border-green-700/50 text-green-700 dark:text-green-300"
                >
                  {toPersianNumbers(meal.carbs)}g کربوهیدرات
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
