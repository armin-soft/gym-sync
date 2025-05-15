
import React from "react";
import { Activity, X } from "lucide-react";
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
    <DialogHeader className={cn(
      "relative border-b border-b-gray-200 dark:border-b-gray-800",
      deviceInfo.isMobile ? 'pt-6 pb-4 px-3' : 'pt-8 pb-5 px-6',
      "shadow-sm bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40"
    )}>
      <motion.div 
        className={cn(
          "absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          deviceInfo.isMobile ? '-top-6' : '-top-8'
        )}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <div className={cn(
          "bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full shadow-xl",
          "shadow-indigo-300 dark:shadow-indigo-900/30",
          deviceInfo.isMobile ? 'p-3' : 'p-4'
        )}>
          <Activity className={cn("text-white", deviceInfo.isMobile ? 'h-5 w-5' : 'h-6 w-6')} />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <DialogTitle className={cn(
          "text-center mt-4",
          deviceInfo.isMobile ? 'text-xl' : 'text-2xl',
          "font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent pb-1"
        )}>
          مدیریت تمرین‌های {studentName}
        </DialogTitle>
        
        <DialogDescription className={cn(
          "text-center text-muted-foreground max-w-md mx-auto",
          deviceInfo.isMobile ? 'text-xs px-4' : 'text-sm'
        )}>
          در این قسمت می‌توانید تمرین‌های روزهای مختلف را مدیریت کنید. لطفاً برای هر روز، تمرین‌ها را انتخاب کرده و تعداد ست و تکرار را مشخص نمایید.
        </DialogDescription>
      </motion.div>
    </DialogHeader>
  );
};

export default ExerciseDialogHeader;
