
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { generateHistoricalData } from '@/lib/utils/reports';

export const useReportsData = () => {
  const { toast } = useToast();
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [expandedData, setExpandedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("6months");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    try {
      // Data fetching logic
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
      const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
      const meals = JSON.parse(localStorage.getItem('meals') || '[]');
      const prevMonthStudents = JSON.parse(localStorage.getItem('prevMonthStudents') || '[]');
      const prevMonthSupplements = JSON.parse(localStorage.getItem('prevMonthSupplements') || '[]');
      const prevMonthMeals = JSON.parse(localStorage.getItem('prevMonthMeals') || '[]');

      // Generate historical data based on time range
      const { monthlyData, expandedData } = generateHistoricalData(
        students,
        prevMonthStudents,
        prevMonthSupplements,
        prevMonthMeals,
        exercises,
        supplements,
        meals,
        timeRange
      );

      setMonthlyData(monthlyData);
      setExpandedData(expandedData);
      setIsLoading(false);
      setIsRefreshing(false);
      
      toast({
        title: "اطلاعات با موفقیت بارگذاری شد",
        description: `${toPersianNumbers(monthlyData.length)} دوره زمانی بارگذاری شد`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoading(false);
      setIsRefreshing(false);
      
      toast({
        title: "خطا در بارگذاری اطلاعات",
        description: "لطفا مجددا تلاش کنید",
        variant: "destructive",
      });
    }
  };

  // Load data effect
  useEffect(() => {
    loadData();
    
    // Update on localStorage changes
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [timeRange]);

  const handleRefresh = () => {
    loadData();
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
  };

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
