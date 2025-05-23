
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { StudentDialogManager } from "@/components/students/StudentDialogManager";

interface StudentsDialogSectionProps {
  dialogRef: React.RefObject<any>;
  onSave: (data: any, selectedStudent?: Student) => boolean;
}

export const StudentsDialogSection: React.FC<StudentsDialogSectionProps> = ({
  dialogRef,
  onSave
}) => {
  return (
    <StudentDialogManager
      ref={dialogRef}
      onSave={onSave}
    />
  );
};
