
import { useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { HistoryEntry } from "@/hooks/useStudentHistory";

type SaveFunction = (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => boolean;
type SaveExercisesFunction = (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
type SaveDietFunction = (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
type SaveSupplementsFunction = (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
type DeleteFunction = (id: number) => void;
type AddHistoryFunction = (entry: HistoryEntry) => void;
type TriggerRefreshFunction = () => void;

/**
 * هوک برای مدیریت رویدادهای شاگردان با پشتیبانی از تاریخچه و بروزرسانی
 * این هوک تمام عملیات‌های بروزرسانی را در تاریخچه ذخیره می‌کند 
 * و اعلان‌های مناسب را نمایش می‌دهد
 */
export function useStudentEvents(
  handleSave: SaveFunction,
  handleSaveExercises: SaveExercisesFunction,
  handleSaveDiet: SaveDietFunction,
  handleSaveSupplements: SaveSupplementsFunction,
  handleDelete: DeleteFunction,
  addHistoryEntry: AddHistoryFunction,
  triggerRefresh: TriggerRefreshFunction,
  students: Student[],
  selectedStudentForProgram: Student | null
) {

  // ذخیره شاگرد با ثبت در تاریخچه
  const handleSaveWithHistory = useCallback((data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => {
    const timestamp = new Date().toISOString();
    const isSuccess = handleSave(data, selectedStudent);
    
    if (isSuccess) {
      const actionType = selectedStudent ? 'edit' : 'add';
      const studentName = selectedStudent ? selectedStudent.name : data.name;
      
      addHistoryEntry({
        id: Date.now(),
        timestamp,
        studentId: selectedStudent ? selectedStudent.id : null,
        studentName,
        action: actionType,
        details: JSON.stringify({ 
          before: selectedStudent ? { name: selectedStudent.name, phone: selectedStudent.phone } : {},
          after: { name: data.name, phone: data.phone }
        })
      });
      
      // بروزرسانی داده‌ها
      triggerRefresh();
    }
    
    return isSuccess;
  }, [handleSave, addHistoryEntry, triggerRefresh]);
  
  // ذخیره تمرینات با ثبت در تاریخچه
  const handleSaveExercisesWithHistory = useCallback((exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    const timestamp = new Date().toISOString();
    const isSuccess = handleSaveExercises(exercisesWithSets, studentId, dayNumber);
    
    if (isSuccess) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry({
          id: Date.now(),
          timestamp,
          studentId: student.id,
          studentName: student.name,
          action: 'exercises',
          details: JSON.stringify({
            day: dayNumber || 1,
            count: exercisesWithSets.length
          })
        });
      }
      
      // بروزرسانی داده‌ها
      triggerRefresh();
    }
    
    return isSuccess;
  }, [handleSaveExercises, addHistoryEntry, students, triggerRefresh]);
  
  // ذخیره رژیم غذایی با ثبت در تاریخچه
  const handleSaveDietWithHistory = useCallback((mealIds: number[], studentId: number, dayNumber?: number) => {
    const timestamp = new Date().toISOString();
    const isSuccess = handleSaveDiet(mealIds, studentId, dayNumber);
    
    if (isSuccess) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry({
          id: Date.now(),
          timestamp,
          studentId: student.id,
          studentName: student.name,
          action: 'diet',
          details: JSON.stringify({
            day: dayNumber || 1,
            count: mealIds.length
          })
        });
      }
      
      // بروزرسانی داده‌ها
      triggerRefresh();
    }
    
    return isSuccess;
  }, [handleSaveDiet, addHistoryEntry, students, triggerRefresh]);
  
  // ذخیره مکمل‌ها با ثبت در تاریخچه
  const handleSaveSupplementsWithHistory = useCallback((data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
    const timestamp = new Date().toISOString();
    const isSuccess = handleSaveSupplements(data, studentId);
    
    if (isSuccess) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry({
          id: Date.now(),
          timestamp,
          studentId: student.id,
          studentName: student.name,
          action: 'supplements',
          details: JSON.stringify({
            day: data.day || 1,
            supplements: data.supplements.length,
            vitamins: data.vitamins.length
          })
        });
      }
      
      // بروزرسانی داده‌ها
      triggerRefresh();
    }
    
    return isSuccess;
  }, [handleSaveSupplements, addHistoryEntry, students, triggerRefresh]);
  
  // حذف شاگرد با ثبت در تاریخچه
  const handleDeleteWithHistory = useCallback((id: number) => {
    const timestamp = new Date().toISOString();
    const student = students.find(s => s.id === id);
    
    if (student) {
      addHistoryEntry({
        id: Date.now(),
        timestamp,
        studentId: id,
        studentName: student.name,
        action: 'delete',
        details: JSON.stringify({
          name: student.name,
          phone: student.phone
        })
      });
    }
    
    handleDelete(id);
    
    // بروزرسانی داده‌ها
    triggerRefresh();
  }, [handleDelete, addHistoryEntry, students, triggerRefresh]);
  
  return {
    handleSaveWithHistory,
    handleSaveExercisesWithHistory,
    handleSaveDietWithHistory,
    handleSaveSupplementsWithHistory,
    handleDeleteWithHistory
  };
}
