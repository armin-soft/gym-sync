
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import ProgramExerciseTab from "./tabs/ProgramExerciseTab";
import ProgramDietTab from "./tabs/ProgramDietTab";
import ProgramSupplementTab from "./tabs/ProgramSupplementTab";

interface ProgramTabsContentProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[]) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}) => boolean;
  currentDay?: number;
  setCurrentDay?: React.Dispatch<React.SetStateAction<number>>;
}

const ProgramTabsContent: React.FC<ProgramTabsContentProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  currentDay = 1,
  setCurrentDay
}) => {
  return (
    <div className="mt-4 flex-1 overflow-hidden">
      <TabsContent value="exercise" className="h-full m-0 overflow-hidden">
        <ProgramExerciseTab 
          student={student}
          exercises={exercises}
          onSaveExercises={onSaveExercises}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      </TabsContent>
      
      <TabsContent value="diet" className="h-full m-0 overflow-hidden">
        <ProgramDietTab 
          student={student}
          meals={meals}
          onSaveDiet={onSaveDiet}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      </TabsContent>
      
      <TabsContent value="supplement" className="h-full m-0 overflow-hidden">
        <ProgramSupplementTab 
          student={student}
          supplements={supplements}
          onSaveSupplements={onSaveSupplements}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      </TabsContent>
    </div>
  );
};

export default ProgramTabsContent;
