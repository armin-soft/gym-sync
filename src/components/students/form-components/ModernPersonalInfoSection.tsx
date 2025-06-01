
import React from "react";
import { motion } from "framer-motion";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Phone, Calendar, GraduationCap, Users } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernPersonalInfoSectionProps {
  control: any;
  itemVariants: any;
}

export const ModernPersonalInfoSection = ({ control, itemVariants }: ModernPersonalInfoSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Name Field */}
      <motion.div variants={itemVariants}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                نام و نام خانوادگی
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  className="h-12 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-200/70 dark:border-gray-700/70 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 transition-all duration-200 text-right placeholder:text-right" 
                  placeholder="نام و نام خانوادگی شاگرد را وارد کنید"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-right" />
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
              <FormLabel className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                شماره موبایل
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  dir="ltr" 
                  className="h-12 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-200/70 dark:border-gray-700/70 rounded-xl focus:border-green-500 dark:focus:border-green-400 focus:ring-0 transition-all duration-200 text-left placeholder:text-left font-mono" 
                  placeholder="09123456789"
                  value={toPersianNumbers(field.value)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage className="text-right" />
            </FormItem>
          )}
        />
      </motion.div>

      {/* Age Field */}
      <motion.div variants={itemVariants}>
        <FormField
          control={control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                سن
                <span className="text-gray-400 text-xs">(اختیاری)</span>
              </FormLabel>
              <FormControl>
                <Input 
                  dir="ltr" 
                  className="h-12 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-200/70 dark:border-gray-700/70 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:ring-0 transition-all duration-200 text-left placeholder:text-left" 
                  placeholder="25"
                  value={toPersianNumbers(field.value || '')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage className="text-right" />
            </FormItem>
          )}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grade Field */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  رده/مرحله
                  <span className="text-gray-400 text-xs">(اختیاری)</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    className="h-12 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-200/70 dark:border-gray-700/70 rounded-xl focus:border-orange-500 dark:focus:border-orange-400 focus:ring-0 transition-all duration-200 text-right placeholder:text-right" 
                    placeholder="مبتدی، متوسط، پیشرفته"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Group Field */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  گروه
                  <span className="text-gray-400 text-xs">(اختیاری)</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    className="h-12 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-200/70 dark:border-gray-700/70 rounded-xl focus:border-teal-500 dark:focus:border-teal-400 focus:ring-0 transition-all duration-200 text-right placeholder:text-right" 
                    placeholder="گروه A، گروه صبح، گروه عصر"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>
    </div>
  );
};
