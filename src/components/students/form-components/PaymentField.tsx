
import React from "react";
import { Coins } from "lucide-react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { formatPayment } from "@/utils/studentUtils";

interface PaymentFieldProps {
  control: any; // Using any as the control type is complex
}

export const PaymentField = ({ control }: PaymentFieldProps) => {
  return (
    <FormField
      control={control}
      name="payment"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-indigo-500" />
            <span>مبلغ (تومان)</span>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              dir="ltr"
              className="text-left bg-slate-50 dark:bg-slate-800/50 focus-visible:ring-indigo-400"
              placeholder="۵۰۰,۰۰۰"
              value={toPersianNumbers(formatPayment(field.value || ''))}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
                  .replace(/\D/g, '');
                field.onChange(value);
              }}
            />
          </FormControl>
          <p className="text-xs text-muted-foreground mt-1">مبلغ صدور برنامه‌ها به تومان</p>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
