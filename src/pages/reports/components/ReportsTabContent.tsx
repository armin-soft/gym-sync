
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useTheme } from "@/hooks/use-theme";
import { 
  OverviewChart, 
  IncomeChart, 
  GrowthChart, 
  ActivitiesChart, 
  ComparisonChart 
} from "./charts";
import { EmptyChartState, ChartTooltip } from "./charts/utils";

interface ReportsTabContentProps {
  activeTab: string;
  monthlyData: any[];
  expandedData: any[];
  chartConfig: any;
  isMobile: boolean;
}

export const ReportsTabContent = ({
  activeTab,
  monthlyData,
  expandedData,
  chartConfig,
  isMobile
}: ReportsTabContentProps) => {
  // Always call hooks unconditionally
  const { theme } = useTheme();
  const [chartHeight, setChartHeight] = useState(400);
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Handle resize for chart height
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setChartHeight(280);
      } else if (width < 1024) {
        setChartHeight(350);
      } else {
        setChartHeight(400);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Prepare chart data safely
  useEffect(() => {
    // Ensure we have data before processing
    if (!monthlyData || monthlyData.length === 0) {
      setChartData([]);
      return;
    }
    
    // Prepare data for the active tab
    if (activeTab === 'income') {
      setChartData(monthlyData.map(month => ({
        name: month.name || '',
        درآمد: month.درآمد || 0,
        رشد: month.رشد_درآمد || 0
      })));
    } else if (activeTab === 'growth') {
      setChartData(monthlyData.map(month => ({
        name: month.name || '',
        رشد_شاگردان: month.رشد_شاگردان || 0,
        رشد_درآمد: month.رشد_درآمد || 0
      })));
    } else if (activeTab === 'activities' || activeTab === 'comparison') {
      setChartData(monthlyData.map(month => ({
        name: month.name || '',
        تمرین: month.تمرین || 0,
        مکمل: month.مکمل || 0,
        برنامه_غذایی: month.برنامه_غذایی || 0
      })));
    } else {
      // Overview tab
      setChartData(monthlyData.map(month => ({
        name: month.name || '',
        شاگردان: month.شاگردان || 0,
        درآمد: (month.درآمد || 0) / 1000000 // Convert to millions for better scaling
      })));
    }
  }, [activeTab, monthlyData]);

  // Custom tooltip renderer
  const customTooltip = (props: any) => {
    return <ChartTooltip {...props} chartConfig={chartConfig} />;
  };

  // If we don't have data, show loading or empty state
  if (!chartData || chartData.length === 0) {
    return (
      <TabsContent value={activeTab} className="flex items-center justify-center h-64">
        <EmptyChartState />
      </TabsContent>
    );
  }

  // Render appropriate chart based on active tab
  const renderChart = () => {
    switch (activeTab) {
      case 'income':
        return (
          <IncomeChart 
            chartData={chartData} 
            chartConfig={chartConfig} 
            chartHeight={chartHeight} 
            customTooltip={customTooltip} 
            isMobile={isMobile} 
          />
        );
      case 'growth':
        return (
          <GrowthChart 
            chartData={chartData} 
            chartConfig={chartConfig} 
            chartHeight={chartHeight} 
            customTooltip={customTooltip} 
            isMobile={isMobile} 
          />
        );
      case 'activities':
        return (
          <ActivitiesChart 
            chartData={chartData} 
            chartConfig={chartConfig} 
            customTooltip={customTooltip} 
            isMobile={isMobile} 
          />
        );
      case 'comparison':
        return (
          <ComparisonChart 
            chartData={chartData} 
            chartConfig={chartConfig} 
            chartHeight={chartHeight} 
            customTooltip={customTooltip} 
            isMobile={isMobile} 
          />
        );
      default: // overview
        return (
          <OverviewChart 
            chartData={chartData} 
            chartConfig={chartConfig} 
            chartHeight={chartHeight} 
            customTooltip={customTooltip} 
            isMobile={isMobile} 
          />
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <TabsContent value={activeTab} className="mt-0 outline-none">
        {renderChart()}
      </TabsContent>
    </AnimatePresence>
  );
};
