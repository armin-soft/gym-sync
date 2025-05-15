
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SimpleSpeechInput } from "@/pages/exercises/hierarchical-view/components/exercises-stage/advanced-speech-input";

interface ExerciseSetsInputProps {
  exerciseId: number;
  setsValue: number;
  onSetsChange: (exerciseId: number, sets: number) => void;
  label?: string;
  className?: string;
  showLabel?: boolean;
  useSpeech?: boolean;
}

export const ExerciseSetsInput: React.FC<ExerciseSetsInputProps> = ({
  exerciseId,
  setsValue = 3,
  onSetsChange,
  label = "تعداد ست‌ها",
  className = "",
  showLabel = true,
  useSpeech = false
}) => {
  const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    onSetsChange(exerciseId, value);
  };

  const handleSpeechChange = (value: string) => {
    const numValue = parseInt(value) || 1;
    onSetsChange(exerciseId, numValue);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <Label htmlFor={`exercise-sets-${exerciseId}`} className="text-sm">
          {label}
        </Label>
      )}
      
      {useSpeech ? (
        <SimpleSpeechInput
          value={setsValue.toString()}
          onChange={(value) => handleSpeechChange(value)}
          placeholder="وارد کنید..."
          className="w-full text-right"
        />
      ) : (
        <Input
          id={`exercise-sets-${exerciseId}`}
          type="number"
          value={setsValue}
          onChange={handleSetsChange}
          className="h-8 text-center"
          min={1}
          max={20}
          dir="ltr"
        />
      )}
    </div>
  );
};
