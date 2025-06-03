
import React from "react";
import { Input } from "@/components/ui/input";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseSetsInputProps {
  exerciseId: number;
  sets: number;
  onSetsChange: (exerciseId: number, sets: number) => void;
  className?: string;
  isPersian?: boolean;
}

export const ExerciseSetsInput: React.FC<ExerciseSetsInputProps> = ({
  exerciseId,
  sets,
  onSetsChange,
  className = "",
  isPersian = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onSetsChange(exerciseId, value);
  };

  const displayValue = isPersian ? toPersianNumbers(sets) : sets.toString();

  return (
    <Input
      type="number"
      value={sets}
      onChange={handleChange}
      placeholder={isPersian ? toPersianNumbers(3) : "3"}
      className={className}
      min="1"
      max="20"
    />
  );
};
