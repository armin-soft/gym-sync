
import React from "react";
import { motion } from "framer-motion";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Utensils, Plus } from "lucide-react";

interface MealDialogHeaderProps {
  isEditing: boolean;
}

export const MealDialogHeader: React.FC<MealDialogHeaderProps> = ({ isEditing }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 sm:p-6">
      <DialogHeader>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
            {isEditing ? <Utensils className="h-5 w-5 sm:h-6 sm:w-6" /> : <Plus className="h-5 w-5 sm:h-6 sm:w-6" />}
          </div>
          <div>
            <DialogTitle className="text-lg sm:text-2xl font-black">
              {isEditing ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
            </DialogTitle>
            <DialogDescription className="text-emerald-100 mt-1 text-sm sm:text-base">
              {isEditing 
                ? "اطلاعات وعده غذایی را ویرایش کنید"
                : "وعده غذایی جدید به برنامه اضافه کنید"
              }
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
    </div>
  );
};
