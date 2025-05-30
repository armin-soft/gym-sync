
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface MealFormActionsProps {
  onCancel: () => void;
  isEdit: boolean;
  isSubmitting: boolean;
  itemVariants: any;
}

export const MealFormActions = ({ 
  onCancel, 
  isEdit, 
  isSubmitting, 
  itemVariants 
}: MealFormActionsProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex justify-end items-center gap-3 p-4 border-t bg-slate-50/80 dark:bg-slate-900/50 text-right"
      dir="rtl"
    >
      <Button
        type="submit"
        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2"
        disabled={isSubmitting}
      >
        <Save className="h-4 w-4" />
        <span>
          {isSubmitting ? "در حال ذخیره..." : (isEdit ? "ذخیره تغییرات" : "افزودن وعده")}
        </span>
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="gap-2"
        disabled={isSubmitting}
      >
        <X className="h-4 w-4" />
        <span>انصراف</span>
      </Button>
    </motion.div>
  );
};
