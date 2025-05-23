import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { Student } from "@/components/students/StudentTypes";
import { FormDialog } from "@/components/students/dialogs/FormDialog";
import { ExerciseDialog } from "@/components/students/dialogs/ExerciseDialog";
import { DietDialog } from "@/components/students/dialogs/DietDialog";
import { SupplementDialog } from "@/components/students/dialogs/SupplementDialog";
import { useDialogState } from "@/components/students/hooks/useDialogState";
import { ExerciseWithSets } from "@/types/exercise";

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
}

interface StudentDialogManagerProps {
  onSave: (data: any, selectedStudent?: Student) => boolean;
  onSaveExercises: (
    exercisesData: ExerciseWithSets[],
    studentId: number,
    dayNumber?: number
  ) => boolean;
  onSaveDiet: (
    mealIds: number[],
    studentId: number,
    dayNumber?: number
  ) => boolean;
  onSaveSupplements: (
    data: { supplements: number[]; vitamins: number[]; day?: number },
    studentId: number
  ) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export const StudentDialogManager = forwardRef<
  StudentDialogManagerRef,
  StudentDialogManagerProps
>(({ onSave, onSaveExercises, onSaveDiet, onSaveSupplements, exercises, meals, supplements }, ref) => {
  const { state, setFormDialogOpen, setExerciseDialogOpen, setDietDialogOpen, setSupplementDialogOpen, setSelectedStudent, setIsEditing } = useDialogState();

  const handleAdd = useCallback(() => {
    setSelectedStudent(null);
    setIsEditing(false);
    setFormDialogOpen(true);
  }, [setSelectedStudent, setIsEditing, setFormDialogOpen]);

  const handleEdit = useCallback((student: Student) => {
    setSelectedStudent(student);
    setIsEditing(true);
    setFormDialogOpen(true);
  }, [setSelectedStudent, setIsEditing, setFormDialogOpen]);

  useImperativeHandle(ref, () => ({
    handleAdd,
    handleEdit,
  }));

  return (
    <>
      <FormDialog
        open={state.formDialog}
        onOpenChange={setFormDialogOpen}
        selectedStudent={state.selectedStudent}
        isEditing={state.isEditing}
        onSave={onSave}
      />

      <ExerciseDialog
        open={state.exerciseDialog}
        onOpenChange={setExerciseDialogOpen}
        selectedStudent={state.selectedStudent}
        exercises={exercises}
        onSaveExercises={onSaveExercises}
      />

      <DietDialog
        open={state.dietDialog}
        onOpenChange={setDietDialogOpen}
        selectedStudent={state.selectedStudent}
        meals={meals}
        onSaveDiet={onSaveDiet}
      />

      <SupplementDialog
        open={state.supplementDialog}
        onOpenChange={setSupplementDialogOpen}
        selectedStudent={state.selectedStudent}
        supplements={supplements}
        onSaveSupplements={onSaveSupplements}
      />
    </>
  );
});

StudentDialogManager.displayName = "StudentDialogManager";
