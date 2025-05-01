
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TypeSelectorProps {
  exerciseTypes: string[];
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  exerciseTypes,
  selectedExerciseType,
  setSelectedExerciseType,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedExerciseType || "انتخاب نوع حرکت"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>نوع حرکت</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {exerciseTypes.map((type) => (
          <DropdownMenuItem
            key={type}
            className={cn(
              "flex items-center justify-between",
              selectedExerciseType === type ? "bg-indigo-50 text-indigo-700 font-medium" : ""
            )}
            onClick={() => setSelectedExerciseType(type)}
          >
            {type}
            {selectedExerciseType === type && <Check className="h-4 w-4 text-indigo-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
