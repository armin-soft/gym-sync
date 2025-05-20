
import { useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";

/**
 * هوک برای مدیریت رویدادهای دانشجویی با ادغام تاریخچه
 */
export function useStudentEvents(
  handleSave: (data: any, selectedStudent?: Student) => boolean,
  handleSaveExercises: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean,
  handleSaveDiet: (mealIds: number[], studentId: number) => boolean,
  handleSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean,
  handleDelete: (studentId: number) => void,
  addHistoryEntry: (student: Student, type: string, message: string) => void,
  triggerRefresh: () => void,
  students: Student[],
  selectedStudentForProgram: Student | null = null
) {
  // ذخیره با تاریخچه
  const handleSaveWithHistory = useCallback((data: any, selectedStudent?: Student) => {
    const result = handleSave(data, selectedStudent);
    
    if (result) {
      if (selectedStudent) {
        addHistoryEntry(
          {...selectedStudent, ...data}, 
          'edit', 
          `اطلاعات ${data.name || selectedStudent.name} به‌روزرسانی شد`
        );
      } else {
        addHistoryEntry(
          {...data, id: Date.now()}, 
          'edit', 
          `شاگرد جدید ${data.name} اضافه شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSave, addHistoryEntry, triggerRefresh]);

  // ذخیره تمرین‌ها با تاریخچه
  const handleSaveExercisesWithHistory = useCallback((exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    const result = handleSaveExercises(exercisesWithSets, studentId, dayNumber);
    
    if (result) {
      const student = students.find(s => s.id === studentId) || selectedStudentForProgram;
      if (student) {
        const dayText = dayNumber ? ` برای روز ${dayNumber}` : '';
        addHistoryEntry(
          student, 
          'exercise',
          `برنامه تمرینی${dayText} برای ${student.name} بروزرسانی شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveExercises, students, selectedStudentForProgram, addHistoryEntry, triggerRefresh]);

  // ذخیره رژیم غذایی با تاریخچه
  const handleSaveDietWithHistory = useCallback((mealIds: number[], studentId: number) => {
    const result = handleSaveDiet(mealIds, studentId);
    
    if (result) {
      const student = students.find(s => s.id === studentId) || selectedStudentForProgram;
      if (student) {
        addHistoryEntry(
          student, 
          'diet',
          `برنامه غذایی برای ${student.name} بروزرسانی شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveDiet, students, selectedStudentForProgram, addHistoryEntry, triggerRefresh]);

  // ذخیره مکمل‌ها با تاریخچه
  const handleSaveSupplementsWithHistory = useCallback((data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    const result = handleSaveSupplements(data, studentId);
    
    if (result) {
      const student = students.find(s => s.id === studentId) || selectedStudentForProgram;
      if (student) {
        addHistoryEntry(
          student, 
          'supplement',
          `برنامه مکمل و ویتامین برای ${student.name} بروزرسانی شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveSupplements, students, selectedStudentForProgram, addHistoryEntry, triggerRefresh]);
  
  // حذف با تاریخچه
  const handleDeleteWithHistory = useCallback((studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      addHistoryEntry(
        student, 
        'edit',
        `شاگرد ${student.name} حذف شد`
      );
    }
    
    handleDelete(studentId);
    triggerRefresh();
  }, [handleDelete, students, addHistoryEntry, triggerRefresh]);

  return {
    handleSaveWithHistory,
    handleSaveExercisesWithHistory,
    handleSaveDietWithHistory,
    handleSaveSupplementsWithHistory,
    handleDeleteWithHistory
  };
}
