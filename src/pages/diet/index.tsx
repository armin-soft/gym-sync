
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { DietHeader } from "./components/DietHeader";
import { DietStats } from "./components/DietStats";
import { WeeklyPlanView } from "./components/WeeklyPlanView";
import { MealManagement } from "./components/MealManagement";
import { useDietData } from "./hooks/useDietData";

const Index = () => {
  const { meals, loading, addMeal, editMeal, deleteMeal, selectedWeek, setSelectedWeek } = useDietData();

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
      <PageContainer fullWidth fullHeight className="bg-transparent">
        <div className="flex flex-col space-y-6 p-4 md:p-6 lg:p-8">
          {/* Header Section */}
          <DietHeader onAddMeal={addMeal} />
          
          {/* Statistics Cards */}
          <DietStats meals={meals} />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Weekly Plan View - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <WeeklyPlanView 
                meals={meals}
                selectedWeek={selectedWeek}
                onWeekChange={setSelectedWeek}
                onEditMeal={editMeal}
                onDeleteMeal={deleteMeal}
                loading={loading}
              />
            </div>
            
            {/* Meal Management Sidebar */}
            <div className="xl:col-span-1">
              <MealManagement 
                onAddMeal={addMeal}
                recentMeals={meals.slice(0, 5)}
                onEditMeal={editMeal}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default Index;
