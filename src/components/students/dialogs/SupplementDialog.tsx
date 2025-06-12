
import React from "react";
import { Student } from "../StudentTypes";
import { StudentSupplementDialog } from "@/components/supplements/student/SupplementDialog";

interface SupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  onSaveSupplements?: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
}

export const SupplementDialog: React.FC<SupplementDialogProps> = ({
  open,
  onOpenChange,
  selectedStudent,
  onSaveSupplements,
}) => {
  if (!selectedStudent || !onSaveSupplements) return null;

  const initialSupplements = selectedStudent.supplements || [];
  const initialVitamins = selectedStudent.vitamins || [];

  return (
    <StudentSupplementDialog
      open={open}
      onOpenChange={onOpenChange}
      studentName={selectedStudent.name}
      onSave={(data) => {
        return onSaveSupplements(data, selectedStudent.id);
      }}
      supplements={[]} // Pass empty array as supplements will be loaded from localStorage
      initialSupplements={initialSupplements}
      initialVitamins={initialVitamins}
    />
  );
};
