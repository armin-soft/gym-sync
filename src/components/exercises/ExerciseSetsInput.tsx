
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseSetsInputProps {
  exerciseId?: number;
  sets: number;
  onSetsChange?: (exerciseId: number, sets: number) => void;
  onChange?: (sets: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const ExerciseSetsInput: React.FC<ExerciseSetsInputProps> = ({
  exerciseId,
  sets,
  onSetsChange,
  onChange,
  className,
  size = "md",
}) => {
  const handleDecrement = () => {
    if (sets > 1) {
      if (onSetsChange && exerciseId !== undefined) {
        onSetsChange(exerciseId, sets - 1);
      } else if (onChange) {
        onChange(sets - 1);
      }
    }
  };

  const handleIncrement = () => {
    if (sets < 10) {
      if (onSetsChange && exerciseId !== undefined) {
        onSetsChange(exerciseId, sets + 1);
      } else if (onChange) {
        onChange(sets + 1);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-md bg-muted/40 border border-border/50 p-1 select-none",
        size === "sm" ? "h-7" : "h-8",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full aspect-square rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted"
        onClick={handleDecrement}
        disabled={sets <= 1}
      >
        <Minus className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
        <span className="sr-only">کاهش</span>
      </Button>
      
      <div className="flex-1 flex items-center justify-center text-sm font-medium">
        {toPersianNumbers(sets)}
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full aspect-square rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted"
        onClick={handleIncrement}
        disabled={sets >= 10}
      >
        <Plus className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
        <span className="sr-only">افزایش</span>
      </Button>
    </div>
  );
};
