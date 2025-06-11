
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
      className={`flex justify-end items-center gap-3 p-4 border-t bg-slate-50/80 dark:bg-slate-900/50 ${className || ''}`}
    >
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="gap-1"
      >
        <X className="h-4 w-4" />
        <span>انصراف</span>
      </Button>
      
      <Button
        type="submit"
        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-1"
      >
        <Save className="h-4 w-4" />
        <span>{isEdit ? "ذخیره تغییرات" : "افزودن شاگرد"}</span>
      </Button>
    </motion.div>
  );
};
