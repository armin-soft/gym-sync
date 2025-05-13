
import { useState } from "react";
import { TimeRangeOptions } from "./TimeRangeOptions";
import { CustomDateRangePicker } from "./CustomDateRangePicker";

interface TimeRangeFilterProps {
  onFilterChange?: (range: string, dates?: { startDate: Date; endDate: Date }) => void;
}

export const TimeRangeFilter = ({ onFilterChange }: TimeRangeFilterProps) => {
  const [timeRange, setTimeRange] = useState("week");
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    
    if (range === "custom") {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
      onFilterChange?.(range);
    }
  };

  const handleCustomDateChange = (startDate: Date, endDate: Date) => {
    onFilterChange?.("custom", { startDate, endDate });
  };

  return (
    <div className="space-y-4">
      <TimeRangeOptions 
        timeRange={timeRange} 
        setTimeRange={handleTimeRangeChange} 
      />
      
      {showCustomDatePicker && (
        <CustomDateRangePicker onDateRangeChange={handleCustomDateChange} />
      )}
    </div>
  );
};
