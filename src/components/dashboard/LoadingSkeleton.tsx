
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/ui/page-container";
import { Card } from "@/components/ui/card";

export const LoadingSkeleton = () => {
  return (
    <PageContainer fullWidth noPadding>
      <div className="w-full h-full overflow-auto">
        {/* Header skeleton */}
        <div className="bg-gradient-to-r from-brand-600/90 to-indigo-600/90 p-4 sm:p-6 md:p-8">
          <div className="max-w-[1800px] mx-auto">
            {/* Header content */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-col space-y-4 w-full md:w-auto">
                <Skeleton className="h-8 w-64 bg-white/20" />
                <Skeleton className="h-4 w-40 bg-white/20" />
              </div>
              
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-48 bg-white/20 hidden md:block" />
                <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
                <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
              </div>
            </div>
            
            {/* Header cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="bg-white/10 border-white/20 p-4 flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-white/20" />
                    <Skeleton className="h-6 w-16 bg-white/20" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content skeletons */}
        <div className="p-3 sm:p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto">
          {/* Stats skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-8 w-20 mb-3" />
                <Skeleton className="h-2 w-full rounded-full" />
              </Card>
            ))}
          </div>
          
          {/* Layout grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart skeleton */}
              <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-32 rounded-md" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-[250px] w-full" />
              </Card>
              
              {/* Students list skeleton */}
              <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-9 w-48 rounded-md" />
                </div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border-b">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div>
                          <Skeleton className="h-5 w-32 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Side panel */}
            <div className="space-y-6">
              {/* Quick actions skeleton */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3 p-3">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <div>
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Progress skeleton */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-12" />
                      </div>
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
