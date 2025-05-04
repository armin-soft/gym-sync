
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, ListFilter, ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: () => void;
}

export const SearchAndFilters = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortOrder,
  onSortOrderChange
}: SearchAndFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col sm:flex-row items-stretch gap-4"
    >
      <div className="relative flex-1">
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground/70 transition-colors group-hover:text-primary" />
        <Input 
          placeholder="جستجو در وعده های غذایی..." 
          className="pr-10 h-11 text-base focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-300" 
          value={searchQuery} 
          onChange={e => onSearchChange(e.target.value)} 
        />
      </div>
      
      <div className="flex items-center gap-2 self-start">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "h-11 w-11 border-muted", 
                  viewMode === "grid" && "bg-primary/10 text-primary border-primary/30"
                )} 
                onClick={() => onViewModeChange("grid")}
              >
                <LayoutGrid className="h-5 w-5" />
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
                  "h-11 w-11 border-muted", 
                  viewMode === "list" && "bg-primary/10 text-primary border-primary/30"
                )} 
                onClick={() => onViewModeChange("list")}
              >
                <ListFilter className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">نمایش لیستی</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-11 w-11 border-muted" 
                onClick={onSortOrderChange}
              >
                {sortOrder === "asc" ? 
                  <ArrowDownAZ className="h-5 w-5" /> : 
                  <ArrowUpZA className="h-5 w-5" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">تغییر ترتیب</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};
