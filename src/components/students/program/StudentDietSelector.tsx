
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Apple, Clock, Target } from "lucide-react";
import { Meal, MealType } from "@/types/meal";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { weekDayMap } from "./diet/utils";
import SelectedMealsList from "./diet/SelectedMealsList";
import MealsList from "./diet/MealsList";
import { motion } from "framer-motion";

interface StudentDietSelectorProps {
  meals: Meal[];
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  currentDay?: number;
  currentMealType?: MealType;
}

const StudentDietSelector: React.FC<StudentDietSelectorProps> = ({
  meals,
  selectedMeals,
  setSelectedMeals,
  currentDay,
  currentMealType
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const currentDayName = currentDay ? weekDayMap[currentDay] : undefined;

  const displayMeals = currentMealType 
    ? meals.filter(meal => meal.type === currentMealType)
    : meals;

  const dayFilteredMeals = currentDayName
    ? displayMeals.filter(meal => !meal.day || meal.day === currentDayName)
    : displayMeals;

  const toggleMeal = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(prev => prev.filter(id => id !== mealId));
    } else {
      setSelectedMeals(prev => [...prev, mealId]);
    }
  };

  if (!currentDay) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-12 text-right" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-orange-200 to-amber-200 dark:from-orange-700/30 dark:to-amber-700/30 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
            <Utensils className="h-12 w-12 text-orange-500 dark:text-orange-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">انتخاب روز</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">لطفا یک روز از هفته را انتخاب کنید</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 max-w-md">برای مشاهده و انتخاب وعده‌های غذایی، ابتدا روز مورد نظر را انتخاب کنید</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-right p-6" dir="rtl">
      {/* Header Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <Card className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-700/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">غذاهای انتخاب شده</p>
              <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{toPersianNumbers(selectedMeals.length)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Apple className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">کل غذاها</p>
              <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{toPersianNumbers(dayFilteredMeals.length)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">نوع وعده</p>
              <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {currentMealType || "همه"}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-right" dir="rtl">
        {/* Selected Meals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Utensils className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    غذاهای انتخاب شده
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {toPersianNumbers(selectedMeals.length)} غذا
                    {currentMealType && <span className="text-blue-500 mr-2">({currentMealType})</span>}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <SelectedMealsList
                  meals={meals}
                  selectedMeals={selectedMeals}
                  toggleMeal={toggleMeal}
                  currentDayName={currentDayName}
                  currentMealType={currentMealType}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Meals List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    لیست غذاها
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {toPersianNumbers(dayFilteredMeals.length)} غذا موجود
                    {currentMealType && <span className="text-blue-500 mr-2">({currentMealType})</span>}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <MealsList
                  meals={dayFilteredMeals}
                  selectedMeals={selectedMeals}
                  toggleMeal={toggleMeal}
                  currentDayName={currentDayName}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  currentMealType={currentMealType}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDietSelector;
