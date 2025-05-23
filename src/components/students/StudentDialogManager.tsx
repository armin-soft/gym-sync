
import React, { useImperativeHandle, forwardRef } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useDialogState } from "./hooks/useDialogState";
import { FormDialog } from "./dialogs";

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
}

interface StudentDialogManagerProps {
  onSave: (student: Student, selectedStudent?: Student) => void;
}

export const StudentDialogManager = forwardRef<StudentDialogManagerRef, StudentDialogManagerProps>(
  ({ onSave }, ref) => {
    const {
      state,
      setFormDialogOpen,
      setSelectedStudent,
      setIsEditing
    } = useDialogState();

    useImperativeHandle(ref, () => ({
      handleAdd: () => {
        setSelectedStudent(null);
        setIsEditing(false);
        setFormDialogOpen(true);
      },
      handleEdit: (student) => {
        setSelectedStudent(student);
        setIsEditing(true);
        setFormDialogOpen(true);
      }
    }));

    return (
      <>
        <FormDialog
          open={state.formDialog}
          onOpenChange={setFormDialogOpen}
          selectedStudent={state.selectedStudent}
          isEditing={state.isEditing}
          onSave={onSave}
        />
      </>
    );
  }
);

StudentDialogManager.displayName = "StudentDialogManager";
