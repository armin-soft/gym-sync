
import React from "react";
import { MealFormDialog } from "./meal-form/MealFormDialog";
import type { Meal, MealType, WeekDay } from "@/types/meal";

interface MealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Meal, "id">, mealId?: number) => boolean;
  meal?: Meal;
  mealTypes: MealType[];
  weekDays: WeekDay[];
}

export const MealDialog = ({
  open,
  onOpenChange,
  onSave,
  meal,
  mealTypes,
  weekDays,
}: MealDialogProps) => {
  return (
    <MealFormDialog
      open={open}
      onOpenChange={onOpenChange}
      onSave={onSave}
      meal={meal}
      mealTypes={mealTypes}
      weekDays={weekDays}
    />
  );
};
