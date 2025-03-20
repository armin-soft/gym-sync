
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Save } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { WeekDay } from "@/types/meal";

interface DietDialogFooterProps {
  selectedMealsCount: number;
  onCancel: () => void;
  onSave: () => void;
  selectedDay: WeekDay;
}

export const DietDialogFooter: React.FC<DietDialogFooterProps> = ({
  selectedMealsCount,
  onCancel,
  onSave,
  selectedDay,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-4 border-t bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shrink-0"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          تعداد غذاهای انتخاب شده ({selectedDay}):
        </span>
        <Badge variant={selectedMealsCount > 0 ? "default" : "outline"} className="px-2.5 py-1">
          {toPersianNumbers(selectedMealsCount)}
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
          size="sm"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all"
        >
          <Save className="h-4 w-4 ml-1" />
          ذخیره برنامه غذایی
        </Button>
      </div>
    </motion.div>
  );
};
