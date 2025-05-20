
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseHeaderProps {
  exerciseCount: number;
  currentDay: number;
  isSaving: boolean;
  onSave: () => void;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  exerciseCount,
  currentDay,
  isSaving,
  onSave
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        برنامه تمرینی روز {toPersianNumbers(currentDay)}
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          onClick={onSave} 
          disabled={isSaving}
          className="flex items-center gap-1 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          {isSaving ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>ذخیره</span>
        </Button>
      </div>
    </div>
  );
};

export default ExerciseHeader;
