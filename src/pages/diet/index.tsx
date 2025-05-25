
import React from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { MealDialog } from "@/components/diet/MealDialog";
import { ModernDietPageHeader } from "@/components/diet/modern/ModernDietPageHeader";
import { ModernSearchAndFilters } from "@/components/diet/modern/ModernSearchAndFilters";
import { ModernDietContentArea } from "@/components/diet/modern/ModernDietContentArea";
import { useDietState } from "@/components/diet/hooks";
import { MealType, WeekDay } from "@/types/meal";

const weekDays: WeekDay[] = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه شنبه', 
  'چهارشنبه', 
  'پنج شنبه', 
  'جمعه'
] as WeekDay[];

const mealTypes: MealType[] = [
  "صبحانه",
  "میان وعده صبح",
  "ناهار",
  "میان وعده عصر",
  "شام",
  "میان وعده"
] as MealType[];

const Index = () => {
  const {
    meals,
    open,
    setOpen,
    selectedMeal,
    searchQuery,
    setSearchQuery,
    selectedDay,
    setSelectedDay,
    sortOrder,
    filteredMeals,
    handleOpen,
    handleEdit,
    handleSave,
    handleDelete,
    toggleSortOrder
  } = useDietState();

  console.log('Diet Index - Total meals:', meals.length);
  console.log('Diet Index - Filtered meals:', filteredMeals.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-950 dark:to-blue-950/20" dir="rtl">
      <PageContainer 
        withBackground={false}
        fullWidth 
        fullHeight 
        noPadding
        className="flex flex-col"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-full w-full p-6 space-y-6 max-w-7xl mx-auto"
        >
          
          {/* Header */}
          <ModernDietPageHeader onAddMeal={handleOpen} />
          
          {/* Search and Filters */}
          <ModernSearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOrder={sortOrder}
            onSortOrderChange={toggleSortOrder}
            mealsCount={filteredMeals.length}
          />
          
          {/* Content */}
          <ModernDietContentArea 
            meals={filteredMeals}
            mealTypes={mealTypes}
            selectedDay={selectedDay}
            sortOrder={sortOrder}
            onDayChange={setSelectedDay}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
        </motion.div>
        
        {/* Dialog */}
        <MealDialog
          open={open}
          onOpenChange={setOpen}
          onSave={handleSave}
          meal={selectedMeal}
          mealTypes={mealTypes}
          weekDays={weekDays}
        />
      </PageContainer>
    </div>
  );
};

export default Index;
