
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, VisuallyHidden } from "@/components/ui/dialog";
import { Student } from "./StudentTypes";
import { StudentForm } from "./StudentForm";
import { StudentFormValues } from "@/lib/validations/student";

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
  const handleSave = (data: StudentFormValues) => {
    if (student && isEditing) {
      // When editing, maintain all existing properties and update with form data
      const updatedStudent: Student = {
        ...student,
        ...data,
        id: student.id // Ensure we keep the original ID
      };
      onSave(updatedStudent);
    } else {
      // When creating new, generate ID and create complete Student object
      const newStudent: Student = {
        id: Date.now(), // Generate a simple ID
        name: data.name,
        phone: data.phone,
        height: data.height,
        weight: data.weight,
        image: data.image,
        payment: data.payment || "",
        age: data.age || "",
        grade: data.grade || "",
        group: data.group || "",
        gender: data.gender
      };
      onSave(newStudent);
    }
  };

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
          onSave={handleSave}
          onCancel={() => onOpenChange(false)}
          isDialog={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormDialog;
