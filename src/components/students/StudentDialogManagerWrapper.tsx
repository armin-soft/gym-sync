
import React, { forwardRef, useImperativeHandle } from "react";
import { Student } from "@/components/students/StudentTypes";
import { StudentDialog } from "@/components/students/StudentDialog";
import { ExerciseDialog } from "@/components/students/ExerciseDialog";
import { DietDialog } from "@/components/students/DietDialog";
import { SupplementDialog } from "@/components/students/SupplementDialog";
import { DownloadDialog } from "@/components/students/DownloadDialog";
import { useStudentDialogs } from "@/hooks/useStudentDialogs";
import { useToast } from "@/hooks/use-toast";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentDialogManagerWrapperProps {
  onSave: (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => boolean;
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export interface StudentDialogManagerWrapperRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
  handleAddExercise: (student: Student) => void;
  handleAddDiet: (student: Student) => void;
  handleAddSupplement: (student: Student) => void;
  handleDownload: (student: Student) => void;
}

export const StudentDialogManagerWrapper = forwardRef<StudentDialogManagerWrapperRef, StudentDialogManagerWrapperProps>(({
  onSave,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  exercises,
  meals,
  supplements
}, ref) => {
  const { toast } = useToast();
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

  // Enable imperative handle to expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleAdd,
    handleEdit,
    handleAddExercise,
    handleAddDiet,
    handleAddSupplement,
    handleDownload
  }));

  const handleSaveWrapper = (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">) => {
    const success = onSave(data, selectedStudent);
    
    if (success) {
      setIsDialogOpen(false);
      toast({
        title: selectedStudent ? "ویرایش موفق" : "افزودن موفق",
        description: selectedStudent ? "اطلاعات شاگرد با موفقیت ویرایش شد" : "شاگرد جدید با موفقیت اضافه شد"
      });
    }
  };

  const handleSaveExercisesWrapper = (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => {
    if (!selectedStudentForExercise) return;
    
    const success = onSaveExercises(exercisesWithSets, selectedStudentForExercise.id, dayNumber);
    
    if (success) {
      setIsExerciseDialogOpen(false);
      toast({
        title: "ذخیره موفق",
        description: "برنامه تمرینی با موفقیت ذخیره شد"
      });
    }
  };

  const handleSaveDietWrapper = (mealIds: number[]) => {
    if (!selectedStudentForDiet) return;
    
    const success = onSaveDiet(mealIds, selectedStudentForDiet.id);
    
    if (success) {
      setIsDietDialogOpen(false);
      toast({
        title: "ذخیره موفق",
        description: "برنامه غذایی با موفقیت ذخیره شد"
      });
    }
  };

  const handleSaveSupplementsWrapper = (data: {supplements: number[], vitamins: number[]}) => {
    if (!selectedStudentForSupplement) return;
    
    const success = onSaveSupplements(data, selectedStudentForSupplement.id);
    
    if (success) {
      setIsSupplementDialogOpen(false);
      toast({
        title: "ذخیره موفق",
        description: "برنامه مکمل و ویتامین با موفقیت ذخیره شد"
      });
    }
  };

  return (
    <>
      {/* Student Add/Edit Dialog */}
      <StudentDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onSave={handleSaveWrapper} 
        student={selectedStudent}
      />

      {/* Exercise Dialog */}
      {selectedStudentForExercise && (
        <ExerciseDialog
          isOpen={isExerciseDialogOpen}
          onClose={() => setIsExerciseDialogOpen(false)}
          onSave={handleSaveExercisesWrapper}
          student={selectedStudentForExercise}
          exercises={exercises}
        />
      )}

      {/* Diet Dialog */}
      {selectedStudentForDiet && (
        <DietDialog
          isOpen={isDietDialogOpen}
          onClose={() => setIsDietDialogOpen(false)}
          onSave={handleSaveDietWrapper}
          student={selectedStudentForDiet}
          meals={meals}
        />
      )}

      {/* Supplement Dialog */}
      {selectedStudentForSupplement && (
        <SupplementDialog
          isOpen={isSupplementDialogOpen}
          onClose={() => setIsSupplementDialogOpen(false)}
          onSave={handleSaveSupplementsWrapper}
          student={selectedStudentForSupplement}
          supplements={supplements}
        />
      )}

      {/* Download Dialog */}
      {selectedStudentForDownload && (
        <DownloadDialog
          isOpen={isDownloadDialogOpen}
          onClose={() => setIsDownloadDialogOpen(false)}
          student={selectedStudentForDownload}
        />
      )}
    </>
  );
});

StudentDialogManagerWrapper.displayName = "StudentDialogManagerWrapper";
