import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogContentCore } from "./dialogs/StudentDialogContent";
import { Student } from "./StudentTypes";
import { ExerciseWithSets } from "@/hooks/exercise-selection";

interface StudentDialogContentProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isExerciseDialogOpen: boolean;
  setIsExerciseDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDietDialogOpen: boolean;
  setIsDietDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSupplementDialogOpen: boolean;
  setIsSupplementDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDownloadDialogOpen: boolean;
  setIsDownloadDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStudent?: Student;
  selectedStudentForExercise: Student | null;
  selectedStudentForDiet: Student | null;
  selectedStudentForSupplement: Student | null;
  selectedStudentForDownload: Student | null;
  handleSaveWrapper: (student: Student) => void;
  handleSaveExercisesWrapper: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => void;
  handleSaveDietWrapper: (mealIds: number[], studentId: number) => void;
  handleSaveSupplementsWrapper: (data: {supplements: number[], vitamins: number[]}, studentId: number) => void;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export const StudentDialogContent: React.FC<StudentDialogContentProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedStudent,
  handleSaveWrapper,
  // Other props are not used directly in this component but will be passed along
}) => {
  return (
    <>
      {/* Main student dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 h-[90vh] max-h-[90vh] overflow-hidden">
          <DialogContentCore
            student={selectedStudent}
            onSave={handleSaveWrapper}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Other dialogs would go here */}
    </>
  );
};
