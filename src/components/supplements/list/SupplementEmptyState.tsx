
import React from "react";
import { Pill, Beaker } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SupplementEmptyStateProps {
  type?: 'supplement' | 'vitamin';
  onAddClick?: () => void;
  searchTerm?: string;
  selectedCategory?: string;
  isTable?: boolean;
  deviceInfo?: any;
  activeTab?: "supplements" | "vitamins";
}

export const SupplementEmptyState = ({
  type = 'supplement',
  onAddClick,
  searchTerm,
  selectedCategory,
  isTable,
  deviceInfo,
  activeTab
}: SupplementEmptyStateProps) => {
  const isFiltering = searchTerm || (selectedCategory && selectedCategory !== "");
  
  // For table layout
  if (isTable) {
    return (
      <tr>
        <td colSpan={4} className="h-32 text-center">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Pill className={cn(
              "mb-2 opacity-40",
              deviceInfo?.isMobile ? "h-6 w-6" : deviceInfo?.isTablet ? "h-7 w-7" : "h-8 w-8"
            )} />
            <p className={cn(
              "font-medium",
              deviceInfo?.isMobile ? "text-sm" : deviceInfo?.isTablet ? "text-base" : "text-lg"
            )}>
              هیچ موردی یافت نشد
            </p>
          </div>
        </td>
      </tr>
    );
  }
  
  // Standard empty state
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
      <div className={cn(
        "rounded-full flex items-center justify-center mb-4 shadow-sm",
        deviceInfo?.isMobile ? "w-12 h-12" : "w-16 h-16",
        (activeTab === "supplements" || type === 'supplement')
          ? "bg-gradient-to-b from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900"
          : "bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900"
      )}>
        {(activeTab === "supplements" || type === 'supplement') ? (
          <Beaker className={deviceInfo?.isMobile ? "h-6 w-6" : "h-8 w-8"} />
        ) : (
          <Pill className={deviceInfo?.isMobile ? "h-6 w-6" : "h-8 w-8"} />
        )}
      </div>
      <h3 className={cn(
        "font-medium text-foreground",
        deviceInfo?.isMobile ? "text-base" : "text-lg"
      )}>
        {isFiltering 
          ? "هیچ موردی با این فیلتر یافت نشد"
          : `هیچ ${type === 'supplement' ? "مکملی" : "ویتامینی"} یافت نشد`
        }
      </h3>
      
      {onAddClick && (
        <button 
          className="mt-4 text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
          onClick={onAddClick}
        >
          <span>افزودن {type === 'supplement' ? "مکمل" : "ویتامین"} جدید</span>
        </button>
      )}
    </div>
  );
};
