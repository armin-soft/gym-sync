
import { useState } from "react";

export function useReportsUI() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };
  
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  
  return {
    activeTab,
    timeRange,
    isLoading,
    showDatePicker,
    handleTabChange,
    handleTimeRangeChange,
    toggleDatePicker,
    setIsLoading
  };
}
