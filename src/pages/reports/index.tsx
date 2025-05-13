
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ReportsLayout } from "./components/reports-layout/ReportsLayout";
import { ReportsMain } from "./components/reports-content/ReportsMain";
import { ReportsLoading } from "./components/loading/ReportsLoading";
import { useReportsUI } from "./components/hooks/useReportsUI";

const Reports = () => {
  // Get device info
  const deviceInfo = useDeviceInfo();
  
  // Get UI state from custom hook
  const {
    mounted,
    monthlyData,
    expandedData,
    isRefreshing,
    timeRange,
    filtersOpen,
    setTimeRange,
    handleRefresh,
    toggleFilters,
    closeFilters,
    currentMonth,
    previousMonth
  } = useReportsUI();

  // Show loading state if not mounted
  if (!mounted) {
    return <ReportsLoading />;
  }

  return (
    <ReportsLayout>
      <ReportsMain
        currentMonth={currentMonth}
        previousMonth={previousMonth}
        expandedData={expandedData || []}
        monthlyData={monthlyData || []}
        isRefreshing={isRefreshing}
        filtersOpen={filtersOpen}
        timeRange={timeRange}
        handleRefresh={handleRefresh}
        toggleFilters={toggleFilters}
        closeFilters={closeFilters}
        setTimeRange={setTimeRange}
        deviceInfo={deviceInfo}
      />
    </ReportsLayout>
  );
};

export default Reports;
