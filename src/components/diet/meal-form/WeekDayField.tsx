
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { MealFormData } from "./MealFormSchema";
import type { WeekDay } from "@/types/meal";

interface WeekDayFieldProps {
  control: Control<MealFormData>;
  weekDays: WeekDay[];
}

export const WeekDayField = ({ control, weekDays }: WeekDayFieldProps) => {
  return (
    <FormField
      control={control}
      name="day"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
            روز هفته *
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="text-right h-11 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 transition-colors">
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {weekDays.map((day) => (
                <SelectItem key={day} value={day} className="text-right">
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
