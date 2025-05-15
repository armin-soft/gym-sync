
import React from "react";
import { ListFilter, LayoutGrid, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SupplementViewToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const SupplementViewToggle: React.FC<SupplementViewToggleProps> = ({
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters
}) => {
  const deviceInfo = useDeviceInfo();
  
  if (deviceInfo.isMobile) return null;
  
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "border-muted transition-colors",
                deviceInfo.isMobile ? "h-7 w-7" : "h-9 w-9",
                viewMode === "grid" && "bg-primary/10 text-primary"
              )} 
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
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
                "border-muted transition-colors",
                deviceInfo.isMobile ? "h-7 w-7" : "h-9 w-9",
                viewMode === "list" && "bg-primary/10 text-primary"
              )} 
              onClick={() => setViewMode("list")}
            >
              <ListFilter className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs font-medium">نمایش لیستی</p>
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
                "border-muted transition-colors",
                deviceInfo.isMobile ? "h-7 w-7" : "h-9 w-9",
                showFilters && "bg-primary/10 text-primary"
              )} 
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs font-medium">فیلترها</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
