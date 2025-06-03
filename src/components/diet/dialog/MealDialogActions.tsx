
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface MealDialogActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export const MealDialogActions: React.FC<MealDialogActionsProps> = ({
  isEditing,
  isSubmitting,
  onCancel,
  onSubmit
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 h-auto font-bold border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        disabled={isSubmitting}
      >
        <X className="ml-2 h-4 w-4" />
        انصراف
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 h-auto font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all"
        disabled={isSubmitting}
      >
        <Save className="ml-2 h-4 w-4" />
        {isSubmitting 
          ? "در حال ذخیره..." 
          : isEditing 
            ? "ذخیره تغییرات" 
            : "افزودن وعده غذایی"
        }
      </Button>
    </div>
  );
};
