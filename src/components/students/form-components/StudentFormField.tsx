import React from "react";
import { motion } from "framer-motion";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  direction?: "ltr" | "rtl";
  numberOnly?: boolean;
  className?: string;
}

export function StudentFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon: Icon,
  direction = "rtl",
  numberOnly = false,
  className
}: StudentFormFieldProps<T>) {
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          <FormLabel className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Icon className="h-4 w-4 text-emerald-500" />
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Icon className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </div>
              
              <Input
                {...field}
                placeholder={placeholder}
                dir={direction}
                className={cn(
                  "w-full pr-10 pl-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-emerald-500/20",
                  direction === "ltr" && "text-left"
                )}
                onChange={(e) => {
                  let value = e.target.value;
                  if (numberOnly) {
                    // Convert Persian numbers to English and allow only digits
                    value = value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    if (name === "phone") {
                      // For phone numbers, keep only digits
                      value = value.replace(/\D/g, '');
                    } else {
                      // For other number fields (age, height, weight), allow only digits
                      value = value.replace(/\D/g, '');
                    }
                  }
                  field.onChange(value);
                }}
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
