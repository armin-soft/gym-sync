
import { useState } from 'react';
import { format } from 'date-fns-jalali';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { filterHistoryEntries } from './HistoryUtils';
import { HistoryEntry } from '@/hooks/useStudentHistory';

export const useHistory = (historyEntries: HistoryEntry[]) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<number | 'all'>('all');

  // Get filtered history entries
  const filteredEntries = filterHistoryEntries(
    historyEntries,
    filter,
    searchQuery,
    timeRange,
    selectedStudent
  );

  // Format date function
  const formatDate = (timestamp: number) => {
    try {
      return format(new Date(timestamp), 'yyyy/MM/dd - HH:mm');
    } catch (error) {
      return toPersianNumbers(new Date(timestamp).toLocaleDateString('fa-IR'));
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setTimeRange('all');
    setSelectedStudent('all');
  };

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    timeRange,
    setTimeRange,
    selectedStudent,
    setSelectedStudent,
    filteredEntries,
    formatDate,
    clearFilters,
  };
};
