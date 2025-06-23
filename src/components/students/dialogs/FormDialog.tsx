
import React from "react";
import { Student } from "../StudentTypes";
import { StudentFormDialog } from "../modern/StudentFormDialog";
import { StudentFormValues } from "@/lib/validations/student";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  isEditing: boolean;
  onSave: (data: StudentFormValues, selectedStudent?: Student | null) => void;
}

export const FormDialog: React.FC<FormDialogProps> = ({
  open,
  onOpenChange,
  selectedStudent,
  isEditing,
  onSave,
}) => {
  return (
    <StudentFormDialog
      open={open}
      onOpenChange={onOpenChange}
      student={selectedStudent}
      isEditing={isEditing}
      onSave={(data) => {
        onSave(data, selectedStudent);
        onOpenChange(false);
      }}
    />
  );
};
