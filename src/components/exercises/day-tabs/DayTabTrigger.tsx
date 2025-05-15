
import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import DayTabIcon from "./DayTabIcon";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface DayTabTriggerProps {
  tabId: string;
  count: number;
  isActive: boolean;
}

const DayTabTrigger: React.FC<DayTabTriggerProps> = ({
  tabId,
  count,
  isActive
}) => {
  const deviceInfo = useDeviceInfo();
  
  const getDayName = (id: string) => {
    switch(id) {
      case "day1": return "روز اول";
      case "day2": return "روز دوم";
      case "day3": return "روز سوم";
      case "day4": return "روز چهارم";
      default: return id;
    }
  };
  
  const getCountBadge = () => {
    if (count === 0) return null;
    
    return (
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground min-w-[1.25rem] h-5 px-1.5",
          isActive ? "bg-white text-primary" : ""
        )}
      >
        {count}
      </motion.span>
    );
  };

  return (
    <TabsTrigger
      value={tabId}
      className={cn(
        "relative flex items-center gap-2 transition-all duration-300",
        deviceInfo.isMobile ? "flex-1 py-1.5 text-xs" : "py-2 px-4"
      )}
    >
      <DayTabIcon tabId={tabId} isActive={isActive} />
      <span className={deviceInfo.isMobile ? "text-xs" : "text-sm"}>
        {getDayName(tabId)}
      </span>
      {getCountBadge()}
    </TabsTrigger>
  );
};

export default DayTabTrigger;
