
import { motion } from "framer-motion";
import { ChartBarIcon, Filter, RefreshCw, ArrowDown, ArrowUp, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <div className={`p-2 rounded-md bg-primary/10 text-primary shadow-sm`}>
            <ChartBarIcon className="w-5 h-5" />
          </div>
          <h2 className={cn(
            "font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",
            isMobile ? "text-xl" : "text-2xl md:text-3xl"
          )}>
            گزارشات و آمار
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
          نمای کلی عملکرد و آمار باشگاه شما در بازه‌های زمانی مختلف به همراه تحلیل روند رشد
        </p>
      </div>
      
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "px-3 flex gap-2 items-center border border-border/60 bg-card/80 hover:bg-card shadow-sm",
                  isRefreshing && "opacity-70 pointer-events-none"
                )}
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")} />
                <span className="text-xs">بروزرسانی</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>بارگذاری مجدد داده‌ها</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="px-3 flex gap-2 items-center border border-border/60 bg-card/80 hover:bg-card shadow-sm"
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
            </TooltipTrigger>
            <TooltipContent>تنظیم فیلترهای گزارش</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="px-3 flex gap-2 items-center border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary shadow-sm"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span className="text-xs">دریافت گزارش</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>دریافت گزارش به صورت PDF</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-row gap-1 sm:gap-2 items-center bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></div>
            <div className="rounded-full w-2 h-2 bg-green-500 relative"></div>
          </div>
          <span className="text-xs">بروزرسانی: همین الان</span>
        </div>
      </div>
    </div>
  );
};
