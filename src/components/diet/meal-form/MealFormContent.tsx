
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { MealNameField } from "./MealNameField";
import { MealTypeField } from "./MealTypeField";
import { WeekDayField } from "./WeekDayField";
import { MealFormFooter } from "./MealFormFooter";
import { mealFormSchema, type MealFormData } from "./MealFormSchema";

interface MealFormContentProps {
  onSubmit: (data: MealFormData) => void;
  onCancel: () => void;
  meal?: Meal | null;
  mealTypes: MealType[];
  weekDays: WeekDay[];
}

export const MealFormContent = ({
  onSubmit,
  onCancel,
  meal,
  mealTypes,
  weekDays,
}: MealFormContentProps) => {
  const form = useForm<MealFormData>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      name: meal?.name || "",
      type: meal?.type || "",
      day: meal?.day || "",
      description: meal?.description || "",
      category: meal?.category || "",
    },
  });

  useEffect(() => {
    if (meal) {
      form.reset({
        name: meal.name,
        type: meal.type,
        day: meal.day,
        description: meal.description || "",
        category: meal.category || "",
      });
    } else {
      form.reset({
        name: "",
        type: "",
        day: "",
        description: "",
        category: "",
      });
    }
  }, [meal, form]);

  const handleSubmit = (data: MealFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="p-6 pt-2 space-y-5">
          <MealNameField form={form} />

          <div className="grid grid-cols-2 gap-4">
            <MealTypeField form={form} mealTypes={mealTypes} />
            <WeekDayField form={form} weekDays={weekDays} />
          </div>
        </div>

        <MealFormFooter onCancel={onCancel} isEditing={!!meal} />
      </form>
    </Form>
  );
};
