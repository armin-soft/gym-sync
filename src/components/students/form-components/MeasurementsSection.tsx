
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Ruler, Weight } from "lucide-react";
import { Student } from "../StudentTypes";

interface MeasurementsSectionProps {
  form: UseFormReturn<Student>;
}

export const MeasurementsSection: React.FC<MeasurementsSectionProps> = ({ form }) => {
  const { register } = form;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 mb-4 border-b border-emerald-100 dark:border-emerald-800">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20">
          <Ruler className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">اندازه‌گیری‌ها</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height" className="text-emerald-700 dark:text-emerald-300 font-medium">
            قد (سانتی‌متر)
          </Label>
          <div className="relative">
            <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
            <Input
              id="height"
              type="number"
              {...register("height", { valueAsNumber: true })}
              placeholder="170"
              className="pr-10 border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="text-emerald-700 dark:text-emerald-300 font-medium">
            وزن (کیلوگرم)
          </Label>
          <div className="relative">
            <Weight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
            <Input
              id="weight"
              type="number"
              {...register("weight", { valueAsNumber: true })}
              placeholder="70"
              className="pr-10 border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
