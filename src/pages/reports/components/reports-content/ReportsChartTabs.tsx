
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ReportsTabControls } from "../ReportsTabControls";
import { AnimatePresence } from "framer-motion";
import { ReportsTabContent } from "../ReportsTabContent";

interface ReportsChartTabsProps {
  monthlyData: any[];
  expandedData: any[];
  chartConfig: any;
  isMobile: boolean;
}

export const ReportsChartTabs = ({ 
  monthlyData, 
  expandedData, 
  chartConfig,
  isMobile 
}: ReportsChartTabsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
      <ReportsTabControls onTabChange={handleTabChange} />

      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <ReportsTabContent
            key={activeTab}
            activeTab={activeTab}
            monthlyData={monthlyData}
            expandedData={expandedData}
            chartConfig={chartConfig}
            isMobile={isMobile}
          />
        </AnimatePresence>
      </div>
    </Tabs>
  );
};
