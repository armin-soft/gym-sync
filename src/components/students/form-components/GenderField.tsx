
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { StudentFormValues } from "@/lib/validations/student";

interface GenderFieldProps {
  form: UseFormReturn<StudentFormValues>;
}

export const GenderField: React.FC<GenderFieldProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 mb-4 border-b border-emerald-100 dark:border-emerald-800">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20">
          <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">جنسیت</h3>
      </div>

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem 
                    value="male" 
                    id="male" 
                    className="border-emerald-300 text-emerald-600 focus:ring-emerald-500/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  />
                  <Label htmlFor="male" className="text-emerald-700 dark:text-emerald-300 cursor-pointer">
                    آقا
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem 
                    value="female" 
                    id="female"
                    className="border-emerald-300 text-emerald-600 focus:ring-emerald-500/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  />
                  <Label htmlFor="female" className="text-emerald-700 dark:text-emerald-300 cursor-pointer">
                    خانم
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
