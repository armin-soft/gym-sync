
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, Check, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ModernFormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
  error?: string;
  isValid?: boolean;
  type?: 'text' | 'email' | 'number' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
  rows?: number;
}

export const ModernFormField: React.FC<ModernFormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  isValid,
  type = 'text',
  options,
  rows = 4
}) => {
  const renderInput = () => {
    const baseClassName = `pr-12 h-14 bg-white/50 dark:bg-slate-800/50 border-2 transition-all duration-300 ${
      error 
        ? 'border-red-300 focus:border-red-500' 
        : isValid 
        ? 'border-emerald-300 focus:border-emerald-500'
        : 'border-slate-300 dark:border-slate-600 focus:border-sky-500'
    } rounded-xl shadow-sm focus:shadow-lg`;

    switch (type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`${baseClassName} min-h-[120px] pt-4`}
            rows={rows}
          />
        );
      
      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={baseClassName}>
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
        );
      
      default:
        return (
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={baseClassName}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </Label>
      
      <div className="relative">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <Icon className={`h-5 w-5 ${
            error 
              ? 'text-red-400' 
              : isValid 
              ? 'text-emerald-500'
              : 'text-slate-400'
          }`} />
        </div>
        
        {renderInput()}
        
        {(error || isValid) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          >
            {error ? (
              <AlertCircle className="h-5 w-5 text-red-400" />
            ) : (
              <Check className="h-5 w-5 text-emerald-500" />
            )}
          </motion.div>
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
