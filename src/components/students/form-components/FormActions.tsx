
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface FormActionsProps {
  isEdit: boolean;
  onCancel: () => void;
}

export const FormActions = ({ isEdit, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel} 
        className="gap-2"
      >
        <X className="h-4 w-4" />
        انصراف
      </Button>
      <Button 
        type="submit" 
        className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
      >
        <Save className="h-4 w-4" />
        {isEdit ? "ذخیره تغییرات" : "افزودن شاگرد"}
      </Button>
    </div>
  );
};
