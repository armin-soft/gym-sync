
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
    const timestamp = Date.now();
    // Here's the fix: explicitly pass selectedStudent to handleSave
    const isSuccess = handleSave(data, selectedStudent);
    
    if (isSuccess) {
      const actionType = selectedStudent ? 'edit' : 'add';
      const studentName = selectedStudent ? selectedStudent.name : data.name;
      const studentImage = selectedStudent?.image || data.image;
      const description = selectedStudent 
        ? `اطلاعات ${studentName} ویرایش شد` 
        : `شاگرد جدید ${studentName} اضافه شد`;
      
      addHistoryEntry({
        id: Date.now(),
        timestamp,
        studentId: selectedStudent ? selectedStudent.id : null,
        studentName,
        studentImage,
        action: actionType,
        type: 'edit',
        description,
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
    const timestamp = Date.now();
    const isSuccess = handleSaveExercises(exercisesWithSets, studentId, dayNumber);
    
    if (isSuccess) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const description = `برنامه تمرینی روز ${dayNumber || 1} برای ${student.name} با ${exercisesWithSets.length} حرکت ثبت شد`;
        
        addHistoryEntry({
          id: Date.now(),
          timestamp,
          studentId: student.id,
          studentName: student.name,
          studentImage: student.picture,
          action: 'exercises',
          type: 'exercise',
          description,
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
    const timestamp = Date.now();
    const isSuccess = handleSaveDiet(mealIds, studentId, dayNumber);
    
    if (isSuccess) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const description = `رژیم غذایی روز ${dayNumber || 1} برای ${student.name} با ${mealIds.length} وعده ثبت شد`;
        
        addHistoryEntry({
          id: Date.now(),
          timestamp,
          studentId: student.id,
          studentName: student.name,
          studentImage: student.picture,
          action: 'diet',
          type: 'diet',
          description,
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
    const timestamp = Date.now();
    const isSuccess = handleSaveSupplements(data, studentId);
    
    if (isSuccess) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const totalItems = data.supplements.length + data.vitamins.length;
        const description = `برنامه مکمل روز ${data.day || 1} برای ${student.name} با ${totalItems} آیتم ثبت شد`;
        
        addHistoryEntry({
          id: Date.now(),
          timestamp,
          studentId: student.id,
          studentName: student.name,
          studentImage: student.picture,
          action: 'supplements',
          type: 'supplement',
          description,
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
    const timestamp = Date.now();
    const student = students.find(s => s.id === id);
    
    if (student) {
      const description = `شاگرد ${student.name} حذف شد`;
      
      addHistoryEntry({
        id: Date.now(),
        timestamp,
        studentId: id,
        studentName: student.name,
        studentImage: student.picture,
        action: 'delete',
        type: 'delete',
        description,
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
