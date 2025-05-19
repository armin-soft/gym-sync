
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentProgramExerciseContentProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  exercises: any[];
}

const StudentProgramExerciseContent: React.FC<StudentProgramExerciseContentProps> = ({
  currentDay,
  setCurrentDay,
  selectedExercises,
  setSelectedExercises,
  exercises
}) => {
  return (
    <TabsContent value="exercise" className="m-0 h-full">
      <div className="mb-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">برنامه تمرینی</h3>
          <div className="flex items-center border rounded-md">
            {[1, 2, 3, 4].map(day => (
              <Button 
                key={day}
                variant={currentDay === day ? "default" : "ghost"}
                className="h-8 rounded-md"
                onClick={() => setCurrentDay(day)}
              >
                روز {toPersianNumbers(day)}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <StudentExerciseSelector 
            exercises={exercises}
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            dayNumber={currentDay}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
