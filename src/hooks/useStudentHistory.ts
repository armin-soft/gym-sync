
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { safeJSONParse, safeJSONSave } from '@/utils/database';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  studentId: number;
  studentName: string;
  studentImage: string;
  type: 'add' | 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete';
  description: string;
  // Add these fields for compatibility with StudentHistoryEntry
  date?: string;
  action?: string;
  details?: string;
}

export function useStudentHistory() {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const loadedHistory = safeJSONParse('studentHistory', []);
    if (Array.isArray(loadedHistory)) {
      // Map to ensure type compatibility
      const mappedEntries = loadedHistory.map((entry: any): HistoryEntry => ({
        ...entry,
        // Map fields for compatibility if needed
        date: entry.date || new Date(entry.timestamp).toISOString(),
        action: entry.action || entry.type,
        details: entry.details || entry.description
      }));
      setHistoryEntries(mappedEntries);
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
      description,
      // Add these fields for compatibility
      date: new Date().toISOString(),
      action: type,
      details: description
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
