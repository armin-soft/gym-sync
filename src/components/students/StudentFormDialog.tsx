
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Student } from "./StudentTypes";
import { StudentDialogContent } from "./form-components/StudentDialogContent";

interface StudentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  isEditing: boolean;
  onSave: (student: Student) => void;
}

const StudentFormDialog: React.FC<StudentFormDialogProps> = ({
  open,
  onOpenChange,
  student,
  isEditing,
  onSave,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-3xl">
        <StudentDialogContent
          student={student || undefined}
          onSave={(data) => {
            // When we save, we need to ensure we maintain the student ID when editing
            if (student && isEditing) {
              onSave({
                ...data,
                id: student.id // Ensure we maintain the original ID when editing
              });
            } else {
              onSave(data);
            }
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormDialog;
