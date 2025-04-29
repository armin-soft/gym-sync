
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
    <DialogHeader className="pb-4 border-b p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/60 shadow-sm rounded-t-xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-3 text-primary">
          <div className="p-2 bg-primary/10 rounded-full shadow-inner">
            <Dumbbell className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">مدیریت تمرین‌های {studentName}</span>
        </DialogTitle>
        <DialogDescription className="mt-3 text-base text-gray-700 dark:text-gray-300 font-medium">
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center"
          >
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            تمرین‌های مورد نظر را انتخاب کنید تا به برنامه تمرینی شاگرد اضافه شوند
          </motion.div>
        </DialogDescription>
      </motion.div>
    </DialogHeader>
  );
};

export default ExerciseDialogHeader;
