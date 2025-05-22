
import { useState, useEffect, useCallback } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { safeJSONParse, safeJSONSave } from '@/utils/database/index';

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

const HISTORY_STORAGE_KEY = 'studentHistory';

export function useStudentHistory() {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  // Load history from localStorage
  useEffect(() => {
    console.log("Loading history from localStorage");
    const loadedHistory = safeJSONParse<HistoryEntry[]>(HISTORY_STORAGE_KEY, []);
    if (Array.isArray(loadedHistory)) {
      // Convert any legacy entries to the new format if needed
      const normalizedEntries = loadedHistory.map(entry => ({
        ...entry,
        timestamp: typeof entry.timestamp === 'string' ? new Date(entry.timestamp).getTime() : entry.timestamp,
        type: entry.type || (entry.action as 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete'),
        description: entry.description || entry.details
      }));
      setHistoryEntries(normalizedEntries);
      console.log(`Loaded ${normalizedEntries.length} history entries`);
    }
  }, []);

  // Add new entry to history
  const addHistoryEntry = useCallback((entry: HistoryEntry) => {
    console.log("Adding new history entry:", entry);
    // Update state with new entry
    setHistoryEntries(prevEntries => {
      const updatedEntries = [entry, ...prevEntries].slice(0, 100); // Keep only the last 100 entries
      
      // مهم: ذخیره تاریخچه در localStorage
      safeJSONSave(HISTORY_STORAGE_KEY, updatedEntries);
      console.log(`Saved ${updatedEntries.length} history entries to localStorage`);
      
      return updatedEntries;
    });
  }, []);

  // Clear history entries
  const clearHistory = useCallback(() => {
    console.log("Clearing all history entries");
    setHistoryEntries([]);
    safeJSONSave(HISTORY_STORAGE_KEY, []);
  }, []);

  return {
    historyEntries,
    addHistoryEntry,
    clearHistory
  };
}
