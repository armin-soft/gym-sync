
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Exercise } from "@/types/exercise";
import { ExerciseSetsInput } from "./ExerciseSetsInput";
import { ExerciseRepsInput } from "./ExerciseRepsInput";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExerciseTableProps {
  exercises: Exercise[];
  selectedExercises: number[];
  onToggleExercise: (id: number) => void;
  exerciseSets: Record<number, number>;
  onSetsChange: (id: number, sets: number) => void;
  exerciseReps: Record<number, string>;
  onRepsChange: (id: number, reps: string) => void;
  temporaryExerciseId?: number;
}

export const ExerciseTable: React.FC<ExerciseTableProps> = ({
  exercises,
  selectedExercises,
  onToggleExercise,
  exerciseSets,
  onSetsChange,
  exerciseReps,
  onRepsChange,
  temporaryExerciseId
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="w-16 p-2 text-center"></th>
            <th className="p-2 text-right">نام حرکت</th>
            <th className="w-24 p-2 text-center">ست</th>
            <th className="w-36 p-2 text-center">تکرار</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr 
              key={exercise.id} 
              className={cn(
                "border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                exercise.id === temporaryExerciseId ? "bg-purple-50 dark:bg-purple-900/20" : ""
              )}
            >
              <td className="p-2 text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={selectedExercises.includes(exercise.id)}
                    onCheckedChange={() => onToggleExercise(exercise.id)}
                  />
                </div>
              </td>
              <td className="p-2 text-right">
                <div className="flex flex-col items-end">
                  <span>{exercise.name}</span>
                  {exercise.id === temporaryExerciseId && (
                    <Badge className="mt-1 bg-purple-500 hover:bg-purple-600 text-xs">
                      حرکت گفتاری
                    </Badge>
                  )}
                </div>
              </td>
              <td className="p-2 text-center">
                {selectedExercises.includes(exercise.id) && (
                  <ExerciseSetsInput
                    sets={exerciseSets[exercise.id] || 3}
                    onChange={(value) => onSetsChange(exercise.id, value)}
                    size="sm"
                  />
                )}
              </td>
              <td className="p-2 text-center">
                {selectedExercises.includes(exercise.id) && (
                  <ExerciseRepsInput
                    reps={exerciseReps[exercise.id] || "8"}
                    onChange={(value) => onRepsChange(exercise.id, value)}
                    size="sm"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
