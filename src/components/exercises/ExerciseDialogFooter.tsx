
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Save, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseDialogFooterProps {
  onCancel: () => void;
  onSave: () => void;
  activeTab: string;
  selectedExercisesCount: number;
}

const ExerciseDialogFooter: React.FC<ExerciseDialogFooterProps> = ({
  onCancel,
  onSave,
  activeTab,
  selectedExercisesCount,
}) => {
  const getBtnGradient = (tab: string) => {
    switch(tab) {
      case "day1": return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
      case "day2": return "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700";
      case "day3": return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700";
      case "day4": return "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700";
      default: return "";
    }
  };

  const getTabColorClass = (tab: string) => {
    switch(tab) {
      case "day1": return "text-blue-600";
      case "day2": return "text-purple-600";
      case "day3": return "text-pink-600";
      case "day4": return "text-amber-600";
      default: return "";
    }
  };

  const getDayText = (tab: string) => {
    switch(tab) {
      case "day1": return "روز اول";
      case "day2": return "روز دوم";
      case "day3": return "روز سوم";
      case "day4": return "روز چهارم";
      default: return "";
    }
  };

  return (
    <DialogFooter className="p-6 pt-4 border-t mt-4">
      <div className="text-sm font-medium mr-auto">
        تمرین‌های {getDayText(activeTab)} انتخاب شده: 
        <span className={getTabColorClass(activeTab)}>
          {toPersianNumbers(selectedExercisesCount)}
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          انصراف
        </Button>
        <Button
          onClick={onSave}
          className={`gap-2 ${getBtnGradient(activeTab)}`}
        >
          <Save className="h-4 w-4" />
          ذخیره تمرین‌های {getDayText(activeTab)}
        </Button>
      </div>
    </DialogFooter>
  );
};

export default ExerciseDialogFooter;
