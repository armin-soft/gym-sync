
import { useEffect } from "react";
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
      <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو..."
            className={cn(
              "pr-7 sm:pr-10 text-right rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
              deviceInfo.isMobile ? "h-8 text-xs" : "h-9 sm:h-10 text-sm"
            )}
          />
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          {!deviceInfo.isMobile && (
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
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-gray-200 dark:border-gray-800 pb-3 sm:pb-4 mb-3 sm:mb-4 overflow-hidden"
          >
            <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl">
              <h4 className="text-xs sm:text-sm font-medium mb-2">فیلترها</h4>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                  همه
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                  پروتئین
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
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
