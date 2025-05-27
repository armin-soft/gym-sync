
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { MealFormData } from "./MealFormSchema";

interface MealNameFieldProps {
  control: Control<MealFormData>;
}

export const MealNameField = ({ control }: MealNameFieldProps) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-right">نام وعده غذایی *</FormLabel>
          <FormControl>
            <Input
              placeholder="مثال: املت با نان سبوس‌دار"
              className="text-right"
              {...field}
              autoComplete="off"
              aria-label="نام وعده غذایی"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
