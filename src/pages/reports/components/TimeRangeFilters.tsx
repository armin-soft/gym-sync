
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface TimeRangeFiltersProps {
  filtersOpen: boolean;
  timeRange: string;
  setTimeRange: (range: string) => void;
  handleRefresh: () => void;
  closeFilters: () => void;
}

export const TimeRangeFilters = ({
  filtersOpen,
  timeRange,
  setTimeRange,
  handleRefresh,
  closeFilters
}: TimeRangeFiltersProps) => {
  return (
    <AnimatePresence>
      {filtersOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/60">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="space-y-1.5">
                <label className="text-xs font-medium">بازه زمانی</label>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant={timeRange === "3months" ? "default" : "outline"} 
                    className="h-8 text-xs"
                    onClick={() => setTimeRange("3months")}
                  >
                    {toPersianNumbers(3)} ماه
                  </Button>
                  <Button 
                    size="sm" 
                    variant={timeRange === "6months" ? "default" : "outline"} 
                    className="h-8 text-xs"
                    onClick={() => setTimeRange("6months")}
                  >
                    {toPersianNumbers(6)} ماه
                  </Button>
                  <Button 
                    size="sm" 
                    variant={timeRange === "1year" ? "default" : "outline"} 
                    className="h-8 text-xs"
                    onClick={() => setTimeRange("1year")}
                  >
                    {toPersianNumbers(1)} سال
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <Button 
                  size="sm"
                  variant="ghost"
                  onClick={closeFilters}
                  className="text-xs"
                >
                  بستن
                </Button>
                
                <Button 
                  size="sm"
                  className="text-xs"
                  onClick={handleRefresh}
                >
                  اعمال فیلترها
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
