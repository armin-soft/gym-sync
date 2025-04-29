
import React from "react";
import { Activity, X } from "lucide-react";
import { DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface ExerciseDialogHeaderProps {
  studentName: string;
}

const ExerciseDialogHeader: React.FC<ExerciseDialogHeaderProps> = ({ studentName }) => {
  return (
    <DialogHeader className="relative border-b border-b-gray-200 dark:border-b-gray-800 pt-6 pb-4 px-6 shadow-sm bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <motion.div 
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-primary rounded-full p-3 shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <Activity className="h-6 w-6 text-white" />
      </motion.div>
      <DialogTitle className="text-center mt-4 text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1">
        مدیریت تمرین‌های {studentName}
      </DialogTitle>
      <DialogDescription className="text-center text-muted-foreground max-w-md mx-auto">
        در این قسمت می‌توانید تمرین‌های روزهای مختلف را مدیریت کنید. لطفاً برای هر روز، تمرین‌ها را انتخاب کرده و تعداد ست و تکرار را مشخص نمایید.
      </DialogDescription>
    </DialogHeader>
  );
};

export default ExerciseDialogHeader;
