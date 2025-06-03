
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { MealType } from "./types";
import { motion } from "framer-motion";

interface MealTypeSelectorProps {
  mealType: MealType;
  meals: any[];
  children: React.ReactNode;
}

export const MealTypeSelector: React.FC<MealTypeSelectorProps> = ({
  mealType,
  meals,
  children
}) => {
  if (meals.length === 0) return null;

  const IconComponent = mealType.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden"
    >
      {/* هدر بخش */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 py-3 border-b border-gray-200/50 dark:border-gray-600/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">
              {mealType.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                {toPersianNumbers(meals.length)} وعده
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* محتوای وعده‌ها */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
