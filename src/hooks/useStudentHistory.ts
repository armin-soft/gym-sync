
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { safeJSONParse, safeJSONSave } from '@/utils/database';

export interface HistoryEntry {
  id: number;
  timestamp: number;
  studentId: number | null;
  studentName: string;
  studentImage?: string;
  action: string;
  details: string;
  type: 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete';
  description: string;
}

export function useStudentHistory() {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const loadedHistory = safeJSONParse<HistoryEntry[]>('studentHistory', []);
    if (Array.isArray(loadedHistory)) {
      // Convert any legacy entries to the new format if needed
      const normalizedEntries = loadedHistory.map(entry => ({
        ...entry,
        timestamp: typeof entry.timestamp === 'string' ? new Date(entry.timestamp).getTime() : entry.timestamp,
        type: entry.type || (entry.action as 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete'),
        description: entry.description || entry.details
      }));
      setHistoryEntries(normalizedEntries);
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
