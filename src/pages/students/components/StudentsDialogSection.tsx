
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { StudentDialogManager } from "@/components/students/StudentDialogManager";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentsDialogSectionProps {
  dialogRef: React.RefObject<any>;
  onSave: (data: any, selectedStudent?: Student) => boolean;
  onSaveExercises: (exercisesData: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
  students: Student[];
  addHistoryEntry: (student: Student, type: string, description: string) => void;
}

export const StudentsDialogSection: React.FC<StudentsDialogSectionProps> = ({
  dialogRef,
  onSave,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  exercises,
  meals,
  supplements,
  students,
  addHistoryEntry
}) => {
  return (
    <StudentDialogManager
      ref={dialogRef}
      onSave={(data) => {
        const result = onSave(data);
        if (result) {
          const newStudent = { ...data, id: Date.now() } as Student;
          addHistoryEntry(
            newStudent,
            'edit',
            `شاگرد جدید ${data.name} افزوده شد`
          );
        }
        return result;
      }}
      onSaveExercises={(exercisesData, studentId, dayNumber) => {
        const result = onSaveExercises(exercisesData, studentId, dayNumber);
        if (result) {
          const student = students.find(s => s.id === studentId);
          if (student) {
            addHistoryEntry(
              student,
              'exercise',
              `برنامه تمرینی ${dayNumber ? `روز ${dayNumber} ` : ''}برای ${student.name} بروزرسانی شد`
            );
          }
        }
        return result;
      }}
      onSaveDiet={(mealIds, studentId, dayNumber) => {
        const result = onSaveDiet(mealIds, studentId, dayNumber);
        if (result) {
          const student = students.find(s => s.id === studentId);
          if (student) {
            addHistoryEntry(
              student,
              'diet',
              `برنامه غذایی برای ${student.name} بروزرسانی شد`
            );
          }
        }
        return result;
      }}
      onSaveSupplements={(data, studentId) => {
        const result = onSaveSupplements(data, studentId);
        if (result) {
          const student = students.find(s => s.id === studentId);
          if (student) {
            addHistoryEntry(
              student,
              'supplement',
              `برنامه مکمل و ویتامین برای ${student.name} بروزرسانی شد`
            );
          }
        }
        return result;
      }}
      exercises={exercises}
      meals={meals}
      supplements={supplements}
    />
  );
};
