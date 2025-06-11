
import React from "react";
import { motion } from "framer-motion";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler, Weight } from "lucide-react";
import { Control } from "react-hook-form";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { StudentFormData, StudentFormErrors } from "./hooks/useStudentForm";

interface MeasurementsSectionProps {
  control?: Control<any>;
  value?: {
    height: string;
    weight: string;
  };
  onChange?: (field: keyof StudentFormData, value: string) => void;
  errors?: StudentFormErrors;
  itemVariants: any;
}

export const MeasurementsSection = ({ 
  control, 
  value,
  onChange,
  errors,
  itemVariants 
}: MeasurementsSectionProps) => {
  // If using react-hook-form
  if (control) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Height Field */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <Label className="flex items-center gap-2 mb-2">
                  <Ruler className="h-4 w-4 text-indigo-500" />
                  قد (سانتی متر)
                </Label>
                <Input
                  dir="ltr"
                  className="text-left focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
                  value={toPersianNumbers(field.value || '')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    field.onChange(value);
                  }}
                  placeholder="۱۷۵"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Weight Field */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <Label className="flex items-center gap-2 mb-2">
                  <Weight className="h-4 w-4 text-indigo-500" />
                  وزن (کیلوگرم)
                </Label>
                <Input
                  dir="ltr"
                  className="text-left focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
                  value={toPersianNumbers(field.value || '')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    field.onChange(value);
                  }}
                  placeholder="۷۵"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      </div>
    );
  }
  
  // If using controlled component pattern
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Height Field */}
      <motion.div variants={itemVariants}>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 mb-2" htmlFor="height">
            <Ruler className="h-4 w-4 text-indigo-500" />
            قد (سانتی متر)
          </Label>
          <Input
            id="height"
            dir="ltr"
            className="text-left focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
            value={toPersianNumbers(value?.height || '')}
            onChange={(e) => {
              const cleanValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
              onChange && onChange('height', cleanValue);
            }}
            placeholder="۱۷۵"
          />
          {errors?.height && <p className="text-sm font-medium text-destructive">{errors.height}</p>}
        </div>
      </motion.div>

      {/* Weight Field */}
      <motion.div variants={itemVariants}>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 mb-2" htmlFor="weight">
            <Weight className="h-4 w-4 text-indigo-500" />
            وزن (کیلوگرم)
          </Label>
          <Input
            id="weight"
            dir="ltr"
            className="text-left focus-visible:ring-indigo-400 bg-slate-50 dark:bg-slate-800/50"
            value={toPersianNumbers(value?.weight || '')}
            onChange={(e) => {
              const cleanValue = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
              onChange && onChange('weight', cleanValue);
            }}
            placeholder="۷۵"
          />
          {errors?.weight && <p className="text-sm font-medium text-destructive">{errors.weight}</p>}
        </div>
      </motion.div>
    </div>
  );
};
