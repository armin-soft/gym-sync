
import React, { useState } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { DietHeader } from "./components/DietHeader";
import { DietStats } from "./components/DietStats";
import { WeeklyPlanView } from "./components/WeeklyPlanView";
import { MealManagement } from "./components/MealManagement";
import { useDietData } from "./hooks/useDietData";

const DietPage = () => {
  const [activeView, setActiveView] = useState<"weekly" | "meals">("weekly");
  const { dietStats, weeklyPlans, meals, isLoading } = useDietData();

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <PageContainer fullWidth className="p-6 space-y-8">
        {/* Header Section */}
        <DietHeader 
          activeView={activeView} 
          setActiveView={setActiveView}
        />
        
        {/* Stats Overview */}
        <DietStats stats={dietStats} isLoading={isLoading} />
        
        {/* Main Content */}
        <div className="min-h-[600px]">
          {activeView === "weekly" ? (
            <WeeklyPlanView 
              weeklyPlans={weeklyPlans} 
              isLoading={isLoading}
            />
          ) : (
            <MealManagement 
              meals={meals} 
              isLoading={isLoading}
            />
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default DietPage;
