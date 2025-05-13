
import React from "react";
import { ReportsLayout } from "./components/reports-layout";
import ReportsHeader from "./components/reports-header";
import { ReportsMain } from "./components/reports-content";
import { useReportsData } from "@/hooks/reports";
import { ReportsLoading } from "./components/loading";

const Reports = () => {
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

  return (
    <ReportsLayout>
      <ReportsHeader
        timeRange={timeRange}
        filtersOpen={filtersOpen}
        isRefreshing={isRefreshing}
        onFilterToggle={toggleFilters}
        onRefresh={handleRefresh}
        onTimeRangeChange={setTimeRange}
        onCloseFilters={closeFilters}
      />
      
      {isLoading ? (
        <ReportsLoading />
      ) : (
        <ReportsMain
          monthlyData={monthlyData}
          expandedData={expandedData}
          timeRange={timeRange}
        />
      )}
    </ReportsLayout>
  );
};

export default Reports;
