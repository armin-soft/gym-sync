
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";

interface DialogState {
  formDialog: boolean;
  selectedStudent: Student | null;
  isEditing: boolean;
}

export const useDialogState = () => {
  const [state, setState] = useState<DialogState>({
    formDialog: false,
    selectedStudent: null,
    isEditing: false
  });

  const setFormDialogOpen = (open: boolean) => {
    setState(prev => ({ ...prev, formDialog: open }));
  };

  const setSelectedStudent = (student: Student | null) => {
    setState(prev => ({ ...prev, selectedStudent: student }));
  };

  const setIsEditing = (isEditing: boolean) => {
    setState(prev => ({ ...prev, isEditing }));
  };

  return {
    state,
    setFormDialogOpen,
    setSelectedStudent,
    setIsEditing
  };
};
