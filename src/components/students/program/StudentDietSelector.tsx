
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Plus, Check } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface StudentDietSelectorProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
  currentDay?: number;
  currentMealType?: string;
  dayLabel?: string;
}

const StudentDietSelector: React.FC<StudentDietSelectorProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDay = 1,
  currentMealType = "all",
  dayLabel = "شنبه"
}) => {
  // Filter meals based on current meal type
  const filteredMeals = currentMealType === "all" 
    ? meals 
    : meals.filter(meal => meal.type === currentMealType);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-12">
        <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">هیچ وعده غذایی ثبت نشده است</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          انتخاب وعده‌های غذایی
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {dayLabel} • {currentMealType === "all" ? "همه وعده‌ها" : currentMealType}
        </p>
        <div className="mt-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {toPersianNumbers(selectedMeals.length)} وعده انتخاب شده
          </Badge>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMeals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedMeals.includes(meal.id)
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => toggleMeal(meal.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {meal.name}
                </h5>
                {selectedMeals.includes(meal.id) ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <Badge variant="secondary" className="text-xs">
                  {meal.type}
                </Badge>
                {meal.day && (
                  <Badge variant="outline" className="text-xs mr-1">
                    {meal.day}
                  </Badge>
                )}
              </div>
              
              {meal.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {meal.description}
                </p>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <div className="text-center py-8">
          <UtensilsCrossed className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            هیچ وعده غذایی برای {currentMealType === "all" ? "نمایش" : currentMealType} یافت نشد
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentDietSelector;
