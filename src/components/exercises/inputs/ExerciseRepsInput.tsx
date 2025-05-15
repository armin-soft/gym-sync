
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ExerciseRepsInputProps {
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  placeholder?: string;
}

export const ExerciseRepsInput: React.FC<ExerciseRepsInputProps> = ({
  value,
  onChange,
  size = "md",
  className,
  placeholder = "مثلا: ۸-۱۲"
}) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "h-7 px-2 py-1 text-xs";
      case "lg":
        return "h-10 px-4 py-2 text-base";
      default:
        return "h-9 px-3 py-1 text-sm";
    }
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(getSize(), "text-center", className)}
    />
  );
};

export default ExerciseRepsInput;
