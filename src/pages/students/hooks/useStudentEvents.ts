
import { useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";

export function useStudentEvents(
  handleSave: any,
  handleSaveExercises: any,
  handleSaveDiet: any, 
  handleSaveSupplements: any,
  handleDelete: any,
  addHistoryEntry: any,
  triggerRefresh: any,
  students: Student[],
  selectedStudentForProgram: Student | null
) {

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

  const handleSaveExercisesWithHistory = useCallback((exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => {
    if (!selectedStudentForProgram) return false;
    
    const result = handleSaveExercises(exercisesWithSets, selectedStudentForProgram.id, dayNumber);
    
    if (result) {
      const dayText = dayNumber ? ` برای روز ${dayNumber}` : '';
      addHistoryEntry(
        selectedStudentForProgram, 
        'exercise',
        `برنامه تمرینی${dayText} برای ${selectedStudentForProgram.name} بروزرسانی شد`
      );
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveExercises, selectedStudentForProgram, addHistoryEntry, triggerRefresh]);

  const handleSaveDietWithHistory = useCallback((mealIds: number[]) => {
    if (!selectedStudentForProgram) return false;
    
    const result = handleSaveDiet(mealIds, selectedStudentForProgram.id);
    
    if (result) {
      addHistoryEntry(
        selectedStudentForProgram, 
        'diet',
        `برنامه غذایی برای ${selectedStudentForProgram.name} بروزرسانی شد`
      );
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveDiet, selectedStudentForProgram, addHistoryEntry, triggerRefresh]);

  const handleSaveSupplementsWithHistory = useCallback((data: {supplements: number[], vitamins: number[]}) => {
    if (!selectedStudentForProgram) return false;
    
    const result = handleSaveSupplements(data, selectedStudentForProgram.id);
    
    if (result) {
      addHistoryEntry(
        selectedStudentForProgram, 
        'supplement',
        `برنامه مکمل و ویتامین برای ${selectedStudentForProgram.name} بروزرسانی شد`
      );
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveSupplements, selectedStudentForProgram, addHistoryEntry, triggerRefresh]);
  
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
