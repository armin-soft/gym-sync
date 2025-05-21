
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { safeJSONParse, safeJSONSave } from '@/utils/database';

export interface HistoryEntry {
  id: number;
  timestamp: string;
  studentId: number | null;
  studentName: string;
  action: string;
  details: string;
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
  const addHistoryEntry = (entry: HistoryEntry) => {
    // Update state with new entry
    setHistoryEntries(prevEntries => {
      const updatedEntries = [entry, ...prevEntries].slice(0, 100); // Keep only the last 100 entries
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
