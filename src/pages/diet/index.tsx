
import React from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { MealDialog } from "@/components/diet/MealDialog";
import { DietPageHeader } from "@/components/diet/DietPageHeader";
import { SearchAndFilters } from "@/components/diet/SearchAndFilters";
import { DietContentArea } from "@/components/diet/DietContentArea";
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

  // اطلاعات دیباگ در کامپوننت اصلی
  React.useEffect(() => {
    console.log("=== DIET PAGE DEBUG ===");
    console.log("Meals from useDietState:", meals);
    console.log("Filtered meals:", filteredMeals);
    console.log("Search query:", searchQuery);
    console.log("Selected day:", selectedDay);
    console.log("=== END DIET PAGE DEBUG ===");
  }, [meals, filteredMeals, searchQuery, selectedDay]);

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      noPadding
      className="flex flex-col overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className="h-full w-full overflow-auto">
        <div className="h-full w-full py-4 sm:py-6 space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6 max-w-[1600px] mx-auto">
          {/* سرصفحه با دکمه افزودن */}
          <DietPageHeader onAddMeal={handleOpen} />
          
          {/* کنترل‌های جستجو و مرتب‌سازی */}
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOrder={sortOrder}
            onSortOrderChange={toggleSortOrder}
          />
          
          {/* محتوای اصلی */}
          <DietContentArea 
            meals={filteredMeals}
            mealTypes={mealTypes}
            selectedDay={selectedDay}
            sortOrder={sortOrder}
            onDayChange={setSelectedDay}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
          {/* دیالوگ وعده غذایی */}
          <MealDialog
            open={open}
            onOpenChange={setOpen}
            onSave={handleSave}
            meal={selectedMeal}
            mealTypes={mealTypes}
            weekDays={weekDays}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
