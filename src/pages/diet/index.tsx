
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Utensils, 
  Plus, 
  Sparkles,
  Coffee,
  Sun,
  Sunset,
  Moon,
  Search,
  ChefHat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageContainer } from "@/components/ui/page-container";
import { AddMealDialog } from "@/components/diet/AddMealDialog";
import { useMealManagement } from "@/components/diet/hooks/useMealManagement";
import { useDietFilters } from "@/components/diet/hooks/useDietFilters";
import { MealCard } from "@/components/diet/MealCard";
import { MealTypeSelector } from "@/components/diet/MealTypeSelector";
import { DaySelector } from "@/components/diet/DaySelector";
import { StatsCards } from "@/components/diet/StatsCards";
import { EmptyState } from "@/components/diet/EmptyState";
import { calculateStats } from "@/components/diet/utils";
import { MealType, Meal } from "@/components/diet/types";

const MEAL_TYPES: MealType[] = [
  { 
    id: 'صبحانه', 
    name: 'صبحانه', 
    icon: Coffee, 
    color: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200'
  },
  { 
    id: 'میان وعده صبح', 
    name: 'میان وعده صبح', 
    icon: Sun, 
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-200'
  },
  { 
    id: 'ناهار', 
    name: 'ناهار', 
    icon: Utensils, 
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200'
  },
  { 
    id: 'میان وعده عصر', 
    name: 'میان وعده عصر', 
    icon: Sunset, 
    color: 'bg-pink-50 border-pink-200 text-pink-800 dark:bg-pink-950/30 dark:border-pink-800 dark:text-pink-200'
  },
  { 
    id: 'شام', 
    name: 'شام', 
    icon: ChefHat, 
    color: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-200'
  },
  { 
    id: 'میان وعده شام', 
    name: 'میان وعده شام', 
    icon: Moon, 
    color: 'bg-violet-50 border-violet-200 text-violet-800 dark:bg-violet-950/30 dark:border-violet-800 dark:text-violet-200'
  }
];

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  // استفاده از هوک‌های ریفکتور شده
  const { meals, loading, deleteMeal, saveMeal } = useMealManagement();
  const {
    selectedDay,
    setSelectedDay,
    searchQuery,
    setSearchQuery,
    getDayMeals,
    getMealsByType
  } = useDietFilters(meals);

  // محاسبه آمار
  const stats = calculateStats(meals, getDayMeals, selectedDay);

  // ویرایش وعده غذایی
  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setDialogOpen(true);
  };

  // افزودن وعده جدید
  const handleAddMeal = () => {
    setEditingMeal(null);
    setDialogOpen(true);
  };

  // ذخیره وعده غذایی
  const handleSaveMeal = (mealData: Omit<Meal, 'id'>) => {
    saveMeal(mealData, editingMeal || undefined);
    setDialogOpen(false);
    setEditingMeal(null);
  };

  if (loading) {
    return (
      <PageContainer fullHeight className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950 dark:via-gray-900 dark:to-teal-950">
        <div className="flex items-center justify-center h-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer fullHeight className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950 dark:via-gray-900 dark:to-teal-950">
      <div className="min-h-screen p-2 sm:p-4 md:p-6 lg:p-8" dir="rtl">
        {/* هدر صفحه */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Utensils className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            برنامه‌های غذایی
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            مدیریت و تنظیم برنامه‌های غذایی هفتگی با دقت و حرفه‌ای‌ترین شکل ممکن
          </p>
        </motion.div>

        {/* کارت‌های آمار */}
        <StatsCards stats={stats} />

        {/* نوار ابزار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between mb-4 sm:mb-6 md:mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg"
        >
          <div className="flex-1 relative">
            <Search className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <Input
              placeholder="جستجو در وعده‌های غذایی..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 bg-white/80 dark:bg-gray-900/80"
            />
          </div>
          <Button
            onClick={handleAddMeal}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 sm:px-6 md:px-8 h-10 sm:h-12 text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden xs:inline">افزودن وعده غذایی</span>
            <span className="xs:hidden">افزودن</span>
          </Button>
        </motion.div>

        {/* تب‌های روزهای هفته */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <DaySelector 
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
              getDayMeals={getDayMeals}
            />

            {/* محتوای تب‌ها */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScrollArea className="h-[calc(100vh-400px)] sm:h-[calc(100vh-450px)] md:h-[calc(100vh-500px)]">
                    {getDayMeals(selectedDay).length > 0 ? (
                      <div className="space-y-4 sm:space-y-6">
                        {MEAL_TYPES.map((mealType) => {
                          const mealsForType = getMealsByType(mealType.id);
                          if (mealsForType.length === 0) return null;

                          return (
                            <motion.div
                              key={mealType.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <MealTypeSelector 
                                mealType={mealType}
                                meals={mealsForType}
                              >
                                {mealsForType.map((meal, index) => (
                                  <MealCard
                                    key={meal.id}
                                    meal={meal}
                                    onEdit={handleEditMeal}
                                    onDelete={deleteMeal}
                                    index={index}
                                  />
                                ))}
                              </MealTypeSelector>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <EmptyState 
                        selectedDay={selectedDay}
                        onAddMeal={handleAddMeal}
                      />
                    )}
                  </ScrollArea>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>

        {/* دیالوگ افزودن/ویرایش وعده غذایی */}
        <AddMealDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          meal={editingMeal}
          onSave={handleSaveMeal}
        />
      </div>
    </PageContainer>
  );
};

export default Index;
