
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

import { TimeRangeOptions } from "./TimeRangeOptions";
import { CustomDateRangePicker } from "./CustomDateRangePicker";

interface TimeRangeFiltersProps {
  filtersOpen: boolean;
  timeRange: string;
  setTimeRange: (range: string) => void;
  handleRefresh: () => void;
  closeFilters: () => void;
}

export const TimeRangeFilter = ({
  filtersOpen,
  timeRange,
  setTimeRange,
  handleRefresh,
  closeFilters
}: TimeRangeFiltersProps) => {
  if (!filtersOpen) return null;

  return (
    <Card className="p-4 sm:p-6 mb-4 shadow-lg backdrop-blur-sm bg-card/95 border border-border/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium">فیلترهای گزارش</h3>
        <Button size="icon" variant="ghost" onClick={closeFilters} className="h-8 w-8 rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <TimeRangeOptions timeRange={timeRange} setTimeRange={setTimeRange} />
        
        {timeRange === "custom" && (
          <CustomDateRangePicker />
        )}
      </motion.div>

      <div className="flex justify-end mt-6 gap-3">
        <Button variant="outline" onClick={closeFilters} className="px-4">
          انصراف
        </Button>
        <Button onClick={handleRefresh} className="px-4 bg-primary text-white hover:bg-primary/90">
          اعمال فیلتر
        </Button>
      </div>
    </Card>
  );
};
