
import React, { forwardRef, useImperativeHandle } from "react";
import { Student } from "./StudentTypes";
import { StudentDialog } from "./StudentDialog";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import { useStudentDialogs } from "@/hooks/useStudentDialogs";
import { StudentDialogContent as StudentDialogContentWrapper } from "@/components/students/dialogs/StudentDialogContent";

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
  handleAddExercise: (student: Student) => void;
  handleAddDiet: (student: Student) => void;
  handleAddSupplement: (student: Student) => void;
  handleDownload: (student: Student) => void;
}

interface StudentDialogManagerProps {
  onSave: (student: Student) => void;
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export const StudentDialogManager = forwardRef<StudentDialogManagerRef, StudentDialogManagerProps>(
  ({ 
    onSave, 
    onSaveExercises, 
    onSaveDiet, 
    onSaveSupplements,
    exercises,
    meals,
    supplements 
  }, ref) => {
    const {
      selectedStudent,
      isDialogOpen,
      setIsDialogOpen,
      isExerciseDialogOpen,
      setIsExerciseDialogOpen,
      isDietDialogOpen,
      setIsDietDialogOpen,
      isSupplementDialogOpen,
      setIsSupplementDialogOpen,
      isDownloadDialogOpen,
      setIsDownloadDialogOpen,
      selectedStudentForExercise,
      selectedStudentForDiet,
      selectedStudentForSupplement,
      selectedStudentForDownload,
      handleEdit,
      handleAdd,
      handleAddExercise,
      handleAddDiet,
      handleAddSupplement,
      handleDownload
    } = useStudentDialogs();

    useImperativeHandle(ref, () => ({
      handleAdd,
      handleEdit,
      handleAddExercise,
      handleAddDiet,
      handleAddSupplement,
      handleDownload
    }));

    const handleSaveWrapper = (student: Student) => {
      onSave(student);
      setIsDialogOpen(false);
    };

    const handleSaveExercisesWrapper = (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
      return onSaveExercises(exercisesWithSets, studentId, dayNumber);
    };

    const handleSaveDietWrapper = (mealIds: number[], studentId: number) => {
      return onSaveDiet(mealIds, studentId);
    };

    const handleSaveSupplementsWrapper = (data: {supplements: number[], vitamins: number[]}, studentId: number) => {
      return onSaveSupplements(data, studentId);
    };

    return (
      <>
        <StudentDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveWrapper}
          student={selectedStudent}
        />
        
        {/* Render StudentDialogContentWrapper with the appropriate props */}
        {selectedStudent && (
          <StudentDialogContentWrapper
            student={selectedStudent}
            onSave={handleSaveWrapper}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
      </>
    );
  }
);

StudentDialogManager.displayName = "StudentDialogManager";
