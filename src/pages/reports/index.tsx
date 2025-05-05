
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDeviceInfo } from "@/hooks/use-mobile";

import { useReportsData } from "@/hooks/reports/useReportsData";
import { StatsSummary } from "@/components/reports/StatsSummary";
import { LoadingState } from "./components/LoadingState";
import { ReportsHeader } from "./components/ReportsHeader";
import { TimeRangeFilters } from "./components/TimeRangeFilters";
import { StatCardsSection } from "./components/StatCardsSection";
import { ReportsTabControls } from "./components/ReportsTabControls";
import { ReportsTabContent } from "./components/ReportsTabContent";

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
  
  const [activeTab, setActiveTab] = useState("overview");
  const deviceInfo = useDeviceInfo();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  // Chart configuration
  const chartConfig = {
    شاگردان: {
      label: "تعداد شاگردان",
      color: "#4f46e5"
    },
    درآمد: {
      label: "درآمد (تومان)",
      color: "#22c55e"
    },
    رشد_شاگردان: {
      label: "رشد شاگردان (%)",
      color: "#f59e0b"
    },
    رشد_درآمد: {
      label: "رشد درآمد (%)",
      color: "#ec4899"
    },
    تمرین: {
      label: "برنامه‌های تمرینی",
      color: "#f59e0b"
    },
    مکمل: {
      label: "مکمل‌های تجویز شده",
      color: "#8b5cf6"
    },
    برنامه_غذایی: {
      label: "برنامه‌های غذایی",
      color: "#ec4899"
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -ml-40 -mb-40" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
      
      <ScrollArea className="h-screen w-full">
        <div className="w-full h-full py-4 sm:py-6 md:py-8 space-y-5 sm:space-y-6 md:space-y-8 px-3 sm:px-6 md:px-8 lg:px-10 pb-24">
          {/* Header Section */}
          <ReportsHeader 
            isRefreshing={isRefreshing}
            filtersOpen={filtersOpen}
            handleRefresh={handleRefresh}
            toggleFilters={toggleFilters}
            isMobile={deviceInfo.isMobile}
          />

          {/* Filters Section */}
          <TimeRangeFilters
            filtersOpen={filtersOpen}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleRefresh={handleRefresh}
            closeFilters={closeFilters}
          />

          {/* Summary Cards */}
          <StatCardsSection 
            currentMonth={currentMonth}
            previousMonth={previousMonth}
            deviceInfo={deviceInfo}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <StatsSummary 
              data={expandedData} 
              growthData={currentMonth} 
              isMobile={deviceInfo.isMobile} 
            />
          </motion.div>

          {/* Chart Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative z-10"
          >
            <Tabs defaultValue="overview" className="space-y-4 md:space-y-6" onValueChange={handleTabChange}>
              <ReportsTabControls onTabChange={handleTabChange} />

              <AnimatePresence mode="wait">
                <ReportsTabContent
                  activeTab={activeTab}
                  monthlyData={monthlyData}
                  expandedData={expandedData}
                  chartConfig={chartConfig}
                  isMobile={deviceInfo.isMobile}
                />
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default Reports;
