
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { PageContainer } from "@/components/ui/page-container";

import { useReportsData } from "@/hooks/reports/useReportsData";
import { ReportsHeader } from "./components/ReportsHeader";
import { TimeRangeFilter } from "./components/time-range-filters";
import { ReportsTabControls } from "./components/ReportsTabControls";
import { ReportsTabContent } from "./components/ReportsTabContent";
import { StatCardGrid } from "./components/StatCardGrid";
import { KPIOverview } from "./components/KPIOverview";

const Reports = () => {
  // These state variables must be declared in the same order on every render
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Always call hooks at the top level, before any conditional rendering
  const { theme } = useTheme();
  const deviceInfo = useDeviceInfo();
  
  // Call the useReportsData hook without any conditionals
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

  // Animation delays for staggered appearance
  const baseDelay = 0.1;
  const delayStep = 0.1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="mt-4 text-muted-foreground">در حال بارگذاری گزارشات...</p>
        </div>
      </div>
    );
  }

  // Get latest data - make sure these are defined before using them
  const currentMonth = monthlyData && monthlyData.length > 0 ? monthlyData[monthlyData.length - 1] : null;
  const previousMonth = monthlyData && monthlyData.length > 1 ? monthlyData[monthlyData.length - 2] : null;

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
    <PageContainer 
      fullWidth 
      fullHeight 
      noPadding
      className="overflow-hidden"
    >
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">
        {/* Dynamic background elements */}
        <div className="fixed top-0 right-0 w-[40vw] h-[40vh] bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 opacity-60 animate-pulse" />
        <div className="fixed bottom-0 left-0 w-[35vw] h-[35vh] bg-purple-500/5 rounded-full blur-3xl -ml-40 -mb-40 opacity-70 animate-pulse duration-10000" />
        <div className="fixed top-1/3 left-1/4 w-[25vw] h-[25vh] bg-green-500/5 rounded-full blur-3xl opacity-50 animate-pulse duration-15000" />
        
        <ScrollArea className="h-screen w-full">
          <div className="w-full h-full mx-auto max-w-[1800px] py-4 sm:py-6 md:py-8 space-y-5 sm:space-y-6 md:space-y-8 px-3 sm:px-6 md:px-8 lg:px-10 pb-24">
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
            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  key="filters"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TimeRangeFilter
                    filtersOpen={filtersOpen}
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    handleRefresh={handleRefresh}
                    closeFilters={closeFilters}
                  />
                </motion.div>
              )}
            </AnimatePresence>

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
                <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
                  <ReportsTabControls onTabChange={handleTabChange} />

                  <div className="p-4 sm:p-6">
                    <AnimatePresence mode="wait">
                      <ReportsTabContent
                        key={activeTab}
                        activeTab={activeTab}
                        monthlyData={monthlyData}
                        expandedData={expandedData || []}
                        chartConfig={chartConfig}
                        isMobile={deviceInfo.isMobile}
                      />
                    </AnimatePresence>
                  </div>
                </Tabs>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>
    </PageContainer>
  );
};

export default Reports;
