
import { RefreshCw, Filter, ArrowDown, ArrowUp, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

interface ReportsActionsProps {
  isRefreshing: boolean;
  filtersOpen: boolean;
  handleRefresh: () => void;
  toggleFilters: () => void;
}

export const ReportsActions = ({
  isRefreshing,
  filtersOpen,
  handleRefresh,
  toggleFilters
}: ReportsActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
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
      </TooltipProvider>
    </div>
  );
};
