
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useBrandTheme } from "@/hooks/use-brand-theme";

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
  const { getGradientClass } = useBrandTheme();
  
  const currentDay = parseInt(activeTab.replace("day", ""));
  const dayText = toPersianNumbers(currentDay);
  const countText = toPersianNumbers(selectedExercisesCount);
  
  return (
    <div className="flex items-center justify-between p-3 border-t bg-white dark:bg-gray-950">
      <div className="text-xs text-brand-dark/60 dark:text-gray-400">
        <span className="font-medium text-brand-primary">
          {countText}
        </span> تمرین برای روز {dayText} انتخاب شده
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="gap-1 text-brand-dark/70 hover:bg-brand-primary/10"
        >
          <X className="h-3.5 w-3.5" />
          <span>انصراف</span>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          className={`gap-1 ${getGradientClass('primary')} hover:opacity-90`}
        >
          <Save className="h-3.5 w-3.5" />
          <span>ذخیره</span>
        </Button>
        
        {onSaveAndContinue && currentDay < 4 && (
          <Button
            variant="default"
            size="sm"
            onClick={onSaveAndContinue}
            className={`gap-1 ${getGradientClass('dark')} hover:opacity-90`}
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
