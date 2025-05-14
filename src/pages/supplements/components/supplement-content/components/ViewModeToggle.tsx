
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ViewModeToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  isMobile: boolean;
}

export const ViewModeToggle = ({
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  isMobile
}: ViewModeToggleProps) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {!isMobile && (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-lg sm:rounded-xl border-gray-200 dark:border-gray-700 shadow-sm transition-colors",
                    "w-8 h-8 sm:w-9 sm:h-9",
                    viewMode === "grid" && "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">نمایش شبکه‌ای</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-lg sm:rounded-xl border-gray-200 dark:border-gray-700 shadow-sm transition-colors",
                    "w-8 h-8 sm:w-9 sm:h-9",
                    viewMode === "list" && "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">نمایش لیستی</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-lg sm:rounded-xl border-gray-200 dark:border-gray-700 shadow-sm transition-colors",
                "w-8 h-8 sm:w-9 sm:h-9",
                showFilters && "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              )}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">فیلترها</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
