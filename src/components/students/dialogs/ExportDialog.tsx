
import React from "react";
import { Student } from "../StudentTypes";
import { ProgramExportDialog } from "../program/components/ProgramExportDialog";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  open,
  onOpenChange,
  selectedStudent,
}) => {
  if (!selectedStudent) return null;

  return (
    <ProgramExportDialog
      isOpen={open}
      onClose={() => onOpenChange(false)}
      student={selectedStudent}
      programType="all"
    />
  );
};
