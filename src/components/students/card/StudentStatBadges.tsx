
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, UtensilsCrossed, Pill } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentStatBadgesProps {
  exercises?: number[];
  meals?: number[];
  supplements?: number[];
}

export const StudentStatBadges: React.FC<StudentStatBadgesProps> = ({
  exercises,
  meals,
  supplements
}) => {
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {exercises && exercises.length > 0 && (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <Dumbbell className="mr-1 h-3 w-3" />
          <span>{toPersianNumbers(exercises.length)} تمرین</span>
        </Badge>
      )}
      
      {meals && meals.length > 0 && (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <UtensilsCrossed className="mr-1 h-3 w-3" />
          <span>{toPersianNumbers(meals.length)} وعده</span>
        </Badge>
      )}
      
      {supplements && supplements.length > 0 && (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <Pill className="mr-1 h-3 w-3" />
          <span>{toPersianNumbers(supplements.length)} مکمل</span>
        </Badge>
      )}
    </div>
  );
};
