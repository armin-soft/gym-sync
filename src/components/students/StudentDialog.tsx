
import {
  Dialog,
  DialogContent,
  DialogTitle,
  VisuallyHidden
} from "@/components/ui/dialog";
import { Student } from "@/components/students/StudentTypes";
import { motion, AnimatePresence } from "framer-motion";
import { StudentDialogContent } from "@/components/students/form-components";

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
}

export const StudentDialog = ({
  isOpen,
  onClose,
  onSave,
  student,
}: StudentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
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
