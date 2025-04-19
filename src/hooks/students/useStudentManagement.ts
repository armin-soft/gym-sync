
import { useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useStudents } from "@/hooks/students";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { useToast } from "@/hooks/use-toast";

export const useStudentManagement = (triggerRefresh: () => void) => {
  const { toast } = useToast();
  const { 
    students,
    handleDelete: baseHandleDelete,
    handleSave: baseHandleSave,
    handleSaveExercises: baseHandleSaveExercises,
    handleSaveDiet: baseHandleSaveDiet,
    handleSaveSupplements: baseHandleSaveSupplements
  } = useStudents();
  
  const { addHistoryEntry } = useStudentHistory();

  const handleSaveWithHistory = useCallback((data: any, selectedStudent?: Student) => {
    const result = baseHandleSave(data, selectedStudent);
    
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
  }, [baseHandleSave, addHistoryEntry, triggerRefresh]);

  const handleDeleteWithHistory = useCallback((studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      addHistoryEntry(
        student, 
        'edit',
        `شاگرد ${student.name} حذف شد`
      );
    }
    
    baseHandleDelete(studentId);
    triggerRefresh();
  }, [baseHandleDelete, students, addHistoryEntry, triggerRefresh]);

  const handleSaveExercisesWithHistory = useCallback((exerciseIds: number[], studentId: number, dayNumber?: number) => {
    const result = baseHandleSaveExercises(exerciseIds, studentId, dayNumber);
    
    if (result) {
      const student = students.find(s => s.id === studentId);
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
  }, [baseHandleSaveExercises, students, addHistoryEntry, triggerRefresh]);

  const handleSaveDietWithHistory = useCallback((mealIds: number[], studentId: number) => {
    const result = baseHandleSaveDiet(mealIds, studentId);
    
    if (result) {
      const student = students.find(s => s.id === studentId);
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
  }, [baseHandleSaveDiet, students, addHistoryEntry, triggerRefresh]);

  const handleSaveSupplementsWithHistory = useCallback((data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    const result = baseHandleSaveSupplements(data, studentId);
    
    if (result) {
      const student = students.find(s => s.id === studentId);
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
  }, [baseHandleSaveSupplements, students, addHistoryEntry, triggerRefresh]);

  return {
    handleSave: handleSaveWithHistory,
    handleDelete: handleDeleteWithHistory,
    handleSaveExercises: handleSaveExercisesWithHistory,
    handleSaveDiet: handleSaveDietWithHistory,
    handleSaveSupplements: handleSaveSupplementsWithHistory
  };
};
