
import React from "react";
import { motion } from "framer-motion";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound, Phone } from "lucide-react";
import { Control } from "react-hook-form";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PersonalInfoSectionProps {
  control: Control<any>;
  itemVariants: any;
}

export const PersonalInfoSection = ({ 
  control, 
  itemVariants 
}: PersonalInfoSectionProps) => {
  return (
    <>
      {/* Name Field */}
      <motion.div variants={itemVariants}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label className="flex items-center gap-2 mb-2">
                <UserRound className="h-4 w-4 text-indigo-500" />
                نام و نام خانوادگی
              </Label>
              <Input
                value={field.value}
                onChange={field.onChange}
                className="focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
                placeholder="نام و نام خانوادگی را وارد کنید"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      
      {/* Phone Field */}
      <motion.div variants={itemVariants}>
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <Label className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-indigo-500" />
                شماره موبایل
              </Label>
              <Input
                dir="ltr"
                className="text-left focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
                value={toPersianNumbers(field.value || '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                  field.onChange(value);
                }}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </>
  );
};
