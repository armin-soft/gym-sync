
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound, Phone } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PersonalInfoSectionProps {
  control: {
    value: {
      name: string;
      phone: string;
    };
    onChange: (field: string, value: string) => void;
    errors: any;
  };
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
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <UserRound className="h-4 w-4 text-indigo-500" />
            نام و نام خانوادگی
          </Label>
          <Input
            value={control.value.name}
            onChange={(e) => control.onChange("name", e.target.value)}
            className={`${control.errors.name ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
            placeholder="نام و نام خانوادگی را وارد کنید"
          />
          {control.errors.name && (
            <p className="text-sm text-red-500 mt-1">{control.errors.name}</p>
          )}
        </div>
      </motion.div>
      
      {/* Phone Field */}
      <motion.div variants={itemVariants}>
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Phone className="h-4 w-4 text-indigo-500" />
            شماره موبایل
          </Label>
          <Input
            dir="ltr"
            className={`text-left ${control.errors.phone ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
            value={toPersianNumbers(control.value.phone)}
            onChange={(e) => control.onChange("phone", e.target.value)}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          />
          {control.errors.phone && (
            <p className="text-sm text-red-500 mt-1">{control.errors.phone}</p>
          )}
        </div>
      </motion.div>
    </>
  );
};
