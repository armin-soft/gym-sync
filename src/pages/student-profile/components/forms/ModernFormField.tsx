
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, Check, AlertCircle } from "lucide-react";

interface ModernFormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon: LucideIcon;
  error?: string;
  isValid?: boolean;
  required?: boolean;
  type?: "text" | "email" | "tel" | "number";
  textarea?: boolean;
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
  required,
  type = "text",
  textarea = false,
  rows = 3
}) => {
  const fieldClasses = `
    w-full px-4 py-3 pr-12 rounded-2xl border-2 transition-all duration-300
    bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm
    text-slate-900 dark:text-white placeholder:text-slate-400
    focus:outline-none focus:ring-0
    ${error 
      ? 'border-red-300 focus:border-red-500' 
      : isValid 
        ? 'border-emerald-300 focus:border-emerald-500'
        : 'border-slate-200 dark:border-slate-600 focus:border-emerald-400'
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      
      <div className="relative">
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
          <Icon className={`w-5 h-5 ${
            error 
              ? 'text-red-400' 
              : isValid 
                ? 'text-emerald-500'
                : 'text-slate-400'
          }`} />
        </div>
        
        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={fieldClasses}
            style={{ resize: 'none' }}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={fieldClasses}
          />
        )}
        
        {/* نشانگر وضعیت */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {error ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : isValid ? (
            <Check className="w-5 h-5 text-emerald-500" />
          ) : null}
        </div>
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 pr-3"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
