import { useState, useEffect, useCallback } from 'react';
import { useReportsFilter } from './useReportsFilter';
import { useReportsProcessing } from './useReportsProcessing';

export const useReportsData = () => {
  // Order of hooks matter, always keep them in same order
  const { timeRange, filtersOpen, setTimeRange, toggleFilters, closeFilters } = useReportsFilter();
  const { processRealData } = useReportsProcessing();
  
  // State declarations - keep them consistent
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [expandedData, setExpandedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data from localStorage
  const fetchData = useCallback(() => {
    try {
      setIsRefreshing(true);
      
      // Fetch students data from localStorage
      const studentsData = localStorage.getItem('students') || '[]';
      const students = JSON.parse(studentsData);
      
      // Fetch exercises data from localStorage
      const exercisesData = localStorage.getItem('studentExercises') || '[]';
      const exercises = JSON.parse(exercisesData);
      
      // Fetch supplements data from localStorage
      const supplementsData = localStorage.getItem('studentSupplements') || '[]';
      const supplements = JSON.parse(supplementsData);
      
      // Fetch diet/meal plans data from localStorage
      const mealsData = localStorage.getItem('studentMeals') || '[]';
      const meals = JSON.parse(mealsData);
      
      // Process the data based on the selected time range
      const { monthlyData, expandedData } = processRealData(
        students, 
        exercises, 
        supplements, 
        meals, 
        timeRange
      );
      
      setMonthlyData(monthlyData);
      setExpandedData(expandedData);
      setIsLoading(false);
      setIsRefreshing(false);
      
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [timeRange, processRealData]);
  
  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Refresh data handler
  const handleRefresh = useCallback(() => {
    fetchData();
  }, [fetchData]);
  
  return {
    monthlyData,
    expandedData,
    isLoading,
    isRefreshing,
    timeRange,
    filtersOpen,
    setTimeRange,
    handleRefresh,
    toggleFilters,
    closeFilters
  };
};
