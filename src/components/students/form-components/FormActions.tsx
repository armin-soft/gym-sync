
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface FormActionsProps {
  isEdit: boolean;
  onCancel: () => void;
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  isEdit, 
  onCancel,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`flex justify-end items-center gap-3 p-4 border-t bg-gradient-to-r from-emerald-50/50 to-sky-50/50 dark:bg-gradient-to-r dark:from-emerald-900/20 dark:to-sky-900/20 ${className || ''}`}
    >
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="gap-1 border-sky-200 text-sky-700 hover:bg-sky-50 dark:border-sky-700 dark:text-sky-300 dark:hover:bg-sky-900/20"
      >
        <X className="h-4 w-4" />
        <span>انصراف</span>
      </Button>
      
      <Button
        type="submit"
        className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-1 border-0"
      >
        <Save className="h-4 w-4" />
        <span>{isEdit ? "ذخیره تغییرات" : "افزودن شاگرد"}</span>
      </Button>
    </motion.div>
  );
};
