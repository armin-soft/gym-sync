
import React from "react";
import { Card } from "@/components/ui/card";
import { DayMeals } from "@/components/diet/DayMeals";
import { Meal, MealType, WeekDay } from "@/types/meal";

interface DietContentAreaProps {
  meals: Meal[];
  mealTypes: MealType[];
  selectedDay: WeekDay;
  sortOrder: "asc" | "desc";
  onDayChange: (day: WeekDay) => void;
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

export const DietContentArea = ({
  meals,
  mealTypes,
  onEdit,
  onDelete,
}: DietContentAreaProps) => {
  return (
    <Card className="h-full p-6 overflow-auto">
      <DayMeals
        meals={meals}
        mealTypes={mealTypes}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Card>
  );
};
