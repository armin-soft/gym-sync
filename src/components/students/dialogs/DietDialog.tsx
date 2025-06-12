
import React from "react";
import { Student } from "../StudentTypes";
import StudentMealDialog from "@/components/nutrition/StudentMealDialog";

interface DietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  onSaveDiet?: (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
}

export const DietDialog: React.FC<DietDialogProps> = ({
  open,
  onOpenChange,
  selectedStudent,
  onSaveDiet,
}) => {
  if (!selectedStudent || !onSaveDiet) return null;

  const initialMeals = selectedStudent.meals || [];

  return (
    <StudentMealDialog
      open={open}
      onOpenChange={onOpenChange}
      studentName={selectedStudent.name}
      onSave={(mealIds) => {
        return onSaveDiet(mealIds, selectedStudent.id);
      }}
      initialMeals={initialMeals}
    />
  );
};
