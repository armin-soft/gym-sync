
import React, { forwardRef, useImperativeHandle } from "react";
import { StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudentDialogs } from "@/hooks/useStudentDialogs";
import { useStudentDialogHandlers, DialogHandlerOptions } from "@/hooks/useStudentDialogHandlers";
import { StudentDialogContent } from "@/components/students/dialogs/StudentDialogContent";

interface StudentModernDialogManagerProps {
  onSave: (data: any, selectedStudent?: any) => boolean;
  onSaveExercises: (exercisesWithSets: any[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

const StudentModernDialogManager = forwardRef<StudentDialogManagerRef, StudentModernDialogManagerProps>(({
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

StudentModernDialogManager.displayName = "StudentModernDialogManager";
export default StudentModernDialogManager;
