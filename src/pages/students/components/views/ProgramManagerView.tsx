
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";
import StudentProgramManagerView from "../program/StudentProgramManagerView";

interface ProgramManagerViewProps {
  selectedStudentForProgram: Student;
  exercises: any[];
  meals: any[];
  supplements: any[];
  onSaveExercisesWithHistory: (exercisesWithSets: any[], studentId: number, dayNumber?: number) => boolean;
  onSaveDietWithHistory: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplementsWithHistory: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  onClose: () => void;
}

const ProgramManagerView: React.FC<ProgramManagerViewProps> = ({
  selectedStudentForProgram,
  exercises,
  meals,
  supplements,
  onSaveExercisesWithHistory,
  onSaveDietWithHistory,
  onSaveSupplementsWithHistory,
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
        <StudentProgramManagerView 
          student={selectedStudentForProgram}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
          onSaveExercises={(exercisesWithSets, dayNumber) => 
            onSaveExercisesWithHistory(exercisesWithSets, selectedStudentForProgram.id, dayNumber)
          }
          onSaveDiet={(mealIds) => 
            onSaveDietWithHistory(mealIds, selectedStudentForProgram.id)
          }
          onSaveSupplements={(data) => 
            onSaveSupplementsWithHistory(data, selectedStudentForProgram.id)
          }
          onClose={onClose}
        />
      </div>
    </PageContainer>
  );
};

export default ProgramManagerView;
