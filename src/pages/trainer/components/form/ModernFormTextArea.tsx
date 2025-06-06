
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ModernFormTextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  error?: string;
  isValid?: boolean;
  required?: boolean;
}

export const ModernFormTextArea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon,
  error,
  isValid,
  required = false
}: ModernFormTextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id}
        className={cn(
          "text-sm font-medium transition-colors",
          isFocused ? "text-primary" : "text-gray-700 dark:text-gray-300"
        )}
      >
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </Label>
      
      <div className="relative">
        {icon && <div className="pointer-events-none">{icon}</div>}
        
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "resize-none h-32 transition-all duration-300 text-base border-2",
            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm",
            "border-gray-200 dark:border-gray-700",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "hover:border-gray-300 dark:hover:border-gray-600",
            "pr-10 pl-10",
            isFocused && "border-primary ring-2 ring-primary/20 shadow-lg",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "",
            isValid ? "border-green-500 focus:border-green-500 focus:ring-green-500/20" : ""
          )}
        />
        
        {/* نشانگر معتبر بودن */}
        <AnimatePresence>
          {isValid && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute left-3 top-3"
            >
              <Check className="h-5 w-5 text-green-500" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* حلقه فوکوس */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-md ring-2 ring-primary/30 ring-offset-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* پیام خطا */}
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="text-sm text-red-500 mt-1 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
