
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MealFormContent } from "./meal-form/MealFormContent";
import { MealFormFooter } from "./meal-form/MealFormFooter";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { motion } from "framer-motion";

interface MealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Meal, "id">, mealId?: number) => boolean;
  meal?: Meal;
  mealTypes: MealType[];
  weekDays: WeekDay[];
}

export const MealDialog = ({
  open,
  onOpenChange,
  onSave,
  meal,
  mealTypes,
  weekDays,
}: MealDialogProps) => {
  const isEdit = !!meal;

  // بستن دیالوگ هنگام فشردن کلید ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto" 
        dir="rtl"
        aria-describedby="meal-dialog-description"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-bold text-center">
              {isEdit ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
            </DialogTitle>
            <DialogDescription id="meal-dialog-description" className="text-center text-muted-foreground">
              {isEdit 
                ? "اطلاعات وعده غذایی را ویرایش کنید" 
                : "برای افزودن وعده غذایی جدید، فرم زیر را تکمیل کنید"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <MealFormContent
              meal={meal}
              mealTypes={mealTypes}
              weekDays={weekDays}
              onSave={onSave}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
