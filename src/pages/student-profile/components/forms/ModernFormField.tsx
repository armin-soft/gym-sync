
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, AlertCircle, LucideIcon } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernFormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
  error?: string;
  isValid?: boolean;
  type?: "text" | "number" | "select";
  options?: { value: string; label: string }[];
}

export const ModernFormField: React.FC<ModernFormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  isValid,
  type = "text",
  options
}) => {
  const handleChange = (newValue: string) => {
    if (type === "number") {
      // فقط اعداد انگلیسی را قبول کن
      const numbersOnly = newValue.replace(/[^0-9]/g, '');
      onChange(numbersOnly);
    } else {
      onChange(newValue);
    }
  };

  const displayValue = type === "number" ? toPersianNumbers(value) : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      <Label className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
        <div className="w-8 h-8 bg-emerald-100/80 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
          <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        {label}
      </Label>

      <div className="relative">
        {type === "select" ? (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="h-12 bg-white/60 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl backdrop-blur-sm">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type={type === "number" ? "text" : "text"}
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={type === "number" ? toPersianNumbers(placeholder) : placeholder}
            className="h-12 bg-white/60 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl pl-12 backdrop-blur-sm"
            dir={type === "number" ? "ltr" : "rtl"}
          />
        )}

        {/* Status indicator */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {error ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : isValid ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full" />
          )}
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
