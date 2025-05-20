
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { CardContent } from "@/components/ui/card";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";

// Import tab components
import { 
  ProgramExerciseTab, 
  ProgramDietTab, 
  ProgramSupplementTab 
} from "./tabs";

interface ProgramTabsContentProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
}

const ProgramTabsContent: React.FC<ProgramTabsContentProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements
}) => {
  return (
    <CardContent className="p-4 pt-6 flex-1">
      <TabsContent value="exercise" className="m-0 h-full flex flex-col">
        <ProgramExerciseTab
          student={student}
          exercises={exercises}
          onSaveExercises={onSaveExercises}
        />
      </TabsContent>
      
      <TabsContent value="diet" className="m-0 h-full flex flex-col">
        <ProgramDietTab
          student={student}
          meals={meals}
          onSaveDiet={onSaveDiet}
        />
      </TabsContent>
      
      <TabsContent value="supplement" className="m-0 h-full flex flex-col">
        <ProgramSupplementTab
          student={student}
          supplements={supplements}
          onSaveSupplements={onSaveSupplements}
        />
      </TabsContent>
    </CardContent>
  );
};

export default ProgramTabsContent;
