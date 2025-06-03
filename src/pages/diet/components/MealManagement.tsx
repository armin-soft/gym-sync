
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Clock, TrendingUp, BookOpen, Edit } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { Meal } from "@/types/meal";

interface MealManagementProps {
  onAddMeal: () => void;
  recentMeals: Meal[];
  onEditMeal: (meal: Meal) => void;
}

export const MealManagement: React.FC<MealManagementProps> = ({
  onAddMeal,
  recentMeals,
  onEditMeal
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions = [
    {
      title: "افزودن صبحانه",
      description: "ایجاد وعده صبحانه جدید",
      icon: "🌅",
      color: "from-orange-400 to-red-500",
      action: onAddMeal
    },
    {
      title: "افزودن ناهار", 
      description: "ایجاد وعده ناهار جدید",
      icon: "🥗",
      color: "from-green-400 to-emerald-500",
      action: onAddMeal
    },
    {
      title: "افزودن شام",
      description: "ایجاد وعده شام جدید", 
      icon: "🍽️",
      color: "from-purple-400 to-indigo-500",
      action: onAddMeal
    }
  ];

  const nutritionTips = [
    "مصرف ۸ لیوان آب در روز ضروری است",
    "پروتئین در هر وعده غذایی لازم است",
    "میوه‌ها بهترین منبع ویتامین‌ها هستند",
    "ورزش قبل از صبحانه مفید است"
  ];

  return (
    <div className="space-y-6">
      {/* Quick Add Actions */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-l from-emerald-500 via-cyan-500 to-blue-500 p-4 text-white">
          <h3 className="text-lg font-bold text-right">دسترسی سریع</h3>
        </div>
        
        <div className="p-4 space-y-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={action.action}
                variant="ghost"
                className="w-full justify-between text-right p-4 h-auto hover:bg-gradient-to-l hover:from-gray-50 hover:to-white transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{action.title}</p>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recent Meals */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-l from-blue-500 via-purple-500 to-indigo-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-right">وعده‌های اخیر</h3>
            <Clock className="w-5 h-5 opacity-80" />
          </div>
        </div>

        <div className="p-4">
          {recentMeals.length > 0 ? (
            <div className="space-y-3">
              {recentMeals.map((meal, index) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer"
                  onClick={() => onEditMeal(meal)}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-right flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{meal.name}</h4>
                      <div className="flex items-center gap-2 justify-end">
                        <Badge variant="outline" className="text-xs">
                          {meal.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {meal.day}
                        </Badge>
                      </div>
                    </div>
                    <Edit className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>هیچ وعده اخیری وجود ندارد</p>
            </div>
          )}
        </div>
      </Card>

      {/* Nutrition Tips */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-l from-green-500 via-emerald-500 to-teal-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-right">نکات تغذیه‌ای</h3>
            <TrendingUp className="w-5 h-5 opacity-80" />
          </div>
        </div>

        <div className="p-4 space-y-3">
          {nutritionTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100"
            >
              <p className="text-sm text-gray-700 text-right leading-relaxed">
                💡 {tip}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};
