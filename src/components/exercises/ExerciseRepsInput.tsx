
import React from "react";
import { Input } from "@/components/ui/input";

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
  className = ""
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRepsChange(exerciseId, e.target.value);
  };

  return (
    <Input
      type="text"
      value={reps}
      onChange={handleChange}
      placeholder="10-12"
      className={className}
    />
  );
};
