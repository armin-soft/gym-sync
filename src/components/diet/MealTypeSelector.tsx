
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { MealType } from "./types";

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
    <div className={cn("rounded-lg sm:rounded-xl p-3 sm:p-4 border-2", mealType.color)}>
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
          <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold">
            {mealType.name}
          </h3>
          <Badge variant="secondary" className="text-2xs sm:text-xs">
            {toPersianNumbers(meals.length)} وعده
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {children}
      </div>
    </div>
  );
};
