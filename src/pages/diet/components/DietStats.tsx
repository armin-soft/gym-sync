
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, TrendingUp, Target, Calendar } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { Meal } from "@/types/meal";

interface DietStatsProps {
  meals: Meal[];
}

export const DietStats: React.FC<DietStatsProps> = ({ meals }) => {
  const totalMeals = meals.length;
  const todayMeals = meals.filter(meal => {
    const today = new Date().toLocaleDateString('fa-IR', { weekday: 'long' });
    return meal.day === today;
  }).length;
  
  const weekMeals = meals.length; // کل وعده‌های هفته
  const avgCalories = meals.length > 0 
    ? Math.round(meals.reduce((sum, meal) => sum + (parseInt(meal.calories || '0') || 0), 0) / meals.length)
    : 0;

  const stats = [
    {
      title: "کل وعده‌های غذایی",
      value: toPersianNumbers(totalMeals),
      subtitle: "در برنامه فعلی",
      icon: Utensils,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      title: "وعده‌های امروز",
      value: toPersianNumbers(todayMeals),
      subtitle: "برنامه‌ریزی شده",
      icon: Calendar,
      gradient: "from-cyan-500 to-cyan-600",
      bgGradient: "from-cyan-50 to-cyan-100",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600"
    },
    {
      title: "وعده‌های هفتگی",
      value: toPersianNumbers(weekMeals),
      subtitle: "کل برنامه",
      icon: TrendingUp,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "میانگین کالری",
      value: toPersianNumbers(avgCalories),
      subtitle: "در هر وعده",
      icon: Target,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <Badge variant="secondary" className="bg-white/60 text-gray-700 text-xs">
                  فعال
                </Badge>
              </div>
              
              <div className="text-right">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {stat.title}
                </p>
                <p className="text-xs text-gray-600">
                  {stat.subtitle}
                </p>
              </div>

              {/* Decorative gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
