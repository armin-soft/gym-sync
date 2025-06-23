
import React, { forwardRef, useImperativeHandle } from "react";
import { StudentFormDialog } from "./StudentFormDialog";
import { useDialogState } from "../hooks/useDialogState";
import { Student } from "../StudentTypes";
import { StudentFormValues } from "@/lib/validations/student";

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
}

interface StudentDialogManagerProps {
  onSave: (data: StudentFormValues, student?: Student | null) => void;
  onSaveExercises?: (student: Student, exercises: any[]) => void;
  onSaveDiet?: (student: Student, meals: any[]) => void;
  onSaveSupplements?: (student: Student, supplements: any[]) => void;
  exercises?: any[];
  meals?: any[];
  supplements?: any[];
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
      handleEdit: (student: Student) => {
        setSelectedStudent(student);
        setIsEditing(true);
        setFormDialogOpen(true);
      },
    }));

    const handleSaveStudent = (data: StudentFormValues) => {
      onSave(data, state.selectedStudent);
      setFormDialogOpen(false);
    };

    return (
      <>
        <StudentFormDialog
          open={state.formDialog}
          onOpenChange={setFormDialogOpen}
          student={state.selectedStudent}
          isEditing={state.isEditing}
          onSave={handleSaveStudent}
        />
      </>
    );
  }
);

StudentDialogManager.displayName = "StudentDialogManager";
