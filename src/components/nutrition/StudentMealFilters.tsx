
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
      return "bg-gold-100 border-gold-200 text-gold-700 dark:bg-gold-950/40 dark:border-gold-800 dark:text-gold-400";
    case "میان وعده صبح":
      return "bg-bronze-100 border-bronze-200 text-bronze-700 dark:bg-bronze-950/40 dark:border-bronze-800 dark:text-bronze-400";
    case "ناهار":
      return "bg-masculine-100 border-masculine-200 text-masculine-700 dark:bg-masculine-950/40 dark:border-masculine-800 dark:text-masculine-400";
    case "میان وعده عصر":
      return "bg-gold-100 border-gold-200 text-gold-700 dark:bg-gold-950/40 dark:border-gold-800 dark:text-gold-400";
    case "شام":
      return "bg-bronze-100 border-bronze-200 text-bronze-700 dark:bg-bronze-950/40 dark:border-bronze-800 dark:text-bronze-400";
    case "میان وعده شام":
      return "bg-masculine-100 border-masculine-200 text-masculine-700 dark:bg-masculine-950/40 dark:border-masculine-800 dark:text-masculine-400";
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
