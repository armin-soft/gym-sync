
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentMealFooterProps {
  selectedMeals: number[];
  onSave: () => void;
  onClose: () => void;
}

const StudentMealFooter: React.FC<StudentMealFooterProps> = ({
  selectedMeals,
  onSave,
  onClose
}) => {
  return (
    <div className="p-6 border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {toPersianNumbers(selectedMeals.length)} وعده غذایی انتخاب شده
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          انصراف
        </Button>
        
        <Button
          onClick={onSave}
          className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          ذخیره برنامه غذایی
        </Button>
      </div>
    </div>
  );
};

export default StudentMealFooter;
