
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExerciseViewControls } from "./ExerciseViewControls";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Dumbbell } from "lucide-react";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  viewMode?: "grid" | "list";
  setViewMode?: (mode: "grid" | "list") => void;
  toggleSortOrder?: () => void;
  sortOrder?: "asc" | "desc";
  showControls?: boolean;
  isEmpty?: boolean;
}

export const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({
  children,
  className = "",
  maxHeight = "100%",
  viewMode = "list",
  setViewMode,
  toggleSortOrder,
  sortOrder = "asc",
  showControls = false,
  isEmpty = false
}) => {
  const deviceInfo = useDeviceInfo();
  
  // محاسبه ارتفاع ریسپانسیو براساس نوع دستگاه
  const getResponsiveHeight = () => {
    if (deviceInfo.isMobile) {
      return "calc(100vh - 170px)";
    } else if (deviceInfo.isTablet) {
      return "calc(100vh - 150px)";
    } else if (deviceInfo.isSmallLaptop) {
      return "calc(100vh - 120px)";
    } else {
      return "calc(100vh - 100px)";
    }
  };

  // محاسبه پدینگ ریسپانسیو براساس نوع دستگاه
  const getResponsivePadding = () => {
    if (deviceInfo.isMobile) {
      return "p-1";
    } else if (deviceInfo.isTablet) {
      return "p-1.5";
    } else if (deviceInfo.isSmallLaptop) {
      return "p-2";
    } else {
      return "p-3";
    }
  };

  // تنظیم ابعاد آیکون براساس دستگاه
  const getIconSize = () => {
    if (deviceInfo.isMobile) {
      return "h-8 w-8";
    } else if (deviceInfo.isTablet) {
      return "h-10 w-10";
    } else {
      return "h-12 w-12";
    }
  };

  const calculatedMaxHeight = maxHeight === "100%" ? getResponsiveHeight() : maxHeight;

  return (
    <Card className={cn(
      "border border-slate-200 rounded-xl bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all text-gray-900 dark:text-white w-full h-full flex flex-col",
      className
    )}>
      {showControls && setViewMode && toggleSortOrder && (
        <div className="p-1 sm:p-1.5 border-b">
          <ExerciseViewControls
            viewMode={viewMode}
            setViewMode={setViewMode}
            toggleSortOrder={toggleSortOrder}
            sortOrder={sortOrder}
          />
        </div>
      )}
      <ScrollArea className="w-full h-full overflow-auto flex-1" style={{ height: calculatedMaxHeight, maxHeight: calculatedMaxHeight }}>
        {isEmpty ? (
          <div className="flex items-center justify-center h-full p-3 sm:p-4 md:p-6">
            <div className="text-center">
              <Dumbbell className={`mx-auto ${getIconSize()} text-gray-300 mb-2 sm:mb-3`} />
              <h3 className={`${deviceInfo.isMobile ? "text-base" : "text-lg"} font-medium text-gray-700 dark:text-gray-300 mb-1`}>هیچ تمرینی وجود ندارد</h3>
              <p className={`${deviceInfo.isMobile ? "text-2xs" : "text-xs sm:text-sm"} text-gray-500 dark:text-gray-400`}>لطفاً ابتدا حرکت‌های تمرینی را اضافه کنید.</p>
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className={cn(
              getResponsivePadding(),
              "w-full h-full", 
              viewMode === "grid" 
                ? "grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 xs:gap-1.5 sm:gap-2" 
                : "flex flex-col space-y-1 xs:space-y-1.5 sm:space-y-2"
            )}
          >
            {children}
          </motion.div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default StudentExerciseListWrapper;
