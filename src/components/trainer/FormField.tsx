
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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
  const isPassword = id === 'password';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Label>{label}</Label>
      <div className="relative">
        {icon}
        <Input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className={cn(
            "pr-10 pl-10 transition-all duration-200",
            error ? "border-red-500 focus-visible:ring-red-500" : 
                  isValid ? "border-green-500 focus-visible:ring-green-500" : "",
            dir === "ltr" ? "text-left" : ""
          )}
          required={required}
        />
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            className="absolute left-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground/70" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground/70" />
            )}
          </Button>
        )}
        {isValid && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-3 top-3"
          >
            <Check className="h-4 w-4 text-green-500" />
          </motion.div>
        )}
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
