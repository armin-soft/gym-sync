
import React from "react";
import { ReportsHeader } from "../reports-header";
import { useReportsUI } from "../hooks";

interface ReportsLayoutProps {
  children: React.ReactNode;
}

export const ReportsLayout: React.FC<ReportsLayoutProps> = ({ children }) => {
  const { 
    isRefreshing, 
    filtersOpen, 
    handleRefresh, 
    toggleFilters,
    isMobile
  } = useReportsUI();

  return (
    <div className="flex flex-col h-full">
      <ReportsHeader 
        isRefreshing={isRefreshing}
        filtersOpen={filtersOpen}
        handleRefresh={handleRefresh}
        toggleFilters={toggleFilters}
        isMobile={isMobile}
      />
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
};
