
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SimpleSpeechInput } from "@/pages/exercises/hierarchical-view/components/exercises-stage/advanced-speech-input";

interface ExerciseRepsInputProps {
  exerciseId: number;
  repsValue: string;
  onRepsChange: (exerciseId: number, reps: string) => void;
  label?: string;
  className?: string;
  showLabel?: boolean;
  useSpeech?: boolean;
}

export const ExerciseRepsInput: React.FC<ExerciseRepsInputProps> = ({
  exerciseId,
  repsValue = "",
  onRepsChange,
  label = "تعداد تکرارها",
  className = "",
  showLabel = true,
  useSpeech = false
}) => {
  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRepsChange(exerciseId, e.target.value);
  };

  const handleSpeechChange = (value: string) => {
    onRepsChange(exerciseId, value);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <Label htmlFor={`exercise-reps-${exerciseId}`} className="text-sm">
          {label}
        </Label>
      )}
      
      {useSpeech ? (
        <SimpleSpeechInput
          value={repsValue}
          onChange={(value) => handleSpeechChange(value)}
          placeholder="وارد کنید..."
          className="w-full text-right"
        />
      ) : (
        <Input
          id={`exercise-reps-${exerciseId}`}
          value={repsValue}
          onChange={handleRepsChange}
          className="h-8 text-center"
          placeholder="وارد کنید..."
          dir="rtl"
        />
      )}
    </div>
  );
};
