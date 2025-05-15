
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Check, Minus, Plus } from "lucide-react";
import { ExerciseSetsInput } from "./ExerciseSetsInput";
import { ExerciseRepsInput } from "./ExerciseRepsInput";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/types/exercise";
import { Badge } from "@/components/ui/badge";

interface StudentExerciseCardProps {
  exercise: Exercise;
  isSelected: boolean;
  sets: number;
  reps: string;
  onClick: () => void;
  onSetsChange: (exerciseId: number, sets: number) => void;
  onRepsChange: (exerciseId: number, reps: string) => void;
  viewMode?: "grid" | "list";
  categories: any[];
  className?: string;
}

export const StudentExerciseCard: React.FC<StudentExerciseCardProps> = ({
  exercise,
  isSelected,
  sets,
  reps,
  onClick,
  onSetsChange,
  onRepsChange,
  viewMode = "grid",
  categories,
  className,
}) => {
  const [useSpeech, setUseSpeech] = useState(false);
  
  const category = categories.find((c) => c.id === exercise.categoryId);
  const categoryName = category?.name || "";

  const handleSetsChange = (id: number, value: number) => {
    onSetsChange(id, value);
  };

  const handleRepsChange = (id: number, value: string) => {
    onRepsChange(id, value);
  };

  const toggleSpeech = () => {
    setUseSpeech(!useSpeech);
  };

  if (viewMode === "list") {
    return (
      <Card
        className={cn(
          "relative p-2 border transition-colors",
          isSelected
            ? "border-primary bg-primary/5 dark:bg-primary/10"
            : "hover:border-gray-400 dark:hover:border-gray-600",
          className
        )}
      >
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "w-8 h-8 p-0",
                isSelected
                  ? "text-white bg-primary hover:bg-primary/90"
                  : "text-muted-foreground"
              )}
              onClick={onClick}
            >
              {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
            <div className="text-right">
              <h3 className="text-base font-medium">{exercise.name}</h3>
              <Badge variant="outline" className="text-xs bg-muted/30">
                {categoryName}
              </Badge>
            </div>
          </div>
          
          {isSelected && (
            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleSpeech}
                className="h-7 px-2 text-xs"
              >
                {useSpeech ? "ورود دستی" : "ورود با گفتار"}
              </Button>
              <ExerciseSetsInput
                exerciseId={exercise.id}
                setsValue={sets}
                onSetsChange={handleSetsChange}
                showLabel={false}
                className="w-20"
                useSpeech={useSpeech}
              />
              <ExerciseRepsInput
                exerciseId={exercise.id}
                repsValue={reps}
                onRepsChange={handleRepsChange}
                showLabel={false}
                className="w-32"
                useSpeech={useSpeech}
              />
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-colors",
        isSelected
          ? "border-primary bg-primary/5 dark:bg-primary/10"
          : "hover:border-gray-400 dark:hover:border-gray-600",
        className
      )}
    >
      <div
        className="p-3 text-right flex-1 flex flex-col cursor-pointer"
        onClick={onClick}
      >
        <div className="flex justify-between items-start mb-2">
          <Button
            size="sm"
            variant={isSelected ? "default" : "ghost"}
            className={cn(
              "w-8 h-8 p-0 mr-auto",
              isSelected && "text-primary-foreground"
            )}
          >
            {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
          <Badge variant="outline" className="text-xs bg-muted/30">
            {categoryName}
          </Badge>
        </div>
        <h3 className="text-base font-medium mt-1">{exercise.name}</h3>
      </div>

      {isSelected && (
        <div className="p-3 pt-0">
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleSpeech}
            className="mb-2 h-7 px-2 text-xs w-full"
          >
            {useSpeech ? "ورود دستی" : "ورود با گفتار"}
          </Button>
          <div className="flex items-center gap-2">
            <ExerciseSetsInput
              exerciseId={exercise.id}
              setsValue={sets}
              onSetsChange={handleSetsChange}
              showLabel={true}
              className="w-full"
              useSpeech={useSpeech}
            />
            <ExerciseRepsInput
              exerciseId={exercise.id}
              repsValue={reps}
              onRepsChange={handleRepsChange}
              showLabel={true}
              className="w-full"
              useSpeech={useSpeech}
            />
          </div>
        </div>
      )}
    </Card>
  );
};
