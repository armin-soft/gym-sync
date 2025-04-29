
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FormTextAreaProps {
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

export const FormTextArea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon,
  error,
  isValid,
  required = true,
}: FormTextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1.5">
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
            "resize-none h-40 transition-all duration-300 text-base",
            "pr-10",
            "border-gray-200 dark:border-gray-700",
            "focus:ring-2 focus:ring-offset-1",
            isFocused && "border-primary ring-primary/30",
            error ? "border-red-500 focus:ring-red-500/30" : 
                  isValid ? "border-green-500 focus:ring-green-500/30" : ""
          )}
          required={required}
        />
        
        {/* Valid indicator */}
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
        
        {/* Focus ring indicator */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-md ring-2 ring-primary/30 ring-offset-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
