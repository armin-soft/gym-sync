
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { MealNameField } from "./MealNameField";
import { MealTypeField } from "./MealTypeField";
import { WeekDayField } from "./WeekDayField";
import { MealFormActions } from "./MealFormActions";
import { mealFormSchema, type MealFormData } from "./MealFormSchema";
import type { Meal, MealType, WeekDay } from "@/types/meal";

interface MealFormContentProps {
  meal?: Meal;
  mealTypes: MealType[];
  weekDays: WeekDay[];
  onSave: (data: Omit<Meal, "id">, mealId?: number) => boolean;
  onCancel: () => void;
  itemVariants: any;
}

export const MealFormContent = ({
  meal,
  mealTypes,
  weekDays,
  onSave,
  onCancel,
  itemVariants,
}: MealFormContentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MealFormData>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      name: meal?.name || "",
      type: meal?.type || mealTypes[0],
      day: meal?.day || weekDays[0],
    },
  });

  // Reset form when meal changes
  useEffect(() => {
    if (meal) {
      form.reset({
        name: meal.name,
        type: meal.type,
        day: meal.day,
      });
    }
  }, [meal, form]);

  const handleSubmit = async (data: MealFormData) => {
    setIsSubmitting(true);
    
    try {
      // Ensure required fields are present
      const mealData: Omit<Meal, "id"> = {
        name: data.name!,
        type: data.type! as MealType,
        day: data.day as WeekDay,
      };
      
      const success = onSave(mealData, meal?.id);
      if (success) {
        form.reset();
        onCancel();
      }
    } catch (error) {
      console.error("Error saving meal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <motion.div variants={itemVariants} className="p-6 space-y-6">
          <WeekDayField control={form.control} weekDays={weekDays} />
          <MealTypeField control={form.control} mealTypes={mealTypes} />
          <MealNameField control={form.control} />
        </motion.div>
        
        <MealFormActions
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          isEdit={!!meal}
          itemVariants={itemVariants}
        />
      </form>
    </Form>
  );
};
