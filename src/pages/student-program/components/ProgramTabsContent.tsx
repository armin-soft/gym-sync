
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { ProgramExerciseTab, ProgramDietTab, ProgramSupplementTab } from "./tabs";

interface ProgramTabsContentProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[]) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
  onShowPdfPreview?: () => void;
}

const ProgramTabsContent: React.FC<ProgramTabsContentProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onShowPdfPreview
}) => {
  return (
    <div className="flex-1">
      <TabsContent value="exercise" className="mt-0">
        <ProgramExerciseTab
          student={student}
          exercises={exercises}
          onSaveExercises={onSaveExercises}
          onShowPdfPreview={onShowPdfPreview}
        />
      </TabsContent>
      
      <TabsContent value="diet" className="mt-0">
        <ProgramDietTab
          student={student}
          meals={meals}
          onSaveDiet={onSaveDiet}
          onShowPdfPreview={onShowPdfPreview}
        />
      </TabsContent>
      
      <TabsContent value="supplement" className="mt-0">
        <ProgramSupplementTab
          student={student}
          supplements={supplements}
          onSaveSupplements={onSaveSupplements}
          onShowPdfPreview={onShowPdfPreview}
        />
      </TabsContent>
    </div>
  );
};

export default ProgramTabsContent;
