
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins } from "lucide-react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PaymentFieldProps {
  control: Control<any>;
  itemVariants?: any;
}

export const PaymentField = ({ 
  control, 
  itemVariants 
}: PaymentFieldProps) => {
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
};
