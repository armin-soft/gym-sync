
import React from "react";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getMealTypeIcon } from "../MealTypeUtils";
import type { MealType } from "@/types/meal";
import { motion } from "framer-motion";

interface ModernMealTypeHeaderProps {
  type: MealType;
  count: number;
}

export const ModernMealTypeHeader = ({ type, count }: ModernMealTypeHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-5 bg-gradient-to-r from-gray-50/80 via-white/90 to-blue-50/80 dark:from-gray-800/80 dark:via-gray-800/90 dark:to-blue-950/80 backdrop-blur-sm border-b border-gray-200/30 dark:border-gray-700/30"
    >
      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <motion.div 
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30"
          >
            <div className="text-white text-lg">
              {getMealTypeIcon(type)}
            </div>
          </motion.div>
          
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              {type}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              وعده‌های غذایی این بخش
            </p>
          </div>
        </div>
        
        <Badge 
          variant="outline" 
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 px-3 py-1 text-sm font-medium"
        >
          {toPersianNumbers(count)} مورد
        </Badge>
        
      </div>
    </motion.div>
  );
};
