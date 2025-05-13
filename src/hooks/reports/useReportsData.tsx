
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
      
      // Fetch students data from localStorage with safety checks
      let students = [];
      try {
        const studentsData = localStorage.getItem('students') || '[]';
        students = JSON.parse(studentsData);
        if (!Array.isArray(students)) students = [];
      } catch (error) {
        console.error("Error parsing students data:", error);
        students = [];
      }
      
      // Fetch exercises data from localStorage with safety checks
      let exercises = [];
      try {
        const exercisesData = localStorage.getItem('studentExercises') || '[]';
        exercises = JSON.parse(exercisesData);
        if (!Array.isArray(exercises)) exercises = [];
      } catch (error) {
        console.error("Error parsing exercises data:", error);
        exercises = [];
      }
      
      // Fetch supplements data from localStorage with safety checks
      let supplements = [];
      try {
        const supplementsData = localStorage.getItem('studentSupplements') || '[]';
        supplements = JSON.parse(supplementsData);
        if (!Array.isArray(supplements)) supplements = [];
      } catch (error) {
        console.error("Error parsing supplements data:", error);
        supplements = [];
      }
      
      // Fetch diet/meal plans data from localStorage with safety checks
      let meals = [];
      try {
        const mealsData = localStorage.getItem('studentMeals') || '[]';
        meals = JSON.parse(mealsData);
        if (!Array.isArray(meals)) meals = [];
      } catch (error) {
        console.error("Error parsing meals data:", error);
        meals = [];
      }
      
      // Process the data based on the selected time range
      const { monthlyData = [], expandedData = [] } = processRealData(
        students, 
        exercises, 
        supplements, 
        meals, 
        timeRange
      ) || { monthlyData: [], expandedData: [] };
      
      setMonthlyData(monthlyData);
      setExpandedData(expandedData);
      setIsLoading(false);
      setIsRefreshing(false);
      
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      setMonthlyData([]);
      setExpandedData([]);
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
