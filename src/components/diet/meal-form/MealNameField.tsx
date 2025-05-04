
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Type } from "lucide-react";
import type { MealFormProps } from "./MealFormSchema";

export const MealNameField = ({ form }: Pick<MealFormProps, "form">) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="text-right">
          <FormLabel className="flex items-center gap-2">
            <Type className="w-4 h-4 text-muted-foreground" />
            نام غذا
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="نام غذا را وارد کنید" 
              className="bg-muted/50 focus:bg-background transition-colors duration-300 text-right"
              {...field} 
              dir="rtl"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
