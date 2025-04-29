
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, LayoutGrid, LayoutList } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ExerciseViewControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

export const ExerciseViewControls: React.FC<ExerciseViewControlsProps> = ({
  viewMode,
  setViewMode,
  toggleSortOrder,
  sortOrder
}) => {
  const deviceInfo = useDeviceInfo();

  // تنظیم اندازه آیکون‌ها و دکمه‌ها برحسب نوع دستگاه
  const getButtonSize = () => {
    if (deviceInfo.isMobile) {
      return "h-6 w-6";
    } else if (deviceInfo.isTablet) {
      return "h-7 w-7";
    } else {
      return "h-8 w-8";
    }
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) {
      return "h-3 w-3";
    } else if (deviceInfo.isTablet) {
      return "h-3.5 w-3.5";
    } else {
      return "h-4 w-4";
    }
  };

  // نمایش یا عدم نمایش tooltip برحسب نوع دستگاه
  const shouldShowTooltip = !deviceInfo.isMobile;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex rounded-md overflow-hidden border shadow-sm bg-white"
    >
      {shouldShowTooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={`${getButtonSize()} p-0 rounded-none ${viewMode === "grid" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className={getIconSize()} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">نمایش گرید</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={`${getButtonSize()} p-0 rounded-none ${viewMode === "list" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <LayoutList className={getIconSize()} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">نمایش لیست</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={`${getButtonSize()} p-0 rounded-none`}
                onClick={toggleSortOrder}
              >
                {sortOrder === "asc" ? <ArrowDown className={getIconSize()} /> : <ArrowUp className={getIconSize()} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{sortOrder === "asc" ? "مرتب‌سازی نزولی" : "مرتب‌سازی صعودی"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <>
          <Button 
            variant="ghost" 
            size="sm"
            className={`${getButtonSize()} p-0 rounded-none ${viewMode === "grid" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className={getIconSize()} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className={`${getButtonSize()} p-0 rounded-none ${viewMode === "list" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <LayoutList className={getIconSize()} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className={`${getButtonSize()} p-0 rounded-none`}
            onClick={toggleSortOrder}
          >
            {sortOrder === "asc" ? <ArrowDown className={getIconSize()} /> : <ArrowUp className={getIconSize()} />}
          </Button>
        </>
      )}
    </motion.div>
  );
};
