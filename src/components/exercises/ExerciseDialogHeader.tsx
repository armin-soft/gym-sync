
import React from "react";
import { Activity, Dumbbell, X } from "lucide-react";
import { DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ExerciseDialogHeaderProps {
  studentName: string;
}

const ExerciseDialogHeader: React.FC<ExerciseDialogHeaderProps> = ({ studentName }) => {
  const deviceInfo = useDeviceInfo();

  return (
    <DialogHeader className="relative border-b border-b-gray-200 dark:border-b-gray-800 py-5 px-6 shadow-sm bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent opacity-70"></div>
      
      <motion.div 
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full p-3 shadow-lg bg-gradient-to-br from-indigo-600 to-violet-600"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <Dumbbell className="h-6 w-6 text-white" />
      </motion.div>
      
      <motion.div 
        className="relative z-10"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <DialogTitle className="text-center mt-4 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1">
          مدیریت تمرین‌های {studentName}
        </DialogTitle>
        
        <DialogDescription className="text-center text-muted-foreground max-w-md mx-auto">
          برای هر روز، تمرین‌ها را انتخاب کرده و تعداد ست و تکرار را مشخص نمایید.
        </DialogDescription>
      </motion.div>
      
      <motion.div 
        className="absolute top-4 right-4 h-14 w-14 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2, stiffness: 200, damping: 15 }}
      >
        <div className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-full animate-ping opacity-75"></div>
        <div className="relative h-10 w-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
          <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
      </motion.div>
    </DialogHeader>
  );
};

export default ExerciseDialogHeader;
