
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Utensils, 
  Plus, 
  Calendar, 
  Clock, 
  Sparkles,
  Coffee,
  Sun,
  Sunset,
  Moon,
  Search,
  Edit3,
  Trash2,
  ChefHat,
  Apple
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageContainer } from "@/components/ui/page-container";
import { AddMealDialog } from "@/components/diet/AddMealDialog";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface Meal {
  id: number;
  name: string;
  type: string;
  day: string;
}

const WEEK_DAYS = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'
];

const MEAL_TYPES = [
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
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedDay, setSelectedDay] = useState('شنبه');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  // بارگذاری وعده‌های غذایی از localStorage
  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        const parsedMeals = JSON.parse(savedMeals);
        setMeals(Array.isArray(parsedMeals) ? parsedMeals : []);
      }
    } catch (error) {
      console.error('خطا در بارگذاری وعده‌های غذایی:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // فیلتر وعده‌های غذایی
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = !searchQuery || 
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // دریافت وعده‌های روز انتخاب شده
  const getDayMeals = (day: string) => {
    return filteredMeals.filter(meal => meal.day === day);
  };

  // دریافت وعده‌های هر نوع در روز انتخاب شده
  const getMealsByType = (type: string) => {
    return getDayMeals(selectedDay).filter(meal => meal.type === type);
  };

  // حذف وعده غذایی
  const handleDeleteMeal = (id: number) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    setMeals(updatedMeals);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
  };

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

  // محاسبه آمار
  const totalMeals = meals.length;
  const todayMeals = getDayMeals(selectedDay).length;
  const activeDays = WEEK_DAYS.filter(day => getDayMeals(day).length > 0).length;

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8"
        >
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Utensils className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className="font-bold text-sm sm:text-base text-emerald-800 dark:text-emerald-200">کل وعده‌ها</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-600">{toPersianNumbers(totalMeals)}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className="font-bold text-sm sm:text-base text-blue-800 dark:text-blue-200">روزهای فعال</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600">{toPersianNumbers(activeDays)}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className="font-bold text-sm sm:text-base text-purple-800 dark:text-purple-200">امروز</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-purple-600">{toPersianNumbers(todayMeals)}</p>
            </CardContent>
          </Card>
        </motion.div>

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
            <TabsList className="grid w-full grid-cols-7 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm h-12 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-lg mb-4 sm:mb-6 md:mb-8">
              {WEEK_DAYS.map((day) => {
                const dayMealCount = getDayMeals(day).length;
                return (
                  <TabsTrigger
                    key={day}
                    value={day}
                    className={cn(
                      "relative text-xs sm:text-sm font-bold px-1 sm:px-2 md:px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-1",
                      selectedDay === day 
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                        : "hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                    )}
                  >
                    <div className="text-center leading-tight">
                      <div className="truncate">{day}</div>
                      {dayMealCount > 0 && (
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-2xs sm:text-xs px-1 sm:px-2 mt-0.5 sm:mt-1 h-4 sm:h-5",
                            selectedDay === day 
                              ? "bg-white/20 text-white border-white/20" 
                              : "bg-emerald-100 text-emerald-700 border-emerald-200"
                          )}
                        >
                          {toPersianNumbers(dayMealCount)}
                        </Badge>
                      )}
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

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

                          const IconComponent = mealType.icon;
                          return (
                            <motion.div
                              key={mealType.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className={cn(
                                "rounded-lg sm:rounded-xl p-3 sm:p-4 border-2",
                                mealType.color
                              )}
                            >
                              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-sm sm:text-base md:text-lg font-bold">
                                    {mealType.name}
                                  </h3>
                                  <Badge variant="secondary" className="text-2xs sm:text-xs">
                                    {toPersianNumbers(mealsForType.length)} وعده
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                                {mealsForType.map((meal, index) => (
                                  <motion.div
                                    key={meal.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                  >
                                    <Card className="group hover:shadow-md transition-all duration-300 bg-white/80 dark:bg-gray-800/80 border">
                                      <CardContent className="p-2 sm:p-3">
                                        <div className="flex items-center justify-between">
                                          <h4 className="font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate flex-1 ml-2">
                                            {meal.name}
                                          </h4>
                                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => handleEditMeal(meal)}
                                              className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
                                            >
                                              <Edit3 className="h-3 w-3" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => handleDeleteMeal(meal.id)}
                                              className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12 sm:py-16 md:py-20"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <Apple className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">
                          هنوز وعده غذایی برای {selectedDay} تعریف نشده
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 px-4">
                          برای شروع، وعده غذایی جدید اضافه کنید
                        </p>
                        <Button
                          onClick={handleAddMeal}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Plus className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                          افزودن اولین وعده
                        </Button>
                      </motion.div>
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
          onSave={(mealData) => {
            if (editingMeal) {
              // ویرایش
              const updatedMeals = meals.map(meal => 
                meal.id === editingMeal.id ? { ...mealData, id: editingMeal.id } : meal
              );
              setMeals(updatedMeals);
              localStorage.setItem('meals', JSON.stringify(updatedMeals));
            } else {
              // افزودن جدید
              const newMeal = {
                ...mealData,
                id: Math.max(0, ...meals.map(m => m.id)) + 1
              };
              const updatedMeals = [...meals, newMeal];
              setMeals(updatedMeals);
              localStorage.setItem('meals', JSON.stringify(updatedMeals));
            }
            setDialogOpen(false);
            setEditingMeal(null);
          }}
        />
      </div>
    </PageContainer>
  );
};

export default Index;
