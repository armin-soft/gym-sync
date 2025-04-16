
import { useState, useEffect, useCallback } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { StudentHistoryEntry } from '@/components/students/StudentHistory';

export const useStudentHistory = () => {
  const [historyEntries, setHistoryEntries] = useState<StudentHistoryEntry[]>([]);

  // Load history entries from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('studentHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setHistoryEntries(parsedHistory);
        }
      }
    } catch (error) {
      console.error('Error loading student history:', error);
    }
  }, []);

  // Save history entries to localStorage whenever they change
  useEffect(() => {
    if (historyEntries.length > 0) {
      localStorage.setItem('studentHistory', JSON.stringify(historyEntries));
    }
  }, [historyEntries]);

  // Add a new history entry
  const addHistoryEntry = useCallback((
    student: Student,
    action: 'edit' | 'exercise' | 'diet' | 'supplement',
    details: string
  ) => {
    const newEntry: StudentHistoryEntry = {
      id: Date.now(),
      studentId: student.id,
      date: new Date().toISOString(),
      action,
      details,
    };
    
    setHistoryEntries(prev => [newEntry, ...prev]);
    return newEntry;
  }, []);

  return {
    historyEntries,
    addHistoryEntry
  };
};
