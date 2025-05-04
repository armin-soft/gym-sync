
import React from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { MealDialog } from "@/components/diet/MealDialog";
import { DietPageHeader } from "@/components/diet/DietPageHeader";
import { SearchAndFilters } from "@/components/diet/SearchAndFilters";
import { DietContentArea } from "@/components/diet/DietContentArea";
import { useDietState } from "@/components/diet/useDietState";
import { MealType, WeekDay } from "@/types/meal";

// Define constants
const weekDays: WeekDay[] = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه‌شنبه', 
  'چهارشنبه', 
  'پنجشنبه', 
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
  // Use the extracted diet state hook
  const {
    open,
    setOpen,
    selectedMeal,
    searchQuery,
    setSearchQuery,
    selectedDay,
    setSelectedDay,
    viewMode, 
    setViewMode,
    sortOrder,
    filteredMeals,
    handleOpen,
    handleEdit,
    handleSave,
    handleDelete,
    toggleSortOrder
  } = useDietState();

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      noPadding
      className="flex flex-col overflow-hidden"
    >
      <div className="h-full w-full overflow-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full w-full py-4 sm:py-6 space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-6"
        >
          {/* Header with Add Button */}
          <DietPageHeader onAddMeal={handleOpen} />
          
          {/* Search and View Mode Controls */}
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortOrder={sortOrder}
            onSortOrderChange={toggleSortOrder}
          />
          
          {/* Main Content Area */}
          <DietContentArea 
            meals={filteredMeals}
            mealTypes={mealTypes}
            selectedDay={selectedDay}
            viewMode={viewMode}
            sortOrder={sortOrder}
            onDayChange={setSelectedDay}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
          {/* Meal Dialog */}
          <MealDialog
            open={open}
            onOpenChange={setOpen}
            onSave={handleSave}
            meal={selectedMeal}
            mealTypes={mealTypes}
            weekDays={weekDays}
          />
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Index;
