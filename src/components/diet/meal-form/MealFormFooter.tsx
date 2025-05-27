
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface MealFormFooterProps {
  onCancel: () => void;
  isEdit: boolean;
  isSubmitting: boolean;
}

export const MealFormFooter = ({ onCancel, isEdit, isSubmitting }: MealFormFooterProps) => {
  return (
    <div className="p-4 bg-gradient-to-t from-muted/50 via-muted/30 to-transparent flex items-center justify-end gap-2">
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        className="gap-2 hover:bg-red-500/10 hover:text-red-500"
        disabled={isSubmitting}
      >
        <X className="w-4 h-4" />
        انصراف
      </Button>
      <Button 
        type="submit"
        className="gap-2 bg-gradient-to-l from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
        disabled={isSubmitting}
      >
        <Save className="w-4 h-4" />
        {isSubmitting ? "در حال ذخیره..." : (isEdit ? "ویرایش" : "افزودن")}
      </Button>
    </div>
  );
};
