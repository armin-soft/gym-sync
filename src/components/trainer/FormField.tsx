
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  isValid?: boolean;
  type?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
}

export const FormField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon,
  error,
  isValid,
  type = "text",
  required = true,
  dir,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = id === 'password';

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
        {/* Icon */}
        <div className="pointer-events-none">{icon}</div>
        
        <Input
          id={id}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          dir={dir}
          className={cn(
            "pr-10 pl-10 transition-all duration-300 h-12 text-base",
            "border-gray-200 dark:border-gray-700",
            "focus:ring-2 focus:ring-offset-1",
            isFocused && "border-primary ring-primary/30",
            error ? "border-red-500 focus:ring-red-500/30" : 
                  isValid ? "border-green-500 focus:ring-green-500/30" : "",
            dir === "ltr" ? "text-left" : ""
          )}
          required={required}
          autoComplete={isPassword ? "new-password" : undefined}
        />
        
        {/* Show/hide password */}
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute left-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={showPassword ? "hide" : "show"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground/70" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground/70" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        )}
        
        {/* Valid indicator */}
        <AnimatePresence>
          {isValid && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute left-3 top-1/2 -translate-y-1/2"
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
