
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseDialogFooterProps {
  activeTab: string;
  selectedExercisesCount: number;
  onCancel: () => void;
  onSave: () => void;
  onSaveAndContinue?: () => void;
}

const ExerciseDialogFooter: React.FC<ExerciseDialogFooterProps> = ({
  activeTab,
  selectedExercisesCount,
  onCancel,
  onSave,
  onSaveAndContinue
}) => {
  const currentDay = parseInt(activeTab.replace("day", ""));
  const dayText = toPersianNumbers(currentDay);
  const countText = toPersianNumbers(selectedExercisesCount);
  
  return (
    <div className="flex items-center justify-between p-3 border-t bg-white dark:bg-gray-950">
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium text-primary">
          {countText}
        </span> تمرین برای روز {dayText} انتخاب شده
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="gap-1"
        >
          <X className="h-3.5 w-3.5" />
          <span>انصراف</span>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          className="gap-1 bg-primary/90 hover:bg-primary"
        >
          <Save className="h-3.5 w-3.5" />
          <span>ذخیره</span>
        </Button>
        
        {onSaveAndContinue && currentDay < 4 && (
          <Button
            variant="default"
            size="sm"
            onClick={onSaveAndContinue}
            className="gap-1 bg-indigo-500 hover:bg-indigo-600"
          >
            <span>ذخیره و روز بعدی</span>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExerciseDialogFooter;
