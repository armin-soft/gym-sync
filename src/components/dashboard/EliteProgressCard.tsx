
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { BarChart3, Users, TrendingUp, Target, Trophy, Zap } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";

interface EliteProgressCardProps {
  stats: DashboardStats;
}

export const EliteProgressCard = ({ stats }: EliteProgressCardProps) => {
  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30 py-6 border-b border-white/50">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              پیشرفت کلی
              <Target className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-sm font-normal text-slate-600 dark:text-slate-400 mt-1">
              تحلیل عملکرد شاگردان
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Main Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              میانگین پیشرفت شاگردان
            </span>
            <div className="text-2xl font-bold flex items-center gap-2">
              <span className="text-slate-800 dark:text-white">{toPersianNumbers(stats.studentsProgress)}</span>
              <span className="text-emerald-500">٪</span>
              
              {stats.studentsProgress > 75 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1], rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.8 }}
                >
                  <Trophy className="w-6 h-6 text-amber-500" fill="#F59E0B" />
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.studentsProgress}%` }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                
                <motion.div 
                  className="absolute top-0 bottom-0 right-0 w-4 h-4 bg-white rounded-full shadow-lg -mr-2 -my-0"
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(16, 185, 129, 0.8)', '0 0 20px rgba(16, 185, 129, 0.8)', '0 0 0px rgba(16, 185, 129, 0.8)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
            
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>۰٪</span>
              <span>۵۰٪</span>
              <span>۱۰۰٪</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/30 dark:to-slate-800/30 p-4 rounded-2xl border border-violet-100 dark:border-violet-900/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-900/50">
                <Users className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">شاگردان فعال</span>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                {toPersianNumbers(stats.totalStudents)}
              </div>
              <div className="text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-2 py-1 rounded-lg">
                {stats.studentGrowth > 0 ? "+" : ""}{toPersianNumbers(stats.studentGrowth)}٪
              </div>
            </div>
            
            <div className="mt-3 h-1.5 w-full bg-violet-100 dark:bg-violet-900/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((stats.totalStudents / stats.maxCapacity) * 100, 100)}%` }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
              />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-slate-800/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">سطح پیشرفت</span>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {toPersianNumbers(stats.studentsProgress)}٪
              </div>
              {stats.studentsProgress > 70 && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                </motion.div>
              )}
            </div>
            
            <div className="mt-3">
              <ProgressLevelIndicator progress={stats.studentsProgress} />
            </div>
          </motion.div>
        </div>
      </CardContent>
    </div>
  );
};

const ProgressLevelIndicator = ({ progress }: { progress: number }) => {
  let levelText = "";
  let colorClass = "";
  
  if (progress < 20) {
    levelText = "در ابتدای راه";
    colorClass = "text-rose-600 bg-rose-50 dark:bg-rose-900/20 border border-rose-200";
  } else if (progress < 40) {
    levelText = "در حال پیشرفت";
    colorClass = "text-orange-600 bg-orange-50 dark:bg-orange-900/20 border border-orange-200";
  } else if (progress < 60) {
    levelText = "نسبتاً خوب";
    colorClass = "text-amber-600 bg-amber-50 dark:bg-amber-900/20 border border-amber-200";
  } else if (progress < 80) {
    levelText = "خیلی خوب";
    colorClass = "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200";
  } else {
    levelText = "فوق‌العاده";
    colorClass = "text-teal-600 bg-teal-50 dark:bg-teal-900/20 border border-teal-200";
  }
  
  return (
    <span className={`${colorClass} px-3 py-1.5 rounded-xl text-xs font-semibold`}>
      {levelText}
    </span>
  );
};
