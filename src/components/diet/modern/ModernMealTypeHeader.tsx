
import React from "react";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getMealTypeIcon } from "../MealTypeUtils";
import type { MealType } from "@/types/meal";

interface ModernMealTypeHeaderProps {
  type: MealType;
  count: number;
}

export const ModernMealTypeHeader = ({ type, count }: ModernMealTypeHeaderProps) => {
  return (
    <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
            <div className="text-emerald-600 dark:text-emerald-400">
              {getMealTypeIcon(type)}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {type}
            </h3>
          </div>
        </div>
        
        <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
          {toPersianNumbers(count)} مورد
        </Badge>
        
      </div>
    </div>
  );
};
