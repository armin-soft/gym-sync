
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Users, History, BarChart3 } from "lucide-react";

interface StudentModernTabsProps {
  activeTab: "all" | "history" | "analytics";
  setActiveTab: (tab: "all" | "history" | "analytics") => void;
}

const StudentModernTabs = ({ activeTab, setActiveTab }: StudentModernTabsProps) => {
  const deviceInfo = useDeviceInfo();
  
  // Animation variants
  const tabIndicatorVariants = {
    all: { x: 0 },
    history: { x: "100%" },
    analytics: { x: "200%" }
  };

  // Get appropriate icon size based on device
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-3 h-3";
    return "w-4 h-4";
  };
  
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={(value) => setActiveTab(value as "all" | "history" | "analytics")}
      className="relative"
    >
      <TabsList className="bg-muted/60 backdrop-blur-sm h-10 p-1 rounded-xl">
        <TabsTrigger 
          value="all" 
          className="flex items-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary rounded-lg"
        >
          <Users className={getIconSize()} />
          <span>همه شاگردان</span>
        </TabsTrigger>
        <TabsTrigger 
          value="history" 
          className="flex items-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary rounded-lg"
        >
          <History className={getIconSize()} />
          <span>تاریخچه</span>
        </TabsTrigger>
        <TabsTrigger 
          value="analytics" 
          className="flex items-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary rounded-lg"
        >
          <BarChart3 className={getIconSize()} />
          <span>آنالیز</span>
        </TabsTrigger>
        
        <motion.div
          className="absolute bottom-1 left-1 right-1 h-8 w-1/3 bg-white dark:bg-gray-800 rounded-lg z-0"
          variants={tabIndicatorVariants}
          animate={activeTab}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          style={{ originX: 0 }}
        />
      </TabsList>
    </Tabs>
  );
};

export default StudentModernTabs;
