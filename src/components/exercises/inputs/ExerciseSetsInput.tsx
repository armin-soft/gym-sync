
import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExerciseSetsInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ExerciseSetsInput: React.FC<ExerciseSetsInputProps> = ({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
  className
}) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "h-7 min-h-[28px]";
      case "lg":
        return "h-10 min-h-[40px]";
      default:
        return "h-9 min-h-[36px]";
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const buttonSize = size === "sm" ? "h-7 w-7" : size === "lg" ? "h-10 w-10" : "h-9 w-9";
  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const valueSize = size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";

  return (
    <div
      className={cn(
        "flex items-stretch rounded-md overflow-hidden border border-input bg-transparent ring-offset-background",
        getSize(),
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn("px-2 rounded-r-none border-0", buttonSize)}
        onClick={handleDecrease}
        disabled={value <= min}
      >
        <Minus className={iconSize} />
      </Button>
      
      <div className={cn("flex-1 flex items-center justify-center font-medium border-l border-r border-input", valueSize)}>
        {value}
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn("px-2 rounded-l-none border-0", buttonSize)}
        onClick={handleIncrease}
        disabled={value >= max}
      >
        <Plus className={iconSize} />
      </Button>
    </div>
  );
};

export default ExerciseSetsInput;
