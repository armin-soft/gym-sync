
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Save, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Meal } from "@/types/meal";

interface StudentMealFooterProps {
  selectedMeals: number[];
  handleSave: () => boolean;
  onOpenChange: (open: boolean) => void;
  meals: Meal[];
}

const StudentMealFooter: React.FC<StudentMealFooterProps> = ({
  selectedMeals,
  handleSave,
  onOpenChange,
  meals
}) => {
  return (
    <div className="border-t p-4 mt-auto bg-muted/20 shrink-0 flex justify-between text-right" dir="rtl">
      <div className="flex items-center gap-2">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{
            scale: selectedMeals.length > 0 ? 1 : 0.9,
            opacity: selectedMeals.length > 0 ? 1 : 0
          }} 
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {toPersianNumbers(selectedMeals.length)} وعده غذایی انتخاب شده
        </motion.div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
          <X className="h-4 w-4" />
          انصراف
        </Button>
        <Button 
          onClick={handleSave} 
          className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0" 
          disabled={selectedMeals.length === 0}
        >
          <Save className="h-4 w-4" />
          ذخیره برنامه غذایی
        </Button>
      </div>
    </div>
  );
};

export default StudentMealFooter;
