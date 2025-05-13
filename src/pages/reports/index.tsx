
import { useState } from "react";
import { ReportsLayout } from "./components/reports-layout";
import { ReportsLoading } from "./components/loading";
import { useReportsUI } from "./components/hooks";
import { ReportsMain } from "./components/reports-content";

const Reports = () => {
  const {
    loading,
    isRefreshing,
    filtersOpen,
    isMobile,
    timeRange,
    setTimeRange,
    dashboardType,
    setDashboardType,
    monthlyData,
    expandedData,
    currentMonth,
    previousMonth,
    handleRefresh,
    toggleFilters
  } = useReportsUI();

  // Handle closing filters
  const closeFilters = () => {
    toggleFilters();
  };

  if (loading) {
    return <ReportsLoading />;
  }

  return (
    <ReportsLayout>
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
        deviceInfo={{ isMobile }}
        closeFilters={closeFilters}
        setTimeRange={setTimeRange}
      />
    </ReportsLayout>
  );
};

export default Reports;
