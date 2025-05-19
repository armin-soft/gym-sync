
// src/hooks/useStudentHistory.ts
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';

export type HistoryEntryType = 'edit' | 'exercise' | 'diet' | 'supplement';

export interface HistoryEntry {
  id: number;
  student: Student;
  type: HistoryEntryType;
  message: string;
  timestamp: number;
}

export const useStudentHistory = () => {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  
  // Load history from localStorage on init
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('studentHistory');
      if (savedHistory) {
        setHistoryEntries(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  }, []);
  
  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (historyEntries.length > 0) {
      try {
        localStorage.setItem('studentHistory', JSON.stringify(historyEntries));
      } catch (error) {
        console.error('Error saving history:', error);
      }
    }
  }, [historyEntries]);
  
  const addHistoryEntry = (student: Student, type: HistoryEntryType, message: string) => {
    const newEntry: HistoryEntry = {
      id: Date.now(),
      student,
      type,
      message,
      timestamp: Date.now()
    };
    
    setHistoryEntries(prev => {
      // Limit history to 50 entries
      const updatedHistory = [newEntry, ...prev].slice(0, 50);
      return updatedHistory;
    });
  };
  
  const clearHistory = () => {
    setHistoryEntries([]);
    localStorage.removeItem('studentHistory');
  };
  
  return {
    historyEntries,
    addHistoryEntry,
    clearHistory
  };
};
