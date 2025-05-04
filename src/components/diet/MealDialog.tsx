
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
  onSave: (data: Omit<Meal, "id">, mealId?: number) => boolean | void;
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
    // پیش‌پردازش داده‌ها - حذف فضاهای خالی اضافی در نام غذا و سایر فیلدها
    const processedData = {
      name: data.name.trim(),
      type: data.type as MealType,
      day: data.day as WeekDay,
      description: data.description?.trim() || "",
      category: data.category?.trim() || ""
    };
    
    console.log("====== MEAL DIALOG SUBMISSION ======");
    console.log("Form submitted with data:", processedData);
    console.log("Current meal for editing:", meal);
    console.log("Current meal ID for validation:", meal?.id);
    
    // بررسی تکراری بودن توسط تابع handleSave انجام می‌شود - با ارسال ID در صورت ویرایش
    const result = onSave(processedData, meal?.id);
    console.log("Save result:", result);
    
    // اگر ذخیره موفق بود، فرم را ریست کنیم
    if (result !== false) {
      onOpenChange(false);
    }
    console.log("====== END MEAL DIALOG SUBMISSION ======");
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
