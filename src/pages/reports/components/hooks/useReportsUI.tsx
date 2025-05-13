
import { useState, useEffect } from "react";
import { useReportsData } from "@/hooks/reports/useReportsData";

export const useReportsUI = () => {
  // These state variables must be declared in the same order on every render
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Always call hooks at the top level, before any conditional rendering
  const {
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
  } = useReportsData();

  // Set mounted state once component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get latest data - make sure these are defined before using them
  const currentMonth = monthlyData && monthlyData.length > 0 ? monthlyData[monthlyData.length - 1] : null;
  const previousMonth = monthlyData && monthlyData.length > 1 ? monthlyData[monthlyData.length - 2] : null;

  return {
    mounted,
    activeTab,
    setActiveTab,
    monthlyData,
    expandedData,
    isLoading,
    isRefreshing,
    timeRange,
    filtersOpen,
    setTimeRange,
    handleRefresh,
    toggleFilters,
    closeFilters,
    currentMonth,
    previousMonth
  };
};
