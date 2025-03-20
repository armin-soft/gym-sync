
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
  maxHeight = "70vh",
  viewMode = "list",
  setViewMode,
  toggleSortOrder,
  sortOrder = "asc",
  showControls = false
}) => {
  return (
    <Card className={cn(
      "border border-slate-200 rounded-xl bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all text-gray-900 dark:text-white",
      className
    )}>
      {showControls && setViewMode && toggleSortOrder && (
        <div className="flex items-center justify-between border-b border-slate-200 p-2 pr-4 pl-4">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-8 w-8 border-muted",
                      viewMode === "grid" && "bg-primary/10 text-primary border-primary/30"
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs font-medium">نمایش شبکه‌ای</p>
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
                      "h-8 w-8 border-muted",
                      viewMode === "list" && "bg-primary/10 text-primary border-primary/30"
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <ListFilter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs font-medium">نمایش لیستی</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
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
                <p className="text-xs font-medium">
                  {sortOrder === "asc" ? "مرتب‌سازی نزولی" : "مرتب‌سازی صعودی"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      
      <ScrollArea className="w-full overflow-auto" style={{ maxHeight }}>
        <motion.div
          layout
          className={cn(
            "p-4 w-full", 
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" 
              : "flex flex-col space-y-3"
          )}
          dir="rtl" // Ensure right-to-left direction
        >
          {children}
        </motion.div>
      </ScrollArea>
    </Card>
  );
};

export default StudentMealListWrapper;
