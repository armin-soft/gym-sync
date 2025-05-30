
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { MealFormData } from "./MealFormSchema";
import type { MealType } from "@/types/meal";

interface MealTypeFieldProps {
  control: Control<MealFormData>;
  mealTypes: MealType[];
}

export const MealTypeField = ({ control, mealTypes }: MealTypeFieldProps) => {
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
            نوع وعده غذایی *
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="text-right h-11 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 transition-colors">
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {mealTypes.map((type) => (
                <SelectItem key={type} value={type} className="text-right">
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
