
import React from "react";
import { Activity } from "lucide-react";
import { DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ExerciseDialogHeaderProps {
  studentName: string;
}

const ExerciseDialogHeader: React.FC<ExerciseDialogHeaderProps> = ({ studentName }) => {
  const deviceInfo = useDeviceInfo();

  // Responsive tailwind classes
  const getHeaderClasses = () => {
    return `relative border-b border-b-gray-200/50 dark:border-b-gray-800/50 ${
      deviceInfo.isMobile ? 'pt-5 pb-4 px-3' : 
      deviceInfo.isTablet ? 'pt-6 pb-4 px-4' : 
      'pt-7 pb-5 px-6'
    } shadow-sm bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-950/80 dark:to-gray-900 backdrop-blur-md`;
  };

  const getIconSize = () => {
    return deviceInfo.isMobile ? "h-5 w-5" : "h-6 w-6";
  };

  const getTitleSize = () => {
    return deviceInfo.isMobile ? "text-lg md:text-xl" : "text-xl md:text-2xl";
  };

  return (
    <DialogHeader className={getHeaderClasses()}>
      <motion.div 
        className={`absolute ${deviceInfo.isMobile ? '-top-6' : '-top-8'} left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full ${deviceInfo.isMobile ? 'p-2.5' : 'p-3.5'} shadow-lg shadow-indigo-500/25 dark:shadow-indigo-800/30`}
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
      >
        <Activity className={`${getIconSize()} text-white`} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <DialogTitle className={`text-center mt-5 ${getTitleSize()} font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent pb-1 tracking-tight`}>
          مدیریت تمرین‌های {studentName}
        </DialogTitle>
        
        <DialogDescription className={`text-center text-muted-foreground max-w-md mx-auto ${deviceInfo.isMobile ? 'text-xs' : 'text-sm'} mt-2 leading-relaxed`}>
          در این قسمت می‌توانید تمرین‌های روزهای مختلف را مدیریت کنید. لطفاً برای هر روز، تمرین‌ها را انتخاب کرده و تعداد ست و تکرار را مشخص نمایید.
        </DialogDescription>
      </motion.div>
    </DialogHeader>
  );
};

export default ExerciseDialogHeader;
