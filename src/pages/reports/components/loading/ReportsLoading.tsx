
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ReportsLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-56" />
      </div>
      
      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={`stat-${index}`} className="h-32 rounded-lg" />
        ))}
      </div>
      
      {/* Tabs skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-80 w-full rounded-lg" />
      </div>
    </div>
  );
}
