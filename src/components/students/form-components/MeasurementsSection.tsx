
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler, Weight } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface MeasurementsSectionProps {
  control: {
    value: {
      height: string;
      weight: string;
    };
    onChange: (field: string, value: string) => void;
    errors: any;
  };
  itemVariants: any;
}

export const MeasurementsSection = ({ 
  control, 
  itemVariants 
}: MeasurementsSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Height Field */}
      <motion.div variants={itemVariants}>
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Ruler className="h-4 w-4 text-indigo-500" />
            قد (سانتی متر)
          </Label>
          <Input
            dir="ltr"
            className={`text-left ${control.errors.height ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
            value={toPersianNumbers(control.value.height)}
            onChange={(e) => control.onChange("height", e.target.value)}
            placeholder="۱۷۵"
          />
          {control.errors.height && (
            <p className="text-sm text-red-500 mt-1">{control.errors.height}</p>
          )}
        </div>
      </motion.div>

      {/* Weight Field */}
      <motion.div variants={itemVariants}>
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Weight className="h-4 w-4 text-indigo-500" />
            وزن (کیلوگرم)
          </Label>
          <Input
            dir="ltr"
            className={`text-left ${control.errors.weight ? "border-red-500 focus-visible:ring-red-400" : "focus-visible:ring-indigo-400"} bg-slate-50 dark:bg-slate-800/50`}
            value={toPersianNumbers(control.value.weight)}
            onChange={(e) => control.onChange("weight", e.target.value)}
            placeholder="۷۵"
          />
          {control.errors.weight && (
            <p className="text-sm text-red-500 mt-1">{control.errors.weight}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
