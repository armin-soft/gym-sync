
import { useState } from "react";
import { ReportsHeader } from "./components/reports-header";
import { ReportsLayout } from "./components/reports-layout";
import { ReportsLoading } from "./components/loading";
import { useReportsUI } from "./components/hooks";
import { ReportsMain } from "./components/reports-content";

const Reports = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const {
    loading,
    timeRange,
    setTimeRange,
    dashboardType,
    setDashboardType,
    monthlyData,
    expandedData,
    currentMonth,
    previousMonth,
    refreshData
  } = useReportsUI();

  // Handle refresh button click
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  // Toggle filters panel
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  if (loading) {
    return <ReportsLoading />;
  }

  return (
    <ReportsLayout>
      <ReportsHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        dashboardType={dashboardType}
        onDashboardTypeChange={setDashboardType}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onToggleFilters={toggleFilters}
      />
      
      <ReportsMain
        currentMonth={currentMonth}
        previousMonth={previousMonth}
        timeRange={timeRange}
        monthlyData={monthlyData}
        expandedData={expandedData}
        isRefreshing={isRefreshing}
        filtersOpen={filtersOpen}
        onToggleFilters={toggleFilters}
        handleRefresh={handleRefresh}
        deviceInfo={{ isMobile: false }}
        closeFilters={() => setFiltersOpen(false)}
        setTimeRange={setTimeRange}
      />
    </ReportsLayout>
  );
};

export default Reports;
