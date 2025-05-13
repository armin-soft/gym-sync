
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { ReportsHeader } from "../ReportsHeader";
import { TimeRangeFilter } from "../time-range-filters";
import { StatCardGrid } from "../StatCardGrid";
import { KPIOverview } from "../KPIOverview";
import { ReportsChartTabs } from "./ReportsChartTabs";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ReportsMainProps {
  currentMonth: any;
  previousMonth: any;
  expandedData: any[];
  monthlyData: any[];
  isRefreshing: boolean;
  filtersOpen: boolean;
  timeRange: string;
  handleRefresh: () => void;
  toggleFilters: () => void;
  closeFilters: () => void;
  setTimeRange: (range: string) => void;
  deviceInfo: any;
}

export const ReportsMain = ({
  currentMonth,
  previousMonth,
  expandedData,
  monthlyData,
  isRefreshing,
  filtersOpen,
  timeRange,
  handleRefresh,
  toggleFilters,
  closeFilters,
  setTimeRange,
  deviceInfo
}: ReportsMainProps) => {
  const { theme } = useTheme();
  const baseDelay = 0.1;
  const delayStep = 0.1;

  // Chart configuration
  const chartConfig = {
    شاگردان: {
      label: "تعداد شاگردان",
      color: theme === 'dark' ? "#818cf8" : "#4f46e5"
    },
    درآمد: {
      label: "درآمد (تومان)",
      color: theme === 'dark' ? "#4ade80" : "#22c55e"
    },
    رشد_شاگردان: {
      label: "رشد شاگردان (%)",
      color: theme === 'dark' ? "#fbbf24" : "#f59e0b"
    },
    رشد_درآمد: {
      label: "رشد درآمد (%)",
      color: theme === 'dark' ? "#f472b6" : "#ec4899"
    },
    تمرین: {
      label: "برنامه‌های تمرینی",
      color: theme === 'dark' ? "#fbbf24" : "#f59e0b"
    },
    مکمل: {
      label: "مکمل‌های تجویز شده",
      color: theme === 'dark' ? "#a78bfa" : "#8b5cf6"
    },
    برنامه_غذایی: {
      label: "برنامه‌های غذایی",
      color: theme === 'dark' ? "#f472b6" : "#ec4899"
    }
  };

  return (
    <>
      {/* Header Section with animated entrance */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: baseDelay }}
      >
        <ReportsHeader 
          isRefreshing={isRefreshing}
          filtersOpen={filtersOpen}
          handleRefresh={handleRefresh}
          toggleFilters={toggleFilters}
          isMobile={deviceInfo.isMobile}
        />
      </motion.div>

      {/* Enhanced Filters Section with smooth animation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: filtersOpen ? 1 : 0, 
          height: filtersOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        {filtersOpen && (
          <TimeRangeFilter
            filtersOpen={filtersOpen}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleRefresh={handleRefresh}
            closeFilters={closeFilters}
          />
        )}
      </motion.div>

      {/* Enhanced Summary Stats Cards with staggered animation */}
      {currentMonth && previousMonth && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + delayStep, duration: 0.5 }}
        >
          <StatCardGrid
            currentMonth={currentMonth}
            previousMonth={previousMonth}
            deviceInfo={deviceInfo}
          />
        </motion.div>
      )}

      {/* Integrated KPI Overview */}
      {currentMonth && expandedData && expandedData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + delayStep * 2, duration: 0.5 }}
        >
          <KPIOverview 
            data={expandedData} 
            growthData={currentMonth} 
            isMobile={deviceInfo.isMobile} 
          />
        </motion.div>
      )}

      {/* Enhanced Chart Tabs with cleaner UI */}
      {monthlyData && monthlyData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + delayStep * 3, duration: 0.5 }}
          className="relative z-10"
        >
          <ReportsChartTabs 
            monthlyData={monthlyData}
            expandedData={expandedData || []}
            chartConfig={chartConfig}
            isMobile={deviceInfo.isMobile}
          />
        </motion.div>
      )}
    </>
  );
};
