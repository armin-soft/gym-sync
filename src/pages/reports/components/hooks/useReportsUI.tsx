
import { useState, useEffect } from 'react';
import { useDeviceInfo } from '@/hooks/use-mobile';

export const useReportsUI = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [timeRange, setTimeRange] = useState<string>("month");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const { isMobile } = useDeviceInfo();
  
  // Effect to simulate data loading
  useEffect(() => {
    if (isRefreshing) {
      const timer = setTimeout(() => {
        setIsRefreshing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing]);
  
  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleRefresh = () => {
    setIsRefreshing(true);
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
    isRefreshing,
    showDatePicker,
    filtersOpen,
    isMobile,
    handleTabChange,
    handleTimeRangeChange,
    toggleDatePicker,
    handleRefresh,
    toggleFilters,
    closeFilters,
    setTimeRange,
    setIsLoading
  };
};
