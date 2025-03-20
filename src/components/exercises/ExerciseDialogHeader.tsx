
import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

interface ExerciseDialogHeaderProps {
  studentName: string;
}

const ExerciseDialogHeader: React.FC<ExerciseDialogHeaderProps> = ({
  studentName,
}) => {
  return (
    <DialogHeader className="pb-4 border-b p-6 bg-white dark:bg-gray-800/50 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DialogTitle className="text-xl font-bold flex items-center gap-2 text-primary">
          <div className="p-2 bg-primary/10 rounded-full">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <span>مدیریت تمرین‌های {studentName}</span>
        </DialogTitle>
        <DialogDescription className="mt-1 text-muted-foreground/80">
          تمرین‌های مورد نظر را انتخاب کنید تا به برنامه تمرینی شاگرد اضافه شوند
        </DialogDescription>
      </motion.div>
    </DialogHeader>
  );
};

export default ExerciseDialogHeader;
