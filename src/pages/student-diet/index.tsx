
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Apple, Clock, Check, Plus, Calendar, Target, 
  Utensils, Coffee, Cookie, ChefHat, TrendingUp
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

const mealTypes = [
  { id: 'breakfast', name: 'صبحانه', icon: Coffee, time: '۷:۰۰', color: 'orange' },
  { id: 'snack1', name: 'میان‌وعده صبح', icon: Cookie, time: '۱۰:۰۰', color: 'green' },
  { id: 'lunch', name: 'ناهار', icon: Utensils, time: '۱۳:۰۰', color: 'blue' },
  { id: 'snack2', name: 'میان‌وعده عصر', icon: Apple, time: '۱۶:۰۰', color: 'purple' },
  { id: 'dinner', name: 'شام', icon: ChefHat, time: '۱۹:۰۰', color: 'red' }
];

const todayMeals = [
  {
    id: 1,
    type: 'breakfast',
    name: 'صبحانه پروتئینی',
    foods: ['۲ عدد تخم‌مرغ', '۱ برش نان کامل', '۱ لیوان شیر', 'خیار و گوجه'],
    calories: 450,
    protein: 25,
    carbs: 35,
    fat: 15,
    completed: true,
    time: '۷:۳۰'
  },
  {
    id: 2,
    type: 'snack1',
    name: 'میان‌وعده صبح',
    foods: ['۱ عدد سیب', '۱۰ عدد بادام'],
    calories: 180,
    protein: 4,
    carbs: 20,
    fat: 8,
    completed: true,
    time: '۱۰:۱۵'
  },
  {
    id: 3,
    type: 'lunch',
    name: 'ناهار متعادل',
    foods: ['۱۰۰ گرم مرغ گریل', '۱ پیمانه برنج', 'سالاد سبزیجات', 'ماست کم‌چرب'],
    calories: 520,
    protein: 35,
    carbs: 45,
    fat: 12,
    completed: false,
    time: '-'
  },
  {
    id: 4,
    type: 'snack2',
    name: 'میان‌وعده عصر',
    foods: ['۱ لیوان پروتئین شیک', '۱ عدد موز'],
    calories: 220,
    protein: 20,
    carbs: 25,
    fat: 3,
    completed: false,
    time: '-'
  },
  {
    id: 5,
    type: 'dinner',
    name: 'شام سبک',
    foods: ['۸۰ گرم ماهی', 'سبزیجات بخارپز', '۱ برش نان کامل'],
    calories: 380,
    protein: 28,
    carbs: 30,
    fat: 10,
    completed: false,
    time: '-'
  }
];

const StudentDiet = () => {
  const [selectedMeal, setSelectedMeal] = useState<number | null>(null);
  
  const completedMeals = todayMeals.filter(meal => meal.completed).length;
  const totalMeals = todayMeals.length;
  const progressPercentage = (completedMeals / totalMeals) * 100;
  
  const totalCalories = todayMeals.reduce((sum, meal) => sum + (meal.completed ? meal.calories : 0), 0);
  const targetCalories = 1750;
  const calorieProgress = (totalCalories / targetCalories) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-2">
              برنامه غذایی
            </h1>
            <p className="text-lg text-muted-foreground">
              رژیم غذایی و وعده‌های اختصاص‌داده‌شده
            </p>
          </div>
          <div className="text-left">
            <div className="text-3xl font-bold text-emerald-600">
              {toPersianNumbers(completedMeals.toString())}/{toPersianNumbers(totalMeals.toString())}
            </div>
            <p className="text-sm text-muted-foreground">وعده امروز</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>پیشرفت وعده‌ها</span>
              <span>{toPersianNumbers(Math.round(progressPercentage).toString())}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>کالری دریافتی</span>
              <span>{toPersianNumbers(totalCalories.toString())} / {toPersianNumbers(targetCalories.toString())}</span>
            </div>
            <Progress value={calorieProgress} className="h-3" />
          </div>
        </div>
      </div>

      {/* Nutrition Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers(totalCalories.toString())}
                </p>
                <p className="text-sm text-muted-foreground">کالری</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("112")}g
                </p>
                <p className="text-sm text-muted-foreground">پروتئین</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Apple className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("125")}g
                </p>
                <p className="text-sm text-muted-foreground">کربوهیدرات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("48")}g
                </p>
                <p className="text-sm text-muted-foreground">چربی</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meal Timeline */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            برنامه وعده‌های امروز
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayMeals.map((meal, index) => {
              const mealType = mealTypes.find(type => type.id === meal.type);
              const Icon = mealType?.icon || Utensils;
              const isSelected = selectedMeal === meal.id;
              
              return (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    meal.completed
                      ? 'border-green-300 bg-green-50 dark:bg-green-950/20'
                      : isSelected
                      ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-emerald-200 hover:bg-emerald-50/50'
                  }`}
                  onClick={() => setSelectedMeal(isSelected ? null : meal.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${mealType?.color}-500 to-${mealType?.color}-600 flex items-center justify-center shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {meal.name}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {mealType?.time}
                          </Badge>
                          {meal.completed && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
                              <Check className="w-3 h-3 ml-1" />
                              {meal.time}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">کالری:</span>
                            <span className="font-medium">{toPersianNumbers(meal.calories.toString())}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">پروتئین:</span>
                            <span className="font-medium">{toPersianNumbers(meal.protein.toString())}g</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">کربوهیدرات:</span>
                            <span className="font-medium">{toPersianNumbers(meal.carbs.toString())}g</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">چربی:</span>
                            <span className="font-medium">{toPersianNumbers(meal.fat.toString())}g</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {meal.completed ? (
                        <Button size="sm" variant="outline" disabled>
                          <Check className="w-4 h-4 ml-2" />
                          مصرف شده
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          className="bg-gradient-to-l from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white"
                        >
                          <Plus className="w-4 h-4 ml-2" />
                          ثبت مصرف
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="font-medium mb-3 text-gray-900 dark:text-white">ترکیبات غذایی:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {meal.foods.map((food, foodIndex) => (
                          <div 
                            key={foodIndex}
                            className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border"
                          >
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-sm">{food}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentDiet;
