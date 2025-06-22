
import React from "react";
import { cn } from "@/lib/utils";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { LucideIcon } from "lucide-react";

interface StudentFormFieldProps {
  control: any; // Using any here as the control type is complex
  name: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  direction?: "rtl" | "ltr";
  persianNumbers?: boolean;
  numberOnly?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  description?: string;
}

export const StudentFormField = ({ 
  control, 
  name, 
  label, 
  placeholder, 
  icon: Icon, 
  direction = "rtl", 
  persianNumbers = false,
  numberOnly = false,
  className,
  onChange,
  description
}: StudentFormFieldProps) => {
  // Check if this is a password field to add appropriate autocomplete
  const isPassword = name.toLowerCase().includes('password');
  const autoCompleteValue = isPassword ? "new-password" : undefined;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-emerald-500" />
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              dir={direction}
              className={cn(
                "bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-emerald-400",
                direction === "ltr" && "text-left"
              )}
              placeholder={placeholder}
              value={persianNumbers ? toPersianNumbers(field.value) : field.value}
              autoComplete={autoCompleteValue}
              inputMode={numberOnly ? "numeric" : "text"}
              onChange={(e) => {
                let value = e.target.value;
                
                // Handle Persian numbers conversion
                if (persianNumbers || numberOnly) {
                  // تبدیل اعداد فارسی به انگلیسی
                  value = value.replace(/[۰-۹]/g, d => {
                    return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString();
                  });
                }
                
                // Handle number-only fields
                if (numberOnly) {
                  value = value.replace(/\D/g, '');
                }
                
                field.onChange(value);
                onChange?.(value);
              }}
            />
          </FormControl>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
