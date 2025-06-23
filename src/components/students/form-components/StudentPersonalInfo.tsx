
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Phone, Ruler, Weight, Coins } from "lucide-react";
import { StudentFormValues } from "@/lib/validations/student";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentPersonalInfoProps {
  form: UseFormReturn<StudentFormValues>;
}

export const StudentPersonalInfo: React.FC<StudentPersonalInfoProps> = ({ form }) => {
  return (
    <div className="w-full sm:w-2/3 flex flex-col gap-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-500" />
              نام و نام خانوادگی
            </FormLabel>
            <FormControl>
              <Input 
                className="bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                placeholder="نام و نام خانوادگی شاگرد" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-indigo-500" />
              شماره تماس
            </FormLabel>
            <FormControl>
              <Input 
                dir="ltr" 
                className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                value={toPersianNumbers(field.value)}
                onChange={(e) => {
                  const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-indigo-500" />
                قد (سانتی‌متر)
              </FormLabel>
              <FormControl>
                <Input 
                  dir="ltr" 
                  className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                  placeholder="۱۷۵" 
                  value={toPersianNumbers(field.value)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-indigo-500" />
                وزن (کیلوگرم)
              </FormLabel>
              <FormControl>
                <Input 
                  dir="ltr" 
                  className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                  placeholder="۸۰" 
                  value={toPersianNumbers(field.value)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="payment"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-indigo-500" />
              مبلغ برنامه (تومان)
              <span className="text-xs text-muted-foreground">(اختیاری)</span>
            </FormLabel>
            <FormControl>
              <Input 
                dir="ltr" 
                className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-indigo-500" 
                placeholder="۵۰۰,۰۰۰" 
                value={toPersianNumbers(field.value || '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
            <p className="text-xs text-muted-foreground mt-1">مبلغ دریافتی بابت صدور برنامه (اختیاری)</p>
          </FormItem>
        )}
      />
    </div>
  );
};
