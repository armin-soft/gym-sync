
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins } from "lucide-react";

interface PaymentFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  itemVariants: any;
}

export const PaymentField = ({ 
  value, 
  onChange, 
  error,
  itemVariants 
}: PaymentFieldProps) => {
  return (
    <motion.div variants={itemVariants}>
      <div>
        <Label className="flex items-center gap-2 mb-2">
          <Coins className="h-4 w-4 text-indigo-500" />
          <span>مبلغ (تومان)</span>
        </Label>
        <Input
          dir="ltr"
          className={`text-left ${error ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="۵۰۰,۰۰۰"
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">مبلغ صدور برنامه‌ها به تومان</p>
      </div>
    </motion.div>
  );
};
