
import React from "react";
import { ReportsLayout } from "./components/reports-layout";
import { ReportsHeader } from "./components/reports-header";
import { ReportsMain } from "./components/reports-content";
import { useReportsData } from "@/hooks/reports";
import { ReportsLoading } from "./components/loading";
import { useDeviceInfo } from "@/hooks/use-mobile";

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
  
  const deviceInfo = useDeviceInfo();
  
  // Mock data for current and previous month
  const currentMonth = expandedData && expandedData.length > 0 ? 
    expandedData[expandedData.length - 1] : null;
  const previousMonth = expandedData && expandedData.length > 1 ?
    expandedData[expandedData.length - 2] : null;

  return (
    <ReportsLayout>
      {isLoading ? (
        <ReportsLoading />
      ) : (
        <ReportsMain
          currentMonth={currentMonth}
          previousMonth={previousMonth}
          monthlyData={monthlyData}
          expandedData={expandedData}
          timeRange={timeRange}
          isRefreshing={isRefreshing}
          filtersOpen={filtersOpen}
          handleRefresh={handleRefresh}
          toggleFilters={toggleFilters}
          closeFilters={closeFilters}
          setTimeRange={setTimeRange}
          deviceInfo={deviceInfo}
        />
      )}
    </ReportsLayout>
  );
};

export default Reports;
