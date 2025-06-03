
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Meal } from "./types";
import { MealDialogHeader } from "./dialog/MealDialogHeader";
import { MealFormFields } from "./dialog/MealFormFields";
import { MealDialogActions } from "./dialog/MealDialogActions";
import { MealFormData, initialFormData } from "./dialog/MealFormData";

interface AddMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meal?: Meal | null;
  onSave: (meal: Omit<Meal, 'id'>) => void;
}

export const AddMealDialog: React.FC<AddMealDialogProps> = ({
  open,
  onOpenChange,
  meal,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<MealFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (meal) {
      setFormData({
        name: meal.name || '',
        type: meal.type || 'صبحانه',
        day: meal.day || 'شنبه'
      });
    } else {
      setFormData(initialFormData);
    }
  }, [meal, open]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "نام وعده غذایی الزامی است"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      onSave(formData);
      toast({
        title: meal ? "ویرایش موفق" : "افزودن موفق",
        description: meal 
          ? "وعده غذایی با موفقیت ویرایش شد"
          : "وعده غذایی جدید با موفقیت اضافه شد"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ذخیره‌سازی پیش آمد"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-auto max-h-[95vh] overflow-hidden p-0" 
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950 dark:via-gray-900 dark:to-teal-950 rounded-lg overflow-hidden h-full flex flex-col"
        >
          <MealDialogHeader isEditing={!!meal} />

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <MealFormFields 
                formData={formData}
                onFormDataChange={setFormData}
              />

              <MealDialogActions
                isEditing={!!meal}
                isSubmitting={isSubmitting}
                onCancel={() => onOpenChange(false)}
                onSubmit={handleSubmit}
              />
            </form>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
