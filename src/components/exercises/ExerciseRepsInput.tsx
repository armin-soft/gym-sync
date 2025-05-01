
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseRepsInputProps {
  exerciseId: number;
  reps: string;
  onRepsChange: (exerciseId: number, reps: string) => void;
  className?: string;
}

export const ExerciseRepsInput: React.FC<ExerciseRepsInputProps> = ({
  exerciseId,
  reps,
  onRepsChange,
  className,
}) => {
  // تبدیل رشته به عدد برای محاسبات
  const parseReps = (): number => {
    // اگر رشته حاوی خط تیره باشد، میانگین مقادیر را برمی‌گرداند
    if (reps.includes('-')) {
      const [min, max] = reps.split('-').map(Number);
      return Math.round((min + max) / 2);
    }
    // در غیر این صورت مقدار عددی را برمی‌گرداند یا مقدار پیش‌فرض 8
    return parseInt(reps) || 8;
  };

  const currentReps = parseReps();
  
  const handleDecrement = () => {
    if (currentReps > 1) {
      onRepsChange(exerciseId, String(currentReps - 1));
    }
  };

  const handleIncrement = () => {
    if (currentReps < 10) {
      onRepsChange(exerciseId, String(currentReps + 1));
    }
  };

  // تبدیل اعداد به فارسی برای نمایش
  const displayReps = () => {
    if (reps.includes('-')) {
      const [min, max] = reps.split('-');
      return `${toPersianNumbers(max)}-${toPersianNumbers(min)}`;
    }
    return toPersianNumbers(reps);
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
        disabled={currentReps <= 1}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">کاهش</span>
      </Button>
      
      <div className="flex-1 flex items-center justify-center text-sm font-medium">
        {displayReps()}
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full aspect-square rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted"
        onClick={handleIncrement}
        disabled={currentReps >= 10}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">افزایش</span>
      </Button>
    </div>
  );
};
