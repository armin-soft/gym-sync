
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit, Trash2, Clock, Utensils, ChevronLeft, ChevronRight, Coffee, Soup, Apple, Moon, Sun } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { Meal, WeekDay } from "@/types/meal";

interface WeeklyPlanViewProps {
  meals: Meal[];
  selectedWeek: string;
  onWeekChange: (week: string) => void;
  onEditMeal: (meal: Meal) => void;
  onDeleteMeal: (id: number) => void;
  loading: boolean;
}

const weekDays: WeekDay[] = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'];

const mealTypes = [
  { key: "صبحانه", color: "from-orange-400 to-red-500", icon: Coffee },
  { key: "میان وعده صبح", color: "from-yellow-400 to-orange-500", icon: Sun },
  { key: "ناهار", color: "from-green-400 to-emerald-500", icon: Utensils },
  { key: "میان وعده عصر", color: "from-blue-400 to-cyan-500", icon: Apple },
  { key: "شام", color: "from-purple-400 to-indigo-500", icon: Soup },
  { key: "میان وعده شام", color: "from-pink-400 to-purple-500", icon: Moon }
];

export const WeeklyPlanView: React.FC<WeeklyPlanViewProps> = ({
  meals,
  selectedWeek,
  onWeekChange,
  onEditMeal,
  onDeleteMeal,
  loading
}) => {
  const [selectedDay, setSelectedDay] = useState<WeekDay>('شنبه');

  const getMealsForDay = (day: WeekDay) => {
    return meals.filter(meal => meal.day === day);
  };

  const getMealsByType = (dayMeals: Meal[], type: string) => {
    return dayMeals.filter(meal => meal.type === type);
  };

  const dayMeals = getMealsForDay(selectedDay);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <div className="bg-gradient-to-l from-emerald-500 via-cyan-500 to-blue-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h2 className="text-2xl font-bold mb-2">برنامه غذایی هفتگی</h2>
            <p className="text-white/90">مشاهده و مدیریت وعده‌های غذایی</p>
          </div>
          <Utensils className="w-8 h-8 opacity-80" />
        </div>
      </div>

      <div className="p-6">
        {/* Day Selector */}
        <Tabs value={selectedDay} onValueChange={(value) => setSelectedDay(value as WeekDay)} className="mb-6">
          <TabsList className="grid w-full grid-cols-7 bg-gray-100 rounded-2xl p-1">
            {weekDays.map((day) => {
              const dayMeals = getMealsForDay(day);
              return (
                <TabsTrigger
                  key={day}
                  value={day}
                  className="rounded-xl text-xs md:text-sm font-medium relative data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
                >
                  {day}
                  {dayMeals.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-emerald-500 hover:bg-emerald-600">
                      {toPersianNumbers(dayMeals.length)}
                    </Badge>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Day Content */}
          {weekDays.map((day) => (
            <TabsContent key={day} value={day} className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {mealTypes.map((mealType, index) => {
                  const typeMeals = getMealsByType(getMealsForDay(day), mealType.key);
                  
                  return (
                    <motion.div
                      key={mealType.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${mealType.color} flex items-center justify-center text-white`}>
                            <mealType.icon className="w-5 h-5" />
                          </div>
                          <div className="text-right">
                            <h3 className="font-bold text-gray-800">{mealType.key}</h3>
                            <p className="text-sm text-gray-600">
                              {toPersianNumbers(typeMeals.length)} وعده
                            </p>
                          </div>
                        </div>
                        
                        <Badge variant="outline" className="bg-white">
                          {toPersianNumbers(typeMeals.reduce((sum, meal) => sum + (parseInt(meal.calories || '0') || 0), 0))} کالری
                        </Badge>
                      </div>

                      {typeMeals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {typeMeals.map((meal, mealIndex) => (
                            <motion.div
                              key={meal.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: mealIndex * 0.05 }}
                              className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300 group"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="text-right flex-1">
                                  <h4 className="font-semibold text-gray-800 mb-1">{meal.name}</h4>
                                  {meal.description && (
                                    <p className="text-sm text-gray-600 line-clamp-2">{meal.description}</p>
                                  )}
                                </div>
                                
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onEditMeal(meal)}
                                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onDeleteMeal(meal.id)}
                                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 justify-end">
                                {meal.calories && (
                                  <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                                    {toPersianNumbers(meal.calories)} کالری
                                  </Badge>
                                )}
                                {meal.protein && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                    {toPersianNumbers(meal.protein)}g پروتئین
                                  </Badge>
                                )}
                                {meal.carbs && (
                                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                    {toPersianNumbers(meal.carbs)}g کربوهیدرات
                                  </Badge>
                                )}
                                {meal.fat && (
                                  <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                                    {toPersianNumbers(meal.fat)}g چربی
                                  </Badge>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>هیچ وعده‌ای برای {mealType.key} برنامه‌ریزی نشده</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
};
