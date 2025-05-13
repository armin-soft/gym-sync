
import { useState, useEffect } from 'react';
import { useDeviceInfo } from '@/hooks/use-mobile';

// Mock data for demonstration purposes
const generateMockData = () => {
  return [
    { name: 'فروردین', شاگردان: 12, درآمد: 1200000, تمرین: 24, مکمل: 8, برنامه_غذایی: 15, رشد_شاگردان: 5, رشد_درآمد: 8 },
    { name: 'اردیبهشت', شاگردان: 15, درآمد: 1500000, تمرین: 30, مکمل: 12, برنامه_غذایی: 18, رشد_شاگردان: 25, رشد_درآمد: 25 },
    { name: 'خرداد', شاگردان: 18, درآمد: 1800000, تمرین: 36, مکمل: 15, برنامه_غذایی: 20, رشد_شاگردان: 20, رشد_درآمد: 20 },
  ];
};

export const useReportsUI = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [timeRange, setTimeRange] = useState<string>("month");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardType, setDashboardType] = useState<string>("overview");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [expandedData, setExpandedData] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState<any>(null);
  const [previousMonth, setPreviousMonth] = useState<any>(null);
  const { isMobile } = useDeviceInfo();
  
  // Initialize data on mount
  useEffect(() => {
    const mockData = generateMockData();
    setMonthlyData(mockData);
    setExpandedData(mockData);
    setCurrentMonth(mockData[mockData.length - 1]);
    setPreviousMonth(mockData[mockData.length - 2] || mockData[0]);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Effect to simulate data refreshing
  useEffect(() => {
    if (isRefreshing) {
      const timer = setTimeout(() => {
        setIsRefreshing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    return new Promise(resolve => {
      setTimeout(() => {
        const mockData = generateMockData();
        setMonthlyData(mockData);
        setExpandedData(mockData);
        setCurrentMonth(mockData[mockData.length - 1]);
        setPreviousMonth(mockData[mockData.length - 2] || mockData[0]);
        resolve(true);
      }, 1000);
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshData();
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
  };

  return {
    activeTab,
    timeRange,
    isLoading,
    loading: isLoading, // Alias for backward compatibility
    isRefreshing,
    showDatePicker,
    filtersOpen,
    isMobile,
    dashboardType,
    setDashboardType,
    monthlyData,
    expandedData,
    currentMonth,
    previousMonth,
    refreshData,
    handleRefresh,
    handleTabChange,
    handleTimeRangeChange,
    toggleDatePicker,
    toggleFilters,
    closeFilters,
    setTimeRange,
    setIsLoading
  };
};
