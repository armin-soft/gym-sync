
import React from "react";
import { motion } from "framer-motion";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound, Phone } from "lucide-react";
import { Control } from "react-hook-form";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { StudentFormData, StudentFormErrors } from "./hooks/useStudentForm";

interface PersonalInfoSectionProps {
  control?: Control<any>;
  value?: {
    name: string;
    phone: string;
  };
  onChange?: (field: keyof StudentFormData, value: string) => void;
  errors?: StudentFormErrors;
  itemVariants: any;
}

export const PersonalInfoSection = ({ 
  control, 
  value,
  onChange,
  errors,
  itemVariants 
}: PersonalInfoSectionProps) => {
  // If using react-hook-form
  if (control) {
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
  }
  
  // If using controlled component pattern
  return (
    <>
      {/* Name Field */}
      <motion.div variants={itemVariants}>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 mb-2" htmlFor="name">
            <UserRound className="h-4 w-4 text-indigo-500" />
            نام و نام خانوادگی
          </Label>
          <Input
            id="name"
            value={value?.name || ''}
            onChange={(e) => onChange && onChange('name', e.target.value)}
            className="focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
            placeholder="نام و نام خانوادگی را وارد کنید"
          />
          {errors?.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}
        </div>
      </motion.div>
      
      {/* Phone Field */}
      <motion.div variants={itemVariants}>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 mb-2" htmlFor="phone">
            <Phone className="h-4 w-4 text-indigo-500" />
            شماره موبایل
          </Label>
          <Input
            id="phone"
            dir="ltr"
            className="text-left focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
            value={toPersianNumbers(value?.phone || '')}
            onChange={(e) => {
              const cleanValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
              onChange && onChange('phone', cleanValue);
            }}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          />
          {errors?.phone && <p className="text-sm font-medium text-destructive">{errors.phone}</p>}
        </div>
      </motion.div>
    </>
  );
};
