
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { MealNameField } from "./MealNameField";
import { MealTypeField } from "./MealTypeField";
import { WeekDayField } from "./WeekDayField";
import { MealFormFooter } from "./MealFormFooter";
import { mealFormSchema, type MealFormData } from "./MealFormSchema";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface MealFormContentProps {
  meal?: Meal;
  mealTypes: MealType[];
  weekDays: WeekDay[];
  onSave: (data: Omit<Meal, "id">, mealId?: number) => boolean;
  onCancel: () => void;
}

export const MealFormContent = ({
  meal,
  mealTypes,
  weekDays,
  onSave,
  onCancel,
}: MealFormContentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MealFormData>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      name: meal?.name || "",
      type: meal?.type || mealTypes[0],
      day: meal?.day || weekDays[0],
      description: meal?.description || "",
      category: meal?.category || "",
      calories: meal?.calories || "",
      protein: meal?.protein || "",
      carbs: meal?.carbs || "",
      fat: meal?.fat || "",
    },
  });

  // Reset form when meal changes
  useEffect(() => {
    if (meal) {
      form.reset({
        name: meal.name,
        type: meal.type,
        day: meal.day,
        description: meal.description || "",
        category: meal.category || "",
        calories: meal.calories || "",
        protein: meal.protein || "",
        carbs: meal.carbs || "",
        fat: meal.fat || "",
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
        description: data.description,
        category: data.category,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MealNameField control={form.control} />
          <MealTypeField control={form.control} mealTypes={mealTypes} />
        </div>

        <WeekDayField control={form.control} weekDays={weekDays} />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>دسته‌بندی (اختیاری)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="مثال: صبحانه‌های پروتئینی" 
                  {...field} 
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات (اختیاری)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="توضیحات تکمیلی درباره وعده غذایی..."
                  className="min-h-[80px] resize-none"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>کالری</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="۲۵۰" 
                    {...field} 
                    autoComplete="off"
                    inputMode="numeric"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="protein"
            render={({ field }) => (
              <FormItem>
                <FormLabel>پروتئین (گرم)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="۲۰" 
                    {...field} 
                    autoComplete="off"
                    inputMode="numeric"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>کربوهیدرات (گرم)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="۳۰" 
                    {...field} 
                    autoComplete="off"
                    inputMode="numeric"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>چربی (گرم)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="۱۰" 
                    {...field} 
                    autoComplete="off"
                    inputMode="numeric"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <MealFormFooter
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          isEdit={!!meal}
        />
      </form>
    </Form>
  );
};
