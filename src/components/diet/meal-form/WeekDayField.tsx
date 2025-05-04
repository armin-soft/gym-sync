
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from "lucide-react";
import type { MealFormProps } from "./MealFormSchema";

export const WeekDayField = ({ form, weekDays }: Pick<MealFormProps, "form" | "weekDays">) => {
  return (
    <FormField
      control={form.control}
      name="day"
      render={({ field }) => (
        <FormItem className="text-right">
          <FormLabel className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            روز هفته
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-muted/50 focus:bg-background transition-colors duration-300 text-right">
                <SelectValue placeholder="روز هفته را انتخاب کنید" />
              </SelectTrigger>
            </FormControl>
            <SelectContent dir="rtl">
              {weekDays.map((day) => (
                <SelectItem key={day} value={day}>
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
