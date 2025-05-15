
import { useState, useEffect, useCallback } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { safeJSONParse, safeJSONSave } from '@/utils/database';

// Define and export the HistoryEntry type
export interface HistoryEntry {
  id: number;
  studentId: number;
  date: string;
  action: 'edit' | 'exercise' | 'diet' | 'supplement';
  details: string;
}

export const useStudentHistory = () => {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  // Load history entries from localStorage with improved error handling
  useEffect(() => {
    try {
      const entries = safeJSONParse<HistoryEntry[]>('studentHistory', []);
      setHistoryEntries(entries);
    } catch (error) {
      console.error('Error loading student history:', error);
      setHistoryEntries([]);
    }
  }, []);

  // Save history entries to localStorage with debounce for better performance
  useEffect(() => {
    if (historyEntries.length > 0) {
      const saveTimeout = setTimeout(() => {
        safeJSONSave('studentHistory', historyEntries);
      }, 300); // Debounce by 300ms
      
      return () => clearTimeout(saveTimeout);
    }
  }, [historyEntries]);

  // Add a new history entry with optimized implementation
  const addHistoryEntry = useCallback((
    student: Student,
    action: 'edit' | 'exercise' | 'diet' | 'supplement',
    details: string
  ) => {
    const newEntry: HistoryEntry = {
      id: Date.now(),
      studentId: student.id,
      date: new Date().toISOString(),
      action,
      details,
    };
    
    setHistoryEntries(prev => [newEntry, ...prev.slice(0, 99)]); // Keep only the last 100 entries for performance
    return newEntry;
  }, []);

  return {
    historyEntries,
    addHistoryEntry
  };
};
