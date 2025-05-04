
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UtensilsCrossed } from "lucide-react";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { MealFormContent } from "./meal-form/MealFormContent";
import type { MealFormData } from "./meal-form/MealFormSchema";

export interface MealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Meal, "id">) => boolean | void;
  meal?: Meal | null;
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
  
  const handleSubmit = (data: MealFormData) => {
    // پیش‌پردازش داده‌ها - حذف فضاهای خالی اضافی در نام غذا
    const processedData = {
      name: data.name.trim(),
      type: data.type as MealType,
      day: data.day as WeekDay,
      description: "",
      category: data.category || ""
    };
    
    console.log("Form submitted with data:", processedData);
    
    // بررسی تکراری بودن توسط تابع handleSave انجام می‌شود
    const result = onSave(processedData);
    
    // اگر ذخیره موفق بود، فرم را ریست کنیم
    if (result !== false) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0" dir="rtl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-b from-muted/50 to-transparent">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <UtensilsCrossed className="w-5 h-5 text-primary" />
            {meal ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
          </DialogTitle>
        </DialogHeader>
        <MealFormContent 
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          meal={meal}
          mealTypes={mealTypes}
          weekDays={weekDays}
        />
      </DialogContent>
    </Dialog>
  );
};
