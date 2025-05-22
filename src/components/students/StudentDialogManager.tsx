
import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Student } from "@/components/students/StudentTypes";
import StudentFormDialog from "./StudentFormDialog";
import StudentExerciseDialog from "@/components/exercises/StudentExerciseDialog";
import StudentDietDialog from "./diet/StudentDietDialog";
import { SupplementDialog } from "../supplements/student/SupplementDialog";
import { ExerciseWithSets } from "@/types/exercise";
import { ProgramExportDialog } from "./program/components/ProgramExportDialog";

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
  handleAddExercise?: (student: Student) => void;
  handleAddDiet?: (student: Student) => void;
  handleAddSupplement?: (student: Student) => void;
  handleDownload?: (student: Student) => void;
}

interface StudentDialogManagerProps {
  onSave: (student: Student, selectedStudent?: Student) => void;
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
    const [dietDialogOpen, setDietDialogOpen] = useState(false);
    const [supplementDialogOpen, setSupplementDialogOpen] = useState(false);
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
      handleAddDiet: onSaveDiet ? (student) => {
        console.log("Opening diet dialog for student:", student);
        setSelectedStudent(student);
        setDietDialogOpen(true);
      } : undefined,
      handleAddSupplement: onSaveSupplements ? (student) => {
        console.log("Opening supplement dialog for student:", student);
        setSelectedStudent(student);
        setSupplementDialogOpen(true);
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
            // Fix: Pass the selectedStudent when editing
            onSave(updatedStudent, selectedStudent);
            setFormDialogOpen(false);
          }}
        />

        {onSaveExercises && selectedStudent && (
          <StudentExerciseDialog
            open={exerciseDialogOpen}
            onOpenChange={setExerciseDialogOpen}
            studentName={selectedStudent.name}
            onSave={(exercisesWithSets, dayNumber) => {
              return onSaveExercises(exercisesWithSets, selectedStudent.id, dayNumber);
            }}
            initialExercises={selectedStudent.exercises}
            initialExerciseSets={selectedStudent.exerciseSets}
            initialExerciseReps={selectedStudent.exerciseReps}
            initialExercisesDay1={selectedStudent.exercisesDay1}
            initialExerciseSetsDay1={selectedStudent.exerciseSetsDay1}
            initialExerciseRepsDay1={selectedStudent.exerciseRepsDay1}
            initialExercisesDay2={selectedStudent.exercisesDay2}
            initialExerciseSetsDay2={selectedStudent.exerciseSetsDay2}
            initialExerciseRepsDay2={selectedStudent.exerciseRepsDay2}
            initialExercisesDay3={selectedStudent.exercisesDay3}
            initialExerciseSetsDay3={selectedStudent.exerciseSetsDay3}
            initialExerciseRepsDay3={selectedStudent.exerciseRepsDay3}
            initialExercisesDay4={selectedStudent.exercisesDay4}
            initialExerciseSetsDay4={selectedStudent.exerciseSetsDay4}
            initialExerciseRepsDay4={selectedStudent.exerciseRepsDay4}
            initialExercisesDay5={selectedStudent.exercisesDay5}
            initialExerciseSetsDay5={selectedStudent.exerciseSetsDay5}
            initialExerciseRepsDay5={selectedStudent.exerciseRepsDay5}
          />
        )}

        {onSaveDiet && selectedStudent && (
          <StudentDietDialog
            open={dietDialogOpen}
            onOpenChange={setDietDialogOpen}
            studentName={selectedStudent.name}
            onSave={(mealIds, dayNumber) => {
              return onSaveDiet(mealIds, selectedStudent.id, dayNumber);
            }}
            meals={meals || []}
            initialMeals={selectedStudent.meals}
            initialMealsDay1={selectedStudent.mealsDay1}
            initialMealsDay2={selectedStudent.mealsDay2}
            initialMealsDay3={selectedStudent.mealsDay3}
            initialMealsDay4={selectedStudent.mealsDay4}
          />
        )}

        {onSaveSupplements && selectedStudent && (
          <SupplementDialog
            open={supplementDialogOpen}
            onOpenChange={setSupplementDialogOpen}
            studentName={selectedStudent.name}
            onSave={(data) => {
              return onSaveSupplements(data, selectedStudent.id);
            }}
            supplements={supplements || []}
            initialSupplements={selectedStudent.supplements}
            initialVitamins={selectedStudent.vitamins}
            initialSupplementsDay1={selectedStudent.supplementsDay1 || []}
            initialVitaminsDay1={selectedStudent.vitaminsDay1 || []}
          />
        )}

        {selectedStudent && (
          <ProgramExportDialog 
            isOpen={exportDialogOpen}
            onClose={() => setExportDialogOpen(false)}
            student={selectedStudent}
            programType="all"
          />
        )}
      </>
    );
  }
);

StudentDialogManager.displayName = "StudentDialogManager";
