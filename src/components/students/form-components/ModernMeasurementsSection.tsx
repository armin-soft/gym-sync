
import React from "react";
import { motion } from "framer-motion";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Ruler, Weight, Coins } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernMeasurementsSectionProps {
  control: any;
  itemVariants: any;
}

export const ModernMeasurementsSection = ({ control, itemVariants }: ModernMeasurementsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Height Field */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Ruler className="h-4 w-4 text-white" />
                  </div>
                  قد (سانتی‌متر)
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      dir="ltr" 
                      className="h-12 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-200/70 dark:border-gray-700/70 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-0 transition-all duration-200 text-left placeholder:text-left pr-12" 
                      placeholder="175"
                      value={toPersianNumbers(field.value || '')}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                        field.onChange(value);
                      }}
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      سم
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="text-right" />
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
                <FormLabel className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Weight className="h-4 w-4 text-white" />
                  </div>
                  وزن (کیلوگرم)
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      dir="ltr" 
                      className="h-12 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-200/70 dark:border-gray-700/70 rounded-xl focus:border-red-500 dark:focus:border-red-400 focus:ring-0 transition-all duration-200 text-left placeholder:text-left pr-12" 
                      placeholder="75"
                      value={toPersianNumbers(field.value || '')}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                        field.onChange(value);
                      }}
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      کیلو
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Payment Field */}
      <motion.div variants={itemVariants}>
        <FormField
          control={control}
          name="payment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Coins className="h-4 w-4 text-white" />
                </div>
                مبلغ برنامه (تومان)
                <span className="text-gray-400 text-xs">(اختیاری)</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    dir="ltr" 
                    className="h-12 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-200/70 dark:border-gray-700/70 rounded-xl focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all duration-200 text-left placeholder:text-left pr-16" 
                    placeholder="500000"
                    value={toPersianNumbers(field.value || '')}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                      field.onChange(value);
                    }}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    تومان
                  </span>
                </div>
              </FormControl>
              <FormMessage className="text-right" />
              <p className="text-xs text-muted-foreground mt-2 text-right">
                مبلغ دریافتی بابت صدور برنامه‌های تمرینی و تغذیه
              </p>
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
};
