
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { MealDialog } from "@/components/diet/MealDialog";
import { DietPageHeader } from "@/components/diet/DietPageHeader";
import { DietContentArea } from "@/components/diet/DietContentArea";
import { useDietState } from "@/components/diet/hooks";
import { useBrandTheme } from "@/hooks/use-brand-theme";
import { MealType, WeekDay } from "@/types/meal";

const weekDays: WeekDay[] = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'
];

const mealTypes: MealType[] = [
  "صبحانه", "میان وعده صبح", "ناهار", "میان وعده عصر", "شام", "میان وعده شام"
];

const Index = () => {
  const { getGradientClass } = useBrandTheme();
  
  const {
    meals,
    open,
    setOpen,
    selectedMeal,
    selectedDay,
    setSelectedDay,
    filteredMeals,
    handleOpen,
    handleEdit,
    handleSave,
    handleDelete,
  } = useDietState();

  return (
    <div dir="rtl" className={`min-h-screen ${getGradientClass('accent')} bg-opacity-5`}>
      <PageContainer 
        fullWidth 
        fullHeight 
        className="bg-background"
      >
        <div className="h-full flex flex-col space-y-6 p-6">
          {/* Header */}
          <div className="text-right">
            <DietPageHeader onAddMeal={handleOpen} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <DietContentArea 
              meals={filteredMeals}
              mealTypes={mealTypes}
              selectedDay={selectedDay}
              sortOrder="asc"
              onDayChange={setSelectedDay}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
          
          {/* Dialog */}
          <MealDialog
            open={open}
            onOpenChange={setOpen}
            onSave={handleSave}
            meal={selectedMeal}
            mealTypes={mealTypes}
            weekDays={weekDays}
          />
        </div>
      </PageContainer>
    </div>
  );
};

export default Index;
