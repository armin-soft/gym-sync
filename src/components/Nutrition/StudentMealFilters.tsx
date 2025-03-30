
import React from "react";
import { MealType } from "@/types/meal";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Coffee, Apple, Pizza } from "lucide-react";

interface StudentMealFiltersProps {
  activeMealType: MealType | "all";
  setActiveMealType: (type: MealType | "all") => void;
  sortedMealTypes: MealType[];
}

const StudentMealFilters: React.FC<StudentMealFiltersProps> = ({
  activeMealType,
  setActiveMealType,
  sortedMealTypes
}) => {
  // Map meal types to icons
  const getMealTypeIcon = (type: MealType) => {
    switch (type) {
      case "صبحانه":
        return <Coffee className="h-4 w-4" />;
      case "میان وعده":
        return <Apple className="h-4 w-4" />;
      case "ناهار":
      case "شام":
        return <Pizza className="h-4 w-4" />;
      default:
        return <UtensilsCrossed className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-1 mb-2">
        <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">نوع وعده</span>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={activeMealType === "all" ? "default" : "outline"}
          size="sm"
          className="h-8 rounded-full"
          onClick={() => setActiveMealType("all")}
        >
          همه وعده‌ها
        </Button>
        
        {sortedMealTypes.map(type => (
          <Button
            key={type}
            variant={activeMealType === type ? "default" : "outline"}
            size="sm"
            className="h-8 rounded-full gap-1.5"
            onClick={() => setActiveMealType(type)}
          >
            {getMealTypeIcon(type)}
            <span>{type}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StudentMealFilters;
