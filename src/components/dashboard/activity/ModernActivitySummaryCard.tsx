
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, UtensilsCrossed, Pill, Dumbbell, Zap, TrendingUp } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernActivitySummaryCardProps {
  stats: DashboardStats;
}

export const ModernActivitySummaryCard = ({ stats }: ModernActivitySummaryCardProps) => {
  const activities = [
    {
      icon: UtensilsCrossed,
      title: "برنامه‌های غذایی",
      value: stats.totalMeals,
      unit: "برنامه",
      growth: stats.mealGrowth,
      completionRate: stats.mealCompletionRate,
      gradient: "from-blue-600 to-blue-800",
      bgGradient: "from-blue-50 to-blue-100/50",
      color: "blue"
    },
    {
      icon: Pill,
      title: "مکمل‌های تجویز شده",
      value: stats.totalSupplements,
      unit: "مورد",
      growth: stats.supplementGrowth,
      completionRate: stats.supplementCompletionRate,
      gradient: "from-yellow-500 to-yellow-700",
      bgGradient: "from-yellow-50 to-yellow-100/50",
      color: "yellow"
    },
    {
      icon: Dumbbell,
      title: "نرخ تکمیل تمرین‌ها",
      value: stats.studentsProgress,
      unit: "%",
      showProgress: true,
      gradient: "from-green-600 to-emerald-700",
      bgGradient: "from-green-50 to-green-100/50",
      color: "green"
    }
  ];

  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50/80 via-white/50 to-blue-50/80 dark:from-purple-950/30 dark:via-gray-900/50 dark:to-blue-950/30 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              خلاصه فعالیت‌ها
              <Zap className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-1">
              عملکرد کلی سیستم
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-gradient-to-r ${activity.bgGradient} dark:from-gray-800/30 dark:to-gray-700/30 p-4 rounded-2xl border border-${activity.color}-200/50 dark:border-${activity.color}-800/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
          >
            {/* Background shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${activity.gradient} shadow-lg`}>
                    <activity.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {activity.title}
                    </h3>
                    {activity.completionRate && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {toPersianNumbers(Math.round(activity.completionRate))}٪ تکمیل شده
                      </p>
                    )}
                  </div>
                </div>
                
                {activity.growth && (
                  <div className={`flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg text-xs font-medium`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>+{toPersianNumbers(activity.growth)}٪</span>
                  </div>
                )}
              </div>
              
              {/* Value */}
              <div className="flex items-end justify-between mb-3">
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold text-${activity.color}-600 dark:text-${activity.color}-400`}>
                    {toPersianNumbers(activity.value)}
                  </span>
                  <span className={`text-sm text-${activity.color}-500 dark:text-${activity.color}-400`}>
                    {activity.unit}
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              {(activity.completionRate || activity.showProgress) && (
                <div className="space-y-2">
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${activity.completionRate || activity.value}%` 
                      }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.3 + (index * 0.1),
                        ease: "easeOut" 
                      }}
                      className={`h-full bg-gradient-to-r ${activity.gradient} rounded-full relative`}
                    >
                      {/* Glowing effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Summary Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">آخرین به‌روزرسانی</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {toPersianNumbers(new Date().toLocaleDateString('fa-IR'))}
            </span>
          </div>
        </motion.div>
      </CardContent>
    </div>
  );
};

export default ModernActivitySummaryCard;
