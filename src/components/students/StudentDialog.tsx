
import {
  Dialog,
  DialogContent,
  DialogTitle,
  VisuallyHidden
} from "@/components/ui/dialog";
import { Student } from "@/components/students/StudentTypes";
import { motion, AnimatePresence } from "framer-motion";
import { StudentDialogContent } from "@/components/students/form-components/StudentDialogContent";

interface StudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StudentFormData) => void;
  student?: Student;
}

interface StudentFormData {
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment: string;
  age: string;
  grade: string;
  group: string;
  gender: "male" | "female";
}

export const StudentDialog = ({
  isOpen,
  onClose,
  onSave,
  student,
}: StudentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <DialogTitle className="sr-only">
          {student ? "ویرایش شاگرد" : "افزودن شاگرد جدید"}
        </DialogTitle>
        <AnimatePresence mode="wait">
          <StudentDialogContent 
            student={student}
            onSave={onSave}
            onCancel={onClose}
          />
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
