
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { safeJSONParse, safeJSONSave } from '@/utils/database';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  studentId: number;
  studentName: string;
  studentImage: string;
  type: 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete';
  description: string;
}

export function useStudentHistory() {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const loadedHistory = safeJSONParse('studentHistory', []);
    if (Array.isArray(loadedHistory)) {
      setHistoryEntries(loadedHistory);
    }
  }, []);

  // Add new entry to history
  const addHistoryEntry = (student: Student, type: HistoryEntry['type'], description: string) => {
    const newEntry: HistoryEntry = {
      id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
      studentId: student.id,
      studentName: student.name,
      studentImage: student.image || '/Assets/Image/Place-Holder.svg',
      type,
      description
    };

    // Update state with new entry
    setHistoryEntries(prevEntries => {
      const updatedEntries = [newEntry, ...prevEntries].slice(0, 100); // Keep only the last 100 entries
      safeJSONSave('studentHistory', updatedEntries);
      return updatedEntries;
    });
  };

  // Clear history entries
  const clearHistory = () => {
    setHistoryEntries([]);
    safeJSONSave('studentHistory', []);
  };

  return {
    historyEntries,
    addHistoryEntry,
    clearHistory
  };
}
