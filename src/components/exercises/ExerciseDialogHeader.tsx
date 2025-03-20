
import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Dumbbell } from "lucide-react";

interface ExerciseDialogHeaderProps {
  studentName: string;
}

const ExerciseDialogHeader: React.FC<ExerciseDialogHeaderProps> = ({
  studentName,
}) => {
  return (
    <DialogHeader className="pb-4 border-b p-6">
      <DialogTitle className="text-xl flex items-center gap-2">
        <Dumbbell className="h-5 w-5 text-primary" />
        <span>مدیریت تمرین‌های {studentName}</span>
      </DialogTitle>
      <DialogDescription>
        تمرین‌های مورد نظر را انتخاب کنید تا به برنامه تمرینی شاگرد اضافه شوند
      </DialogDescription>
    </DialogHeader>
  );
};

export default ExerciseDialogHeader;
