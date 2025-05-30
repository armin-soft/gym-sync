
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Coffee, Utensils } from "lucide-react";
import { MealType } from "@/types/meal";
import { cn } from "@/lib/utils";

interface StudentMealFiltersProps {
  selectedType: MealType | null;
  onSelectType: (type: MealType | null) => void;
}

// Helper functions that need to be exported
export const getMealTypeColor = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-400";
    case "میان وعده صبح":
      return "bg-teal-100 border-teal-200 text-teal-700 dark:bg-teal-950/40 dark:border-teal-800 dark:text-teal-400";
    case "ناهار":
      return "bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400";
    case "میان وعده عصر":
      return "bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-950/40 dark:border-purple-800 dark:text-purple-400";
    case "شام":
      return "bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-400";
    case "میان وعده شام":
      return "bg-green-100 border-green-200 text-green-700 dark:bg-green-950/40 dark:border-green-800 dark:text-green-400";
    default:
      return "bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-800/40 dark:border-gray-700 dark:text-gray-400";
  }
};

export const getMealTypeIcon = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return <Coffee className="h-4 w-4 mr-1.5" />;
    case "میان وعده صبح":
      return <Coffee className="h-4 w-4 mr-1.5" />;
    case "ناهار":
      return <Utensils className="h-4 w-4 mr-1.5" />;
    case "میان وعده عصر":
      return <Coffee className="h-4 w-4 mr-1.5" />;
    case "شام":
      return <Utensils className="h-4 w-4 mr-1.5" />;
    case "میان وعده شام":
      return <Coffee className="h-4 w-4 mr-1.5" />;
    default:
      return <Coffee className="h-4 w-4 mr-1.5" />;
  }
};

export const StudentMealFilters: React.FC<StudentMealFiltersProps> = ({
  selectedType,
  onSelectType,
}) => {
  const mealTypes: MealType[] = ["صبحانه", "میان وعده صبح", "ناهار", "میان وعده عصر", "شام", "میان وعده شام"];

  return (
    <div className="flex flex-wrap gap-1.5 pb-3">
      {mealTypes.map((type) => (
        <Button
          key={type}
          variant="outline"
          size="sm"
          className={cn(
            "h-9 border px-3 text-xs font-medium rounded-full transition-all",
            selectedType === type
              ? getMealTypeColor(type)
              : "hover:bg-gray-50 dark:hover:bg-gray-800/60"
          )}
          onClick={() => onSelectType(selectedType === type ? null : type)}
        >
          <span className="flex items-center">
            {getMealTypeIcon(type)}
            <span>{type}</span>
            {selectedType === type && (
              <Check className="ml-1.5 h-3.5 w-3.5" />
            )}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default StudentMealFilters;
