
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ExerciseDialogFooterProps {
  activeTab: string;
  selectedExercisesCount: number;
  onCancel: () => void;
  onSave: () => void;
}

const ExerciseDialogFooter: React.FC<ExerciseDialogFooterProps> = ({
  activeTab,
  selectedExercisesCount,
  onCancel,
  onSave
}) => {
  const deviceInfo = useDeviceInfo();
  
  const getDayText = (tabId: string) => {
    switch (tabId) {
      case "day1": return "روز اول";
      case "day2": return "روز دوم";
      case "day3": return "روز سوم";
      case "day4": return "روز چهارم";
      default: return "نامشخص";
    }
  };

  const buttonSize = deviceInfo.isMobile ? "sm" : "default";
  const iconSize = deviceInfo.isMobile ? 16 : 18;

  return (
    <motion.div
      className={cn(
        "border-t border-gray-200 dark:border-gray-800",
        "bg-gradient-to-t from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 w-full",
        deviceInfo.isMobile ? "p-3" : "p-4 sm:p-6"
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Button 
            variant="outline" 
            size={buttonSize}
            onClick={onCancel}
            className="border-gray-200 dark:border-gray-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-all"
          >
            <X size={iconSize} className="ml-1.5" />
            انصراف
          </Button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`${deviceInfo.isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mr-2 bg-gray-100/80 dark:bg-gray-800/80 px-3 py-1 rounded-full`}
          >
            {selectedExercisesCount} تمرین انتخاب شده
          </motion.div>
        </div>
        
        <div className="flex justify-end flex-1">
          <Button 
            variant="default" 
            size={buttonSize}
            onClick={onSave}
            disabled={selectedExercisesCount === 0}
            className={cn(
              selectedExercisesCount === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg',
              "transition-all duration-300"
            )}
          >
            <Save size={iconSize} className="ml-1.5" />
            ذخیره تمرین‌های {getDayText(activeTab)}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseDialogFooter;
