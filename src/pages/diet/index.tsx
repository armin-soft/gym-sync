
import React from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { MealDialog } from "@/components/diet/MealDialog";
import { ModernDietPageHeader } from "@/components/diet/modern/ModernDietPageHeader";
import { ModernSearchAndFilters } from "@/components/diet/modern/ModernSearchAndFilters";
import { ModernDietContentArea } from "@/components/diet/modern/ModernDietContentArea";
import { useDietState } from "@/components/diet/hooks";
import { MealType, WeekDay } from "@/types/meal";

// تعریف ثابت‌ها با اصلاح فضای خالی
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
  // استفاده از هوک استخراج شده برای حالت رژیم غذایی
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30" dir="rtl">
      <PageContainer 
        withBackground={false}
        fullWidth 
        fullHeight 
        noPadding
        className="flex flex-col overflow-hidden"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="h-full w-full overflow-auto"
        >
          <div className="h-full w-full py-6 space-y-8 px-4 sm:px-6 md:px-8 max-w-[1800px] mx-auto">
            
            {/* سرصفحه مدرن */}
            <motion.div variants={itemVariants}>
              <ModernDietPageHeader onAddMeal={handleOpen} />
            </motion.div>
            
            {/* کنترل‌های جستجو و مرتب‌سازی مدرن */}
            <motion.div variants={itemVariants}>
              <ModernSearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortOrder={sortOrder}
                onSortOrderChange={toggleSortOrder}
                mealsCount={filteredMeals.length}
              />
            </motion.div>
            
            {/* محتوای اصلی مدرن */}
            <motion.div variants={itemVariants} className="flex-1">
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
            
          </div>
        </motion.div>
        
        {/* دیالوگ وعده غذایی */}
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
