
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExerciseSetsInputProps {
  exerciseId: number;
  sets: number;
  onSetsChange: (exerciseId: number, sets: number) => void;
  className?: string;
  showMultiplier?: boolean;
}

export const ExerciseSetsInput: React.FC<ExerciseSetsInputProps> = ({
  exerciseId,
  sets,
  onSetsChange,
  className,
  showMultiplier = false
}) => {
  const handleIncrement = () => {
    onSetsChange(exerciseId, Math.min(sets + 1, 10));
  };

  const handleDecrement = () => {
    onSetsChange(exerciseId, Math.max(sets - 1, 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 10) {
      onSetsChange(exerciseId, newValue);
    }
  };

  // If showMultiplier is true, display "1×{sets}" format
  if (showMultiplier) {
    return (
      <div className={cn(
        "inline-flex items-center justify-center bg-primary/10 text-primary font-medium px-2 py-1 rounded-md",
        className
      )}>
        <span>1×{sets}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 rounded-lg p-1.5",
        className
      )}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-md border-gray-200 dark:border-gray-700"
        onClick={handleDecrement}
        disabled={sets <= 1}
      >
        <Minus className="h-3.5 w-3.5" />
      </Button>
      
      <Input
        type="number"
        min={1}
        max={10}
        value={sets}
        onChange={handleInputChange}
        className="h-7 w-12 text-center border-0 bg-transparent text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-md border-gray-200 dark:border-gray-700"
        onClick={handleIncrement}
        disabled={sets >= 10}
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </motion.div>
  );
};

export default ExerciseSetsInput;
