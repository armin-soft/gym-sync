
import { useCallback } from "react";
import { StudentEventsProps, DeleteFunction } from "./types";
import { useStudentHistoryEntry } from "./useStudentHistoryEntry";

/**
 * Hook for handling student delete operations with history tracking
 */
export const useStudentDelete = ({
  handleDelete,
  addHistoryEntry,
  triggerRefresh,
  students
}: Pick<StudentEventsProps, 'handleDelete' | 'addHistoryEntry' | 'triggerRefresh' | 'students'>) => {
  const { createStudentHistoryEntry } = useStudentHistoryEntry(addHistoryEntry, students);

  /**
   * Deletes a student and adds an entry to history
   */
  const handleDeleteWithHistory = useCallback((id: number) => {
    const student = students.find(s => s.id === id);
    
    if (student) {
      const description = `شاگرد ${student.name} حذف شد`;
      
      const historyEntry = createStudentHistoryEntry(
        id,
        'delete',
        'delete',
        description,
        JSON.stringify({
          name: student.name,
          phone: student.phone
        })
      );
      
      addHistoryEntry(historyEntry);
    }
    
    handleDelete(id);
    
    // بروزرسانی داده‌ها
    triggerRefresh();
  }, [handleDelete, addHistoryEntry, createStudentHistoryEntry, students, triggerRefresh]);

  return {
    handleDeleteWithHistory
  };
};
