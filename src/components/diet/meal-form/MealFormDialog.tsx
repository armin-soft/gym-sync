
import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { MealFormContent } from "./MealFormContent";
import { MealFormHeader } from "./MealFormHeader";
import type { Meal, MealType, WeekDay } from "@/types/meal";

interface MealFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Meal, "id">, mealId?: number) => boolean;
  meal?: Meal;
  mealTypes: MealType[];
  weekDays: WeekDay[];
}

const dialogVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const MealFormDialog = ({
  open,
  onOpenChange,
  onSave,
  meal,
  mealTypes,
  weekDays,
}: MealFormDialogProps) => {
  const isEdit = !!meal;

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
        className="p-0 border-none bg-transparent shadow-none max-w-2xl text-right" 
        dir="rtl"
        aria-describedby="meal-dialog-description"
      >
        <motion.div
          className="relative flex flex-col rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 text-right"
          initial="hidden"
          animate="visible"
          variants={dialogVariants}
          dir="rtl"
        >
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-green-600 to-emerald-600 -z-10" />
          
          <MealFormHeader isEdit={isEdit} itemVariants={itemVariants} />
          
          <MealFormContent
            meal={meal}
            mealTypes={mealTypes}
            weekDays={weekDays}
            onSave={onSave}
            onCancel={() => onOpenChange(false)}
            itemVariants={itemVariants}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
