
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import { cn } from "@/lib/utils";

interface StudentProgramExerciseContentProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  exercises: any[]; // Add exercises prop
}

const StudentProgramExerciseContent: React.FC<StudentProgramExerciseContentProps> = ({
  currentDay,
  setCurrentDay,
  selectedExercises,
  setSelectedExercises,
  exercises, // Add exercises prop
}) => {
  return (
    <TabsContent value="exercise" className="m-0 h-full">
      <div className="mb-4 h-full flex flex-col rtl">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center border rounded-md">
            {[1, 2, 3, 4].map(day => (
              <Button 
                key={day}
                variant={currentDay === day ? "default" : "ghost"}
                className={cn(
                  "h-10 rounded-md px-5",
                  currentDay === day ? "bg-indigo-600 hover:bg-indigo-700" : ""
                )}
                onClick={() => setCurrentDay(day)}
              >
                روز {toPersianNumbers(day)}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <StudentExerciseSelector 
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            dayNumber={currentDay}
            exercises={exercises} // Pass exercises down to the selector
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
