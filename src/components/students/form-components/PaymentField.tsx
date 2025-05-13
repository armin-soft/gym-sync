
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { formatPayment } from "@/utils/studentUtils";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

interface PaymentFieldProps {
  control?: Control<any>;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  itemVariants?: any;
}

export const PaymentField = ({ 
  control, 
  value, 
  onChange,
  error,
  itemVariants 
}: PaymentFieldProps) => {
  // If using react-hook-form
  if (control) {
    return (
      <motion.div variants={itemVariants}>
        <FormField
          control={control}
          name="payment"
          render={({ field }) => (
            <FormItem>
              <Label className="flex items-center gap-2 mb-2">
                <Coins className="h-4 w-4 text-indigo-500" />
                <span>مبلغ (تومان)</span>
              </Label>
              <Input
                dir="ltr"
                className="text-left focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
                value={toPersianNumbers(field.value || '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                  field.onChange(value);
                }}
                placeholder="۵۰۰,۰۰۰"
              />
              <FormMessage />
              <p className="text-xs text-muted-foreground mt-1">مبلغ صدور برنامه‌ها به تومان</p>
            </FormItem>
          )}
        />
      </motion.div>
    );
  }
  
  // If using controlled component pattern
  return (
    <motion.div variants={itemVariants}>
      <div className="space-y-2">
        <Label className="flex items-center gap-2 mb-2" htmlFor="payment">
          <Coins className="h-4 w-4 text-indigo-500" />
          <span>مبلغ (تومان)</span>
        </Label>
        <Input
          id="payment"
          dir="ltr"
          className="text-left focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
          value={value || ''}
          onChange={(e) => {
            onChange && onChange(e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))));
          }}
          placeholder="۵۰۰,۰۰۰"
        />
        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        <p className="text-xs text-muted-foreground mt-1">مبلغ صدور برنامه‌ها به تومان</p>
      </div>
    </motion.div>
  );
};
