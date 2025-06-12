import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UtensilsCrossed, Clock, Utensils, Apple, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudentPrograms } from '@/hooks/useStudentPrograms';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { cn } from '@/lib/utils';

const PERSIAN_DAYS = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'
];

const MEAL_TYPES = [
  { id: 'صبحانه', name: 'صبحانه', icon: Coffee, color: 'from-orange-500 to-red-500' },
  { id: 'ناهار', name: 'ناهار', icon: Utensils, color: 'from-green-500 to-emerald-500' },
  { id: 'شام', name: 'شام', icon: UtensilsCrossed, color: 'from-blue-500 to-indigo-500' },
  { id: 'میان‌وعده', name: 'میان‌وعده', icon: Apple, color: 'from-purple-500 to-violet-500' }
];

const StudentDietPage = () => {
  const { studentId } = useParams();
  const { currentStudentProgram } = useStudentPrograms();
  const [selectedDay, setSelectedDay] = useState('شنبه');
  const [meals, setMeals] = useState<any[]>([]);

  // Load meals data
  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        const parsedMeals = JSON.parse(savedMeals);
        setMeals(Array.isArray(parsedMeals) ? parsedMeals : []);
      }
    } catch (error) {
      console.error('Error loading meals:', error);
      setMeals([]);
    }
  }, []);

  const getMealsForDay = (day: string) => {
    if (!currentStudentProgram) return [];
    
    return currentStudentProgram.diet
      .filter((meal: any) => meal.day === day)
      .map((meal: any) => {
        const mealInfo = meals.find(m => m.id === meal.id);
        return {
          ...meal,
          ...mealInfo
        };
      });
  };

  const getMealsByType = (day: string, mealType: string) => {
    return getMealsForDay(day).filter((meal: any) => meal.type === mealType);
  };

  const dayMeals = getMealsForDay(selectedDay);
  const totalMeals = currentStudentProgram?.diet?.length || 0;
  const activeDays = PERSIAN_DAYS.filter(day => getMealsForDay(day).length > 0).length;

  return (
    <PageContainer fullHeight className="bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950 dark:via-gray-900 dark:to-emerald-950">
      <div className="container mx-auto p-4 h-full" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-2">
              برنامه غذایی من
            </h1>
            <p className="text-green-600 dark:text-green-400">
              رژیم غذایی اختصاصی تعیین شده توسط مربی
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <UtensilsCrossed className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">کل وعده‌ها</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{toPersianNumbers(totalMeals)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">روزهای فعال</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{toPersianNumbers(activeDays)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Apple className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">تکمیل برنامه</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{toPersianNumbers(Math.round((activeDays / 7) * 100))}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-white/50 dark:bg-gray-800/50">
              {PERSIAN_DAYS.map((day) => {
                const dayMealCount = getMealsForDay(day).length;
                return (
                  <TabsTrigger
                    key={day}
                    value={day}
                    className={cn(
                      "relative text-xs px-2 py-3",
                      dayMealCount > 0 && "font-bold"
                    )}
                  >
                    <div className="text-center">
                      <div>{day}</div>
                      {dayMealCount > 0 && (
                        <Badge variant="secondary" className="mt-1 text-[10px] px-1">
                          {toPersianNumbers(dayMealCount)}
                        </Badge>
                      )}
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {PERSIAN_DAYS.map((day) => (
              <TabsContent key={day} value={day} className="mt-6">
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <UtensilsCrossed className="h-5 w-5" />
                      وعده‌های غذایی {day}
                      {getMealsForDay(day).length > 0 && (
                        <Badge variant="outline">
                          {toPersianNumbers(getMealsForDay(day).length)} وعده
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      {getMealsForDay(day).length > 0 ? (
                        <div className="space-y-6">
                          {MEAL_TYPES.map((mealType) => {
                            const mealsForType = getMealsByType(day, mealType.id);
                            if (mealsForType.length === 0) return null;

                            const IconComponent = mealType.icon;
                            return (
                              <motion.div
                                key={mealType.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-3"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg bg-gradient-to-r ${mealType.color} text-white`}>
                                    <IconComponent className="h-5 w-5" />
                                  </div>
                                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                                    {mealType.name}
                                  </h3>
                                  <Badge variant="secondary">
                                    {toPersianNumbers(mealsForType.length)} آیتم
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {mealsForType.map((meal: any, index: number) => (
                                    <Card key={`${meal.id}-${index}`} className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border-green-200 dark:border-green-700">
                                      <CardContent className="p-4">
                                        <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                                          {meal.name}
                                        </h4>
                                        {meal.description && (
                                          <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {meal.description}
                                          </p>
                                        )}
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <UtensilsCrossed className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                            برای {day} وعده غذایی تعیین نشده
                          </h3>
                          <p className="text-gray-400 dark:text-gray-500">
                            مربی شما هنوز برای این روز وعده غذایی تعیین نکرده است
                          </p>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default StudentDietPage;
