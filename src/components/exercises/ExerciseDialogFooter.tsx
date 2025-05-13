
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Save, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

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

  const getNextDayButtonText = () => {
    const currentDay = parseInt(activeTab.replace("day", ""));
    return currentDay < 4 ? `ادامه به روز ${toPersianNumbers(currentDay + 1)}` : "ذخیره و اتمام";
  };
  
  return (
    <motion.div
      className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-md w-full p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="lg"
            onClick={onCancel}
            className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-4 w-4 ml-1 text-gray-500 dark:text-gray-400" />
            انصراف
          </Button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30",
              selectedExercisesCount > 0 ? "text-indigo-700 dark:text-indigo-300" : "text-gray-500 dark:text-gray-400"
            )}
          >
            {toPersianNumbers(selectedExercisesCount)} تمرین انتخاب شده
          </motion.div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="default" 
            size="lg"
            onClick={onSave}
            disabled={selectedExercisesCount === 0}
            className={cn(
              "relative group overflow-hidden transition-all duration-300",
              selectedExercisesCount === 0 
                ? "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            )}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400/0 via-white/20 to-indigo-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative flex items-center">
              <Save className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
              <span>ذخیره تمرین‌های {getDayText(activeTab)}</span>
              <ArrowRight className="h-0 w-0 opacity-0 ml-0 group-hover:h-4 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300" />
            </div>
          </Button>
          
          <div className={activeTab === "day4" ? "hidden" : "block"}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="icon"
                className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50"
                onClick={onSave}
                disabled={selectedExercisesCount === 0}
                title={getNextDayButtonText()}
              >
                <Check className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseDialogFooter;
