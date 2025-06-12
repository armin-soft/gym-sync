
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";

interface ProgramExerciseTabProps {
  student: Student;
  exercises: any[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
}

const ProgramExerciseTab: React.FC<ProgramExerciseTabProps> = ({
  student,
  exercises,
  onSaveExercises
}) => {
  return (
    <TabsContent value="exercise">
      <div className="p-4">
        <h3>برنامه تمرینی {student.name}</h3>
      </div>
    </TabsContent>
  );
};

export default ProgramExerciseTab;
