
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
          <FormLabel className="text-right">روز هفته *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="text-right">
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
