
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

  // Responsive class helpers
  const getFooterClass = () => {
    return cn(
      "border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 w-full",
      deviceInfo.isMobile ? "p-3" : "p-4 sm:p-6"
    );
  };

  const getIconSize = () => {
    return deviceInfo.isMobile ? "h-4 w-4" : "h-5 w-5";
  };

  const getButtonSize = () => {
    return deviceInfo.isMobile ? "sm" : "default";
  };
  
  return (
    <motion.div
      className={getFooterClass()}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Button 
            variant="outline" 
            size={getButtonSize()}
            onClick={onCancel}
          >
            <X className={`${getIconSize()} ml-1`} />
            انصراف
          </Button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`${deviceInfo.isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mr-2`}
          >
            {selectedExercisesCount} تمرین انتخاب شده
          </motion.div>
        </div>
        
        <div className="flex justify-end flex-1">
          <Button 
            variant="default" 
            size={getButtonSize()}
            onClick={onSave}
            disabled={selectedExercisesCount === 0}
            className={`${selectedExercisesCount === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'} transition-all duration-300`}
          >
            <Save className={`${getIconSize()} ml-1`} />
            ذخیره تمرین‌های {getDayText(activeTab)}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseDialogFooter;
