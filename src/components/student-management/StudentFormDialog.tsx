
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, VisuallyHidden } from '@/components/ui/dialog';
import { StudentForm } from './StudentForm';
import { Student } from '@/components/students/StudentTypes';

interface StudentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student;
  onSave: (student: Student) => void;
}

export const StudentFormDialog: React.FC<StudentFormDialogProps> = ({
  open,
  onOpenChange,
  student,
  onSave
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-2xl overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>
            {student ? 'ویرایش شاگرد' : 'افزودن شاگرد جدید'}
          </DialogTitle>
          <DialogDescription>
            {student ? `ویرایش اطلاعات ${student.name}` : 'فرم افزودن شاگرد جدید'}
          </DialogDescription>
        </VisuallyHidden>
        
        <StudentForm
          student={student}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
