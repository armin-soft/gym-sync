
import React from 'react';
import { Edit, Dumbbell, Apple, Pill, Trash2, History } from 'lucide-react';
import { HistoryEntry } from '@/hooks/useStudentHistory';

// Get icon based on history entry type
export const getHistoryIcon = (type: HistoryEntry['type']) => {
  switch (type) {
    case 'edit':
      return <Edit className="h-5 w-5 text-blue-500" />;
    case 'exercise':
      return <Dumbbell className="h-5 w-5 text-indigo-500" />;
    case 'diet':
      return <Apple className="h-5 w-5 text-green-500" />;
    case 'supplement':
      return <Pill className="h-5 w-5 text-amber-500" />;
    case 'delete':
      return <Trash2 className="h-5 w-5 text-red-500" />;
    default:
      return <History className="h-5 w-5 text-gray-500" />;
  }
};

// Get background color based on history entry type
export const getHistoryBgColor = (type: HistoryEntry['type']) => {
  switch (type) {
    case 'edit':
      return 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30';
    case 'exercise':
      return 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30';
    case 'diet':
      return 'bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30';
    case 'supplement':
      return 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30';
    case 'delete':
      return 'bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30';
    default:
      return 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/40 dark:hover:bg-gray-800/60';
  }
};

// Get text color based on history entry type
export const getHistoryTextColor = (type: HistoryEntry['type']) => {
  switch (type) {
    case 'edit':
      return 'text-blue-700 dark:text-blue-300';
    case 'exercise':
      return 'text-indigo-700 dark:text-indigo-300';
    case 'diet':
      return 'text-green-700 dark:text-green-300';
    case 'supplement':
      return 'text-amber-700 dark:text-amber-300';
    case 'delete':
      return 'text-red-700 dark:text-red-300';
    default:
      return 'text-gray-700 dark:text-gray-300';
  }
};

// Get badge style based on history entry type
export const getHistoryBadgeStyle = (type: HistoryEntry['type']) => {
  switch (type) {
    case 'edit':
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50';
    case 'exercise':
      return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50';
    case 'diet':
      return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50';
    case 'supplement':
      return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50';
    case 'delete':
      return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  }
};

// Helper function to filter history entries
export const filterHistoryEntries = (
  entries: HistoryEntry[],
  filter: string,
  searchQuery: string,
  timeRange: string,
  selectedStudent: number | 'all'
): HistoryEntry[] => {
  let filtered = [...entries];
  
  // Filter by type
  if (filter !== 'all') {
    filtered = filtered.filter(entry => entry.type === filter);
  }
  
  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(entry => 
      entry.studentName.toLowerCase().includes(query) || 
      entry.description.toLowerCase().includes(query)
    );
  }
  
  // Filter by time range
  if (timeRange !== 'all') {
    const now = Date.now(); // Current timestamp in milliseconds
    const dayInMs = 24 * 60 * 60 * 1000;
    
    if (timeRange === 'today') {
      filtered = filtered.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        return new Date(now).toDateString() === entryDate.toDateString();
      });
    } else if (timeRange === 'week') {
      filtered = filtered.filter(entry => {
        return now - entry.timestamp <= 7 * dayInMs;
      });
    } else if (timeRange === 'month') {
      filtered = filtered.filter(entry => {
        return now - entry.timestamp <= 30 * dayInMs;
      });
    }
  }
  
  // Filter by student
  if (selectedStudent !== 'all') {
    filtered = filtered.filter(entry => entry.studentId === selectedStudent);
  }
  
  return filtered.sort((a, b) => b.timestamp - a.timestamp);
};
