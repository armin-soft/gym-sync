
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import type { MealFormProps } from "./MealFormSchema";

export const MealTypeField = ({ form, mealTypes }: Pick<MealFormProps, "form" | "mealTypes">) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="text-right">
          <FormLabel className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            نوع وعده
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-muted/50 focus:bg-background transition-colors duration-300 text-right">
                <SelectValue placeholder="نوع وعده را انتخاب کنید" />
              </SelectTrigger>
            </FormControl>
            <SelectContent dir="rtl">
              {mealTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
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
