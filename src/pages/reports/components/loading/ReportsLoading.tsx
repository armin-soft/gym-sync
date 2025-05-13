
import React from "react";

export const ReportsLoading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="mt-4 text-muted-foreground">در حال بارگذاری گزارشات...</p>
      </div>
    </div>
  );
};
