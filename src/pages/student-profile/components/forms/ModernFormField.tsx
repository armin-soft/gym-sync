
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernFormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  error?: string;
  isValid?: boolean;
  type?: "text" | "number" | "select";
  options?: { value: string; label: string }[];
  disabled?: boolean;
  readOnly?: boolean;
}

export const ModernFormField: React.FC<ModernFormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  error = "",
  isValid = false,
  type = "text",
  options = [],
  disabled = false,
  readOnly = false
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let inputValue = e.target.value;
    
    // For number inputs, handle Persian to English conversion
    if (type === "number") {
      inputValue = inputValue.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
    }
    
    onChange(inputValue);
  };

  const displayValue = type === "number" ? toPersianNumbers(value) : value;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        {Icon && <Icon className="h-4 w-4 text-emerald-500" />}
        {label}
      </label>
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-slate-400" />
          </div>
        )}
        
        {type === "select" ? (
          <select
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            className={cn(
              "w-full py-3 px-4 bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-slate-100 text-right transition-colors",
              Icon ? "pr-10" : "pr-4",
              error
                ? "border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500"
                : isValid
                ? "border-green-300 dark:border-green-700 focus:border-green-500 focus:ring-green-500"
                : "border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type === "number" ? "text" : type}
            value={displayValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={cn(
              "w-full py-3 px-4 bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-slate-100 text-right transition-colors",
              Icon ? "pr-10" : "pr-4",
              error
                ? "border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500"
                : isValid
                ? "border-green-300 dark:border-green-700 focus:border-green-500 focus:ring-green-500"
                : "border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500",
              (disabled || readOnly) && "opacity-50 cursor-not-allowed"
            )}
          />
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};
