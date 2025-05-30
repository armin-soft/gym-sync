
import React from "react";
import { motion } from "framer-motion";
import { ChefHat, Plus } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface MealFormHeaderProps {
  isEdit: boolean;
  itemVariants: any;
}

export const MealFormHeader: React.FC<MealFormHeaderProps> = ({ isEdit, itemVariants }) => {
  return (
    <motion.div variants={itemVariants} className="p-6 pb-0 text-right" dir="rtl">
      <DialogHeader className="text-right">
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-end gap-3 text-right"
        >
          <DialogTitle className="text-2xl font-bold text-foreground text-right">
            {isEdit ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
          </DialogTitle>
          {isEdit ? (
            <ChefHat className="h-7 w-7 text-green-500" />
          ) : (
            <Plus className="h-7 w-7 text-green-500" />
          )}
        </motion.div>
        <motion.div variants={itemVariants} className="text-right">
          <DialogDescription id="meal-dialog-description" className="mt-2 text-muted-foreground text-sm text-right">
            {isEdit 
              ? "اطلاعات وعده غذایی را ویرایش کنید" 
              : "برای افزودن وعده غذایی جدید، فرم زیر را تکمیل کنید"
            }
          </DialogDescription>
        </motion.div>
      </DialogHeader>
    </motion.div>
  );
};
