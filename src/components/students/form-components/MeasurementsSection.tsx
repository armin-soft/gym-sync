
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Ruler, Weight } from "lucide-react";
import { StudentFormValues } from "@/lib/validations/student";

interface MeasurementsSectionProps {
  form: UseFormReturn<StudentFormValues>;
}

export const MeasurementsSection: React.FC<MeasurementsSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 mb-4 border-b border-emerald-100 dark:border-emerald-800">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20">
          <Ruler className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">اندازه‌گیری‌ها</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-700 dark:text-emerald-300 font-medium">
                قد (سانتی‌متر)
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
                  <Input
                    {...field}
                    type="text"
                    placeholder="170"
                    className="pr-10 border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-700 dark:text-emerald-300 font-medium">
                وزن (کیلوگرم)
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Weight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
                  <Input
                    {...field}
                    type="text"
                    placeholder="70"
                    className="pr-10 border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
