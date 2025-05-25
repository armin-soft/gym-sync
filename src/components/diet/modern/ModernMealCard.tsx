
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className="border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 h-full">
        <div className="p-4 text-right h-full flex flex-col">
          
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400"
                onClick={() => onEdit(meal)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
                onClick={() => onDelete(meal.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            <h4 className="font-medium text-gray-900 dark:text-white">
              {meal.name}
            </h4>
          </div>
          
          {meal.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {meal.description}
            </p>
          )}
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1 justify-end">
              {meal.calories && (
                <Badge variant="outline" className="text-xs">
                  {toPersianNumbers(meal.calories)} کالری
                </Badge>
              )}
              {meal.protein && (
                <Badge variant="outline" className="text-xs">
                  {toPersianNumbers(meal.protein)}g پروتئین
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
