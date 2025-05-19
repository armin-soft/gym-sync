
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import StudentProgramManager from "@/components/students/program/StudentProgramManager";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentProgramManagerViewProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[]) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
  onClose: () => void;
}

const StudentProgramManagerView: React.FC<StudentProgramManagerViewProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onClose
}) => {
  const deviceInfo = useDeviceInfo();

  // Determine the appropriate classes based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
  };

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}>
        <StudentProgramManager 
          student={student}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
          onSaveExercises={onSaveExercises}
          onSaveDiet={onSaveDiet}
          onSaveSupplements={onSaveSupplements}
          onClose={onClose}
        />
      </div>
    </PageContainer>
  );
};

export default StudentProgramManagerView;
