
import React from "react";
import { cn } from "@/lib/utils";
import { StudentSidebarItem } from "../../types/studentSidebarTypes";

interface StudentNavigationItemContentProps {
  item: StudentSidebarItem;
  isActive: boolean;
  deviceInfo: any;
}

export const StudentNavigationItemContent: React.FC<StudentNavigationItemContentProps> = ({
  item,
  isActive,
  deviceInfo
}) => {
  const getTitleSize = () => {
    if (deviceInfo.isMobile) return "text-sm";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-base";
  };

  const getSubtitleSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-xs";
    return "text-sm";
  };

  return (
    <div className="flex-1 min-w-0 text-right">
      <h4 className={cn(
        "font-semibold truncate transition-colors duration-200",
        getTitleSize(),
        isActive 
          ? "text-white" 
          : "text-gray-900 dark:text-gray-100"
      )}>
        {item.title}
      </h4>
      
      {item.subtitle && (
        <p className={cn(
          "truncate transition-colors duration-200 mt-0.5",
          getSubtitleSize(),
          isActive 
            ? "text-white/80" 
            : "text-gray-600 dark:text-gray-400"
        )}>
          {item.subtitle}
        </p>
      )}
    </div>
  );
};
