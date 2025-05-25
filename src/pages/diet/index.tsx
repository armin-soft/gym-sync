
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/10" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.1)_1px,transparent_0)] [background-size:24px_24px] opacity-30" />
      
      <PageContainer 
        withBackground={false}
        fullWidth 
        fullHeight 
        noPadding
        className="flex flex-col relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full w-full p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto"
        >
          
          {/* Header with enhanced design */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <ModernDietPageHeader onAddMeal={handleOpen} />
          </motion.div>
          
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ModernSearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortOrder={sortOrder}
              onSortOrderChange={toggleSortOrder}
              mealsCount={filteredMeals.length}
            />
          </motion.div>
          
          {/* Content with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
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
