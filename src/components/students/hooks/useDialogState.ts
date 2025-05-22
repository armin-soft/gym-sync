
import { useState } from "react";
import { Student } from "../StudentTypes";

export interface DialogState {
  formDialog: boolean;
  exerciseDialog: boolean;
  dietDialog: boolean;
  supplementDialog: boolean;
  exportDialog: boolean;
  selectedStudent: Student | null;
  isEditing: boolean;
}

export const useDialogState = () => {
  const [state, setState] = useState<DialogState>({
    formDialog: false,
    exerciseDialog: false,
    dietDialog: false,
    supplementDialog: false,
    exportDialog: false,
    selectedStudent: null,
    isEditing: false,
  });

  const setFormDialogOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, formDialog: open }));
  };

  const setExerciseDialogOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, exerciseDialog: open }));
  };

  const setDietDialogOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, dietDialog: open }));
  };

  const setSupplementDialogOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, supplementDialog: open }));
  };

  const setExportDialogOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, exportDialog: open }));
  };

  const setSelectedStudent = (student: Student | null) => {
    setState((prev) => ({ ...prev, selectedStudent: student }));
  };

  const setIsEditing = (isEditing: boolean) => {
    setState((prev) => ({ ...prev, isEditing }));
  };

  return {
    state,
    setFormDialogOpen,
    setExerciseDialogOpen,
    setDietDialogOpen,
    setSupplementDialogOpen,
    setExportDialogOpen,
    setSelectedStudent,
    setIsEditing,
  };
};
