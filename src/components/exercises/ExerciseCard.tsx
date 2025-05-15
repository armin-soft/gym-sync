
import React from "react";
import { Card } from "@/components/ui/card";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { ExerciseSetsInput } from "./ExerciseSetsInput";
import { ExerciseRepsInput } from "./ExerciseRepsInput";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
  exercise: Exercise;
  category?: ExerciseCategory;
  isSelected: boolean;
  onToggle: () => void;
  sets?: number;
  onSetsChange?: (value: number) => void;
  reps?: string;
  onRepsChange?: (value: string) => void;
  isTemporary?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  viewMode?: "grid" | "list";
  onClick?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  category,
  isSelected,
  onToggle,
  sets = 3,
  onSetsChange,
  reps = "8",
  onRepsChange,
  isTemporary = false,
  onEdit,
  onDelete,
  viewMode,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) onClick();
    if (onToggle) onToggle();
  };
  
  return (
    <Card 
      className={cn(
        "border overflow-hidden transition-all duration-300", 
        isSelected ? "border-blue-400 dark:border-blue-500" : "border-gray-200 dark:border-gray-800",
        isTemporary ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800" : ""
      )}
    >
      <div
        className="p-4 flex flex-col gap-2"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <CheckCircle 
              className={`h-5 w-5 mr-2 cursor-pointer ${isSelected ? "text-blue-500 fill-blue-500" : "text-gray-300 dark:text-gray-600"}`}
              onClick={handleClick}
            />
          </div>
          <div className="text-right">
            <h3 className="font-medium truncate max-w-[200px]">{exercise.name}</h3>
            {isTemporary && (
              <Badge className="mt-1 bg-purple-500 hover:bg-purple-600">
                حرکت گفتاری
              </Badge>
            )}
          </div>
        </div>
        
        {isSelected && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between items-center">
              <ExerciseSetsInput
                sets={sets || 3}
                onChange={onSetsChange}
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">تعداد ست</span>
            </div>
            
            <div className="flex justify-between items-center">
              <ExerciseRepsInput
                reps={reps || "8"}
                onChange={onRepsChange}
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">تکرار</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
