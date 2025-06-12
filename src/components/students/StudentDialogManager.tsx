
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Student } from "./StudentTypes";
import { StudentFormDialog } from "./dialogs/FormDialog";
import { ExerciseDialog } from "./dialogs/ExerciseDialog";
import { DietDialog } from "./dialogs/DietDialog";
import { SupplementDialog } from "./dialogs/SupplementDialog";
import { ExerciseWithSets } from "@/types/exercise";

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
  handleAddExercise: (student: Student) => void;
  handleAddDiet: (student: Student) => void;
  handleAddSupplement: (student: Student) => void;
}

interface StudentDialogManagerProps {
  onSave: (data: any, selectedStudent?: Student) => boolean;
  onSaveExercises: (exercisesData: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export const StudentDialogManager = forwardRef<StudentDialogManagerRef, StudentDialogManagerProps>(
  ({ onSave, onSaveExercises, onSaveDiet, onSaveSupplements, exercises, meals, supplements }, ref) => {
    const [dialogType, setDialogType] = useState<'form' | 'exercise' | 'diet' | 'supplement' | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    useImperativeHandle(ref, () => ({
      handleAdd: () => {
        setSelectedStudent(null);
        setDialogType('form');
      },
      handleEdit: (student: Student) => {
        setSelectedStudent(student);
        setDialogType('form');
      },
      handleAddExercise: (student: Student) => {
        setSelectedStudent(student);
        setDialogType('exercise');
      },
      handleAddDiet: (student: Student) => {
        setSelectedStudent(student);
        setDialogType('diet');
      },
      handleAddSupplement: (student: Student) => {
        setSelectedStudent(student);
        setDialogType('supplement');
      }
    }));

    const closeDialog = () => {
      setDialogType(null);
      setSelectedStudent(null);
    };

    return (
      <>
        <StudentFormDialog
          open={dialogType === 'form'}
          onOpenChange={(open) => !open && closeDialog()}
          selectedStudent={selectedStudent}
          isEditing={!!selectedStudent}
          onSave={onSave}
        />

        <ExerciseDialog
          open={dialogType === 'exercise'}
          onOpenChange={(open) => !open && closeDialog()}
          selectedStudent={selectedStudent}
          onSaveExercises={onSaveExercises}
        />

        <DietDialog
          open={dialogType === 'diet'}
          onOpenChange={(open) => !open && closeDialog()}
          selectedStudent={selectedStudent}
          onSaveDiet={onSaveDiet}
        />

        <SupplementDialog
          open={dialogType === 'supplement'}
          onOpenChange={(open) => !open && closeDialog()}
          selectedStudent={selectedStudent}
          onSaveSupplements={onSaveSupplements}
        />
      </>
    );
  }
);

StudentDialogManager.displayName = "StudentDialogManager";
