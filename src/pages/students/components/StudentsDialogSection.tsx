
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { StudentDialogManager } from "@/components/students/StudentDialogManager";

interface StudentsDialogSectionProps {
  dialogRef: React.RefObject<any>;
  onSave: (data: any, selectedStudent?: Student) => boolean;
  onSaveExercises: (exercisesData: any, studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
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
      onSave={(data, selectedStudent) => {
        const result = onSave(data, selectedStudent);
        if (result && selectedStudent) {
          addHistoryEntry(
            {...selectedStudent, ...data},
            'edit',
            `اطلاعات ${data.name} بروزرسانی شد`
          );
        } else if (result) {
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
      onSaveDiet={(mealIds, studentId) => {
        const result = onSaveDiet(mealIds, studentId);
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
