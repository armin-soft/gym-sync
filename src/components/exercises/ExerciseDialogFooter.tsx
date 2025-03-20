
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

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
  onSave,
}) => {
  const getBtnGradient = (tab: string) => {
    switch (tab) {
      case "day1": return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
      case "day2": return "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700";
      case "day3": return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700";
      case "day4": return "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700";
      default: return "";
    }
  };

  const dayText = {
    day1: "روز اول",
    day2: "روز دوم", 
    day3: "روز سوم",
    day4: "روز چهارم"
  };
  
  const dayName = dayText[activeTab as keyof typeof dayText] || "";
  const btnGradient = getBtnGradient(activeTab);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-4 border-t bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shrink-0"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          تعداد تمرین‌های انتخاب شده:
        </span>
        <Badge variant={selectedExercisesCount > 0 ? "default" : "outline"} className="px-2.5 py-1">
          {toPersianNumbers(selectedExercisesCount)}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="border-gray-300 hover:bg-gray-100"
        >
          <X className="h-4 w-4 ml-1" />
          انصراف
        </Button>
        <Button
          onClick={onSave}
          disabled={selectedExercisesCount === 0}
          size="sm"
          className={`${btnGradient} shadow-md hover:shadow-lg transition-all`}
        >
          <Check className="h-4 w-4 ml-1" />
          ذخیره تمرین‌های {dayName}
        </Button>
      </div>
    </motion.div>
  );
};

export default ExerciseDialogFooter;
