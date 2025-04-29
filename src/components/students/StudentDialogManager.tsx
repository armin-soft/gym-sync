
import React, { forwardRef, useImperativeHandle } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useStudentDialogs } from "@/hooks/useStudentDialogs";
import { useStudentDialogHandlers, DialogHandlerOptions } from "@/hooks/useStudentDialogHandlers";
import { StudentDialogContent } from "@/components/students/dialogs/StudentDialogContent";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentDialogManagerProps {
  onSave: (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => boolean;
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
  handleAddExercise: (student: Student) => void;
  handleAddDiet: (student: Student) => void;
  handleAddSupplement: (student: Student) => void;
  handleDownload: (student: Student) => void;
}

export const StudentDialogManager = forwardRef<StudentDialogManagerRef, StudentDialogManagerProps>(({
  onSave,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  exercises,
  meals,
  supplements
}, ref) => {
  const {
    // Dialog states
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
    
    // Selected students for different dialogs
    selectedStudentForExercise,
    selectedStudentForDiet,
    selectedStudentForSupplement,
    selectedStudentForDownload,
    
    // Handler functions
    handleEdit,
    handleAdd,
    handleAddExercise,
    handleAddDiet,
    handleAddSupplement,
    handleDownload
  } = useStudentDialogs();

  const handlerOptions: DialogHandlerOptions = {
    onSave,
    onSaveExercises,
    onSaveDiet,
    onSaveSupplements,
    selectedStudent,
    selectedStudentForExercise,
    selectedStudentForDiet,
    selectedStudentForSupplement,
    setIsExerciseDialogOpen,
    setIsDietDialogOpen,
    setIsSupplementDialogOpen,
    setIsDialogOpen
  };

  const {
    handleSaveWrapper,
    handleSaveExercisesWrapper,
    handleSaveDietWrapper,
    handleSaveSupplementsWrapper
  } = useStudentDialogHandlers(handlerOptions);

  useImperativeHandle(ref, () => ({
    handleAdd,
    handleEdit,
    handleAddExercise,
    handleAddDiet,
    handleAddSupplement,
    handleDownload
  }));

  return (
    <StudentDialogContent
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      isExerciseDialogOpen={isExerciseDialogOpen}
      setIsExerciseDialogOpen={setIsExerciseDialogOpen}
      isDietDialogOpen={isDietDialogOpen}
      setIsDietDialogOpen={setIsDietDialogOpen}
      isSupplementDialogOpen={isSupplementDialogOpen}
      setIsSupplementDialogOpen={setIsSupplementDialogOpen}
      isDownloadDialogOpen={isDownloadDialogOpen}
      setIsDownloadDialogOpen={setIsDownloadDialogOpen}
      selectedStudent={selectedStudent}
      selectedStudentForExercise={selectedStudentForExercise}
      selectedStudentForDiet={selectedStudentForDiet}
      selectedStudentForSupplement={selectedStudentForSupplement}
      selectedStudentForDownload={selectedStudentForDownload}
      handleSaveWrapper={handleSaveWrapper}
      handleSaveExercisesWrapper={handleSaveExercisesWrapper}
      handleSaveDietWrapper={handleSaveDietWrapper}
      handleSaveSupplementsWrapper={handleSaveSupplementsWrapper}
      exercises={exercises}
      meals={meals}
      supplements={supplements}
    />
  );
});
