
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, Clock, User } from "lucide-react";
import { Meal } from "./types";

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
  index: number;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  onEdit,
  onDelete,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100/20 dark:hover:shadow-emerald-900/20">
        <CardContent className="p-0">
          {/* هدر کارت */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">
                {meal.name}
              </h4>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(meal)}
                  className="h-7 w-7 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(meal.id)}
                  className="h-7 w-7 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* محتوای کارت */}
          <div className="p-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3" />
              <span>{meal.type}</span>
              {meal.day && (
                <>
                  <span>•</span>
                  <span>{meal.day}</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
