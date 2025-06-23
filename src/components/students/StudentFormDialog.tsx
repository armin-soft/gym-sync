
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, VisuallyHidden } from "@/components/ui/dialog";
import { Student } from "./StudentTypes";
import { StudentForm } from "./StudentForm";

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="student-form-description">
        <VisuallyHidden>
          <DialogTitle>
            {student && isEditing ? "ویرایش شاگرد" : "افزودن شاگرد جدید"}
          </DialogTitle>
          <DialogDescription id="student-form-description">
            {student && isEditing 
              ? `ویرایش اطلاعات شاگرد ${student.name}`
              : "فرم افزودن شاگرد جدید به سیستم"
            }
          </DialogDescription>
        </VisuallyHidden>
        <StudentForm
          student={student || undefined}
          onSave={(data) => {
            if (student && isEditing) {
              onSave({
                ...data,
                id: student.id
              });
            } else {
              onSave(data);
            }
          }}
          onCancel={() => onOpenChange(false)}
          isDialog={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormDialog;
