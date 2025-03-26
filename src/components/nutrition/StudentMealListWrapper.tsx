
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  LayoutGrid, 
  ListFilter, 
  ArrowDownAZ, 
  ArrowUpZA 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StudentMealListWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  viewMode?: "grid" | "list";
  setViewMode?: (mode: "grid" | "list") => void;
  toggleSortOrder?: () => void;
  sortOrder?: "asc" | "desc";
  showControls?: boolean;
}

const StudentMealListWrapper: React.FC<StudentMealListWrapperProps> = ({
  children,
  className = "",
  maxHeight = "calc(100vh - 280px)",
  viewMode = "list",
  setViewMode,
  toggleSortOrder,
  sortOrder = "asc",
  showControls = false
}) => {
  return (
    <div className={cn(
      "border-0 rounded-none bg-white/95 backdrop-blur-sm transition-all text-gray-900 dark:text-white overflow-hidden h-full",
      className
    )}>
      {showControls && (
        <div className="flex items-center justify-end gap-2 p-3 bg-muted/20 border-b">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 border-muted",
                    viewMode === "grid" && "bg-primary/10 text-primary border-primary/30"
                  )}
                  onClick={() => setViewMode?.("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
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
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 border-muted",
                    viewMode === "list" && "bg-primary/10 text-primary border-primary/30"
                  )}
                  onClick={() => setViewMode?.("list")}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">نمایش لیستی</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {toggleSortOrder && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 border-muted"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === "asc" ? (
                      <ArrowDownAZ className="h-4 w-4" />
                    ) : (
                      <ArrowUpZA className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">تغییر ترتیب</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
      <ScrollArea className="w-full h-full overflow-visible" style={{ maxHeight }}>
        <motion.div
          layout
          className={cn(
            "p-4 w-full", 
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3" 
              : "flex flex-col space-y-3"
          )}
        >
          {children}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default StudentMealListWrapper;
