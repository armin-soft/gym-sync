
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, UtensilsCrossed, Pill, Dumbbell, Zap, TrendingUp } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface EliteActivityCardProps {
  stats: DashboardStats;
}

export const EliteActivityCard = ({ stats }: EliteActivityCardProps) => {
  const activities = [
    {
      icon: UtensilsCrossed,
      title: "برنامه‌های غذایی",
      value: stats.totalMeals,
      unit: "برنامه",
      growth: stats.mealGrowth,
      completionRate: stats.mealCompletionRate,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-100/50",
      color: "violet"
    },
    {
      icon: Pill,
      title: "مکمل‌های تجویز شده",
      value: stats.totalSupplements,
      unit: "مورد",
      growth: stats.supplementGrowth,
      completionRate: stats.supplementCompletionRate,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-100/50",
      color: "emerald"
    },
    {
      icon: Dumbbell,
      title: "نرخ تکمیل تمرین‌ها",
      value: stats.studentsProgress,
      unit: "%",
      showProgress: true,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-100/50",
      color: "amber"
    }
  ];

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 dark:from-indigo-950/30 dark:to-blue-950/30 py-6 border-b border-white/50">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              خلاصه فعالیت‌ها
              <Zap className="w-5 h-5 text-indigo-500" />
            </div>
            <p className="text-sm font-normal text-slate-600 dark:text-slate-400 mt-1">
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
            className={`bg-gradient-to-r ${activity.bgGradient} dark:from-slate-800/30 dark:to-slate-700/30 p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${activity.gradient} shadow-lg`}>
                    <activity.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white text-sm">
                      {activity.title}
                    </h3>
                    {activity.completionRate && (
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {toPersianNumbers(Math.round(activity.completionRate))}٪ تکمیل شده
                      </p>
                    )}
                  </div>
                </div>
                
                {activity.growth && (
                  <div className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg text-xs font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{toPersianNumbers(activity.growth)}٪</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-end justify-between mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">
                    {toPersianNumbers(activity.value)}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {activity.unit}
                  </span>
                </div>
              </div>
              
              {(activity.completionRate || activity.showProgress) && (
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${activity.completionRate || activity.value}%` 
                      }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.3 + (index * 0.1)
                      }}
                      className={`h-full bg-gradient-to-r ${activity.gradient} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-4 border-t border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">آخرین به‌روزرسانی</span>
            <span className="font-medium text-slate-800 dark:text-white">
              {toPersianNumbers(new Date().toLocaleDateString('fa-IR'))}
            </span>
          </div>
        </motion.div>
      </CardContent>
    </div>
  );
};

export default EliteActivityCard;
