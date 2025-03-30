
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Apple, UtensilsCrossed, Salad, Coffee, Pizza } from "lucide-react";

// Define the MealType type more strictly
export type MealType = "صبحانه" | "میان وعده صبح" | "ناهار" | "میان وعده عصر" | "شام";

interface StudentMealFiltersProps {
  activeMealType: MealType | "all";
  setActiveMealType: (type: MealType | "all") => void;
  sortedMealTypes: MealType[];
}

export const getMealTypeColor = (type: MealType): string => {
  switch (type) {
    case "صبحانه":
      return "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-800";
    case "میان وعده صبح":
      return "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/30 dark:border-orange-800";
    case "ناهار":
      return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800";
    case "میان وعده عصر":
      return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800";
    case "شام":
      return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-800";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800/30 dark:border-gray-700";
  }
};

export const getMealTypeIcon = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return <Coffee className="h-3.5 w-3.5" />;
    case "میان وعده صبح":
      return <Apple className="h-3.5 w-3.5" />;
    case "ناهار":
      return <UtensilsCrossed className="h-3.5 w-3.5" />;
    case "میان وعده عصر":
      return <Apple className="h-3.5 w-3.5" />;
    case "شام":
      return <UtensilsCrossed className="h-3.5 w-3.5" />;
    default:
      return <Salad className="h-3.5 w-3.5" />;
  }
};

const StudentMealFilters: React.FC<StudentMealFiltersProps> = ({
  activeMealType,
  setActiveMealType,
  sortedMealTypes
}) => {
  return (
    <div className="p-4 flex flex-col gap-3" dir="rtl">
      <div>
        <h3 className="text-sm font-medium mb-2 text-foreground text-right">فیلتر بر اساس نوع وعده</h3>
        <div className="flex flex-wrap gap-1.5">
          <Badge 
            variant={activeMealType === "all" ? "default" : "outline"} 
            className="cursor-pointer transition-all hover:bg-primary/10" 
            onClick={() => setActiveMealType("all")}
          >
            همه وعده‌ها
          </Badge>
          {sortedMealTypes.map(type => (
            <Badge 
              key={type} 
              variant={activeMealType === type ? "default" : "outline"} 
              className={`cursor-pointer transition-all hover:bg-primary/10 flex gap-1 items-center ${activeMealType === type ? '' : getMealTypeColor(type).split(' ')[0]}`} 
              onClick={() => setActiveMealType(type)}
            >
              {getMealTypeIcon(type)}
              <span>{type}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentMealFilters;
