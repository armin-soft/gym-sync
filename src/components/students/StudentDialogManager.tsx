
import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Student } from "@/components/students/StudentTypes";
import StudentFormDialog from "./StudentFormDialog";
import StudentExerciseDialog from "@/components/exercises/StudentExerciseDialog";
import { ExerciseWithSets } from "@/types/exercise";
import { ProgramExportDialog } from "./program/components/ProgramExportDialog";

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
  handleAddExercise?: (student: Student) => void;
  handleDownload?: (student: Student) => void;
}

interface StudentDialogManagerProps {
  onSave: (student: Student) => void;
  onSaveExercises?: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet?: (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveSupplements?: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  exercises?: any[];
  meals?: any[];
  supplements?: any[];
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
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useImperativeHandle(ref, () => ({
      handleAdd: () => {
        setSelectedStudent(null);
        setIsEditing(false);
        setFormDialogOpen(true);
      },
      handleEdit: (student) => {
        setSelectedStudent(student);
        setIsEditing(true);
        setFormDialogOpen(true);
      },
      handleAddExercise: onSaveExercises ? (student) => {
        console.log("Opening exercise dialog for student:", student);
        setSelectedStudent(student);
        setExerciseDialogOpen(true);
      } : undefined,
      handleDownload: (student) => {
        console.log("Opening export dialog for student:", student);
        setSelectedStudent(student);
        setExportDialogOpen(true);
      }
    }));

    return (
      <>
        <StudentFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          student={selectedStudent}
          isEditing={isEditing}
          onSave={(updatedStudent) => {
            onSave(updatedStudent);
            setFormDialogOpen(false);
          }}
        />

        {onSaveExercises && selectedStudent && (
          <StudentExerciseDialog
            open={exerciseDialogOpen}
            onOpenChange={setExerciseDialogOpen}
            studentName={selectedStudent.name}
            onSave={(exercisesWithSets, dayNumber) => {
              const success = onSaveExercises(exercisesWithSets, selectedStudent.id, dayNumber);
              if (success) setExerciseDialogOpen(false);
              return success;
            }}
            initialExercises={selectedStudent.exercises}
            initialExercisesDay1={selectedStudent.exercisesDay1}
            initialExercisesDay2={selectedStudent.exercisesDay2}
            initialExercisesDay3={selectedStudent.exercisesDay3}
            initialExercisesDay4={selectedStudent.exercisesDay4}
          />
        )}

        {selectedStudent && (
          <ProgramExportDialog
            open={exportDialogOpen}
            onOpenChange={setExportDialogOpen}
            student={selectedStudent}
          />
        )}
      </>
    );
  }
);
