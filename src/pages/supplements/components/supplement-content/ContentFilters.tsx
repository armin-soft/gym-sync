
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ContentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  deviceInfo: any;
}

export const ContentFilters = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  deviceInfo
}: ContentFiltersProps) => {
  return (
    <>
      <div className="flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
        <div className="relative flex-1">
          <Search className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو..."
            className={cn(
              "pr-6 sm:pr-8 text-right rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
              deviceInfo.isMobile ? "h-7 text-xs" : "h-8 sm:h-9 text-sm"
            )}
          />
        </div>
        
        <div className="flex items-center gap-1">
          {!deviceInfo.isMobile && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "rounded-lg border-gray-200 dark:border-gray-700 shadow-sm transition-colors",
                        "w-7 h-7 sm:w-8 sm:h-8",
                        viewMode === "grid" && "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      )}
                      onClick={() => setViewMode("grid")}
                    >
                      <LayoutGrid className="h-3 w-3" />
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
                        "rounded-lg border-gray-200 dark:border-gray-700 shadow-sm transition-colors",
                        "w-7 h-7 sm:w-8 sm:h-8",
                        viewMode === "list" && "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      )}
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-3 w-3" />
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
                    "rounded-lg border-gray-200 dark:border-gray-700 shadow-sm transition-colors",
                    "w-7 h-7 sm:w-8 sm:h-8",
                    showFilters && "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  )}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">فیلترها</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-gray-200 dark:border-gray-800 pb-2 sm:pb-3 mb-2 sm:mb-3 overflow-hidden"
          >
            <div className="p-1.5 sm:p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="text-2xs sm:text-xs font-medium mb-1.5">فیلترها</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-2xs sm:text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                  همه
                </Badge>
                <Badge variant="outline" className="text-2xs sm:text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                  پروتئین
                </Badge>
                <Badge variant="outline" className="text-2xs sm:text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                  کراتین
                </Badge>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
