
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const dayNumber = activeTab.replace("day", "");
  const hasExercises = selectedExercisesCount > 0;

  return (
    <DialogFooter className="flex flex-row-reverse sm:flex-row-reverse justify-between items-center border-t border-t-gray-200 dark:border-t-gray-800 p-4 bg-gradient-to-t from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="flex items-center gap-2">
        <Button
          onClick={onSave}
          className={cn(
            "gap-1.5 transition-all duration-300",
            hasExercises ? "bg-primary hover:bg-primary-hover" : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          disabled={!hasExercises}
        >
          <Save className={cn("h-4 w-4", hasExercises ? "text-white" : "text-gray-400")} />
          <span>ذخیره تمرین‌های روز {dayNumber}</span>
        </Button>
        <Button variant="outline" onClick={onCancel} className="gap-1.5">
          <X className="h-4 w-4" />
          <span>انصراف</span>
        </Button>
      </div>

      {!hasExercises && (
        <motion.div 
          className="flex items-center text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span>هیچ تمرینی برای روز {dayNumber} انتخاب نشده است</span>
        </motion.div>
      )}
      
      {hasExercises && (
        <motion.div 
          className="flex items-center text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span>{selectedExercisesCount} تمرین برای روز {dayNumber} انتخاب شده</span>
        </motion.div>
      )}
    </DialogFooter>
  );
};

export default ExerciseDialogFooter;
