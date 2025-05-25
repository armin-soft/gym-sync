
import React from "react";
import { ContextMenuItem } from "./ContextMenuItem";
import { Student } from "@/components/students/StudentTypes";
import { Dumbbell, Utensils, Pill, Edit, Trash2 } from "lucide-react";

interface ContextMenuSectionProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
}

export const ContextMenuSection: React.FC<ContextMenuSectionProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
}) => {
  return (
    <div className="py-1">
      <ContextMenuItem
        icon={Dumbbell}
        label="برنامه تمرینی"
        onClick={() => onAddExercise(student)}
        variant="primary"
      />
      <ContextMenuItem
        icon={Utensils}
        label="برنامه غذایی"
        onClick={() => onAddDiet(student)}
        variant="secondary"
      />
      <ContextMenuItem
        icon={Pill}
        label="مکمل و ویتامین"
        onClick={() => onAddSupplement(student)}
        variant="tertiary"
      />
      <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
      <ContextMenuItem
        icon={Edit}
        label="ویرایش"
        onClick={() => onEdit(student)}
        variant="neutral"
      />
      <ContextMenuItem
        icon={Trash2}
        label="حذف"
        onClick={() => onDelete(student.id)}
        variant="danger"
      />
    </div>
  );
};
