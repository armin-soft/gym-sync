
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface ExerciseSetsInputProps {
  exerciseId: number;
  sets: number;
  onSetsChange: (exerciseId: number, sets: number) => void;
  className?: string;
}

export const ExerciseSetsInput: React.FC<ExerciseSetsInputProps> = ({
  exerciseId,
  sets,
  onSetsChange,
  className,
}) => {
  const handleDecrement = () => {
    if (sets > 1) {
      onSetsChange(exerciseId, sets - 1);
    }
  };

  const handleIncrement = () => {
    if (sets < 10) {
      onSetsChange(exerciseId, sets + 1);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center h-8 rounded-md bg-muted/40 border border-border/50 p-1 select-none",
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
        <Minus className="h-3 w-3" />
        <span className="sr-only">کاهش</span>
      </Button>
      
      <div className="flex-1 flex items-center justify-center text-sm font-medium">
        {sets}
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full aspect-square rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted"
        onClick={handleIncrement}
        disabled={sets >= 10}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">افزایش</span>
      </Button>
    </div>
  );
};
