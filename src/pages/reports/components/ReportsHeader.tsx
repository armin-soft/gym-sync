
import { motion } from "framer-motion";
import { ChartBarIcon, Filter, RefreshCw, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReportsHeaderProps {
  isRefreshing: boolean;
  filtersOpen: boolean;
  handleRefresh: () => void;
  toggleFilters: () => void;
  isMobile: boolean;
}

export const ReportsHeader = ({
  isRefreshing,
  filtersOpen,
  handleRefresh,
  toggleFilters,
  isMobile
}: ReportsHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <div className={`p-1.5 rounded-md bg-primary/10 text-primary`}>
            <ChartBarIcon className="w-5 h-5" />
          </div>
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent`}>
            گزارشات و آمار
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
          نمای کلی عملکرد و آمار باشگاه شما در بازه‌های زمانی مختلف به همراه تحلیل روند رشد
        </p>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "px-3 flex gap-2 items-center border border-border/60 bg-card/80 hover:bg-card",
              isRefreshing && "opacity-70 pointer-events-none"
            )}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")} />
            <span className="text-xs">بروزرسانی</span>
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="px-3 flex gap-2 items-center border border-border/60 bg-card/80 hover:bg-card"
            onClick={toggleFilters}
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="text-xs">فیلترها</span>
            {filtersOpen ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
          </Button>
        </div>

        <div className="flex flex-row gap-1 sm:gap-2 items-center">
          <div className="rounded-full w-3 h-3 bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">بروزرسانی: همین الان</span>
        </div>
      </div>
    </motion.div>
  );
};
