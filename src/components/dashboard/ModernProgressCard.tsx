
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { BarChart3, Users, TrendingUp, Award, Trophy, Target, Zap } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";

interface ModernProgressCardProps {
  stats: DashboardStats;
}

export const ModernProgressCard = ({ stats }: ModernProgressCardProps) => {
  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50/80 via-white/50 to-blue-50/80 dark:from-green-950/30 dark:via-gray-900/50 dark:to-blue-950/30 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              پیشرفت کلی
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-1">
              تحلیل عملکرد شاگردان
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Main Progress Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              میانگین پیشرفت شاگردان
            </span>
            <div className="text-2xl font-bold flex items-center gap-2">
              <span className="text-gray-900 dark:text-white">{toPersianNumbers(stats.studentsProgress)}</span>
              <span className="text-green-500 dark:text-green-400">٪</span>
              
              {/* Trophy animation for high progress */}
              {stats.studentsProgress > 75 && (
                <motion.div 
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 1],
                    rotate: [0, -15, 15, 0]
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <Trophy className="w-6 h-6 text-yellow-500" fill="#EAB308" />
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.studentsProgress}%` }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full relative shadow-sm"
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 w-full h-full">
                  <motion.div 
                    className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                    animate={{
                      left: ["-10%", "110%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                
                {/* Glowing dot at the end */}
                <motion.div 
                  className="absolute top-0 bottom-0 right-0 w-4 h-4 bg-white rounded-full shadow-lg -mr-2 -my-0"
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(34, 197, 94, 0.8)', '0 0 20px rgba(34, 197, 94, 0.8)', '0 0 0px rgba(34, 197, 94, 0.8)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
              
              {/* Progress percentage markers */}
              <div className="absolute inset-0 flex justify-between px-2 opacity-40">
                {[25, 50, 75].map((mark) => (
                  <div key={mark} className="h-full flex items-center">
                    <div className="h-4 w-0.5 bg-gray-400 dark:bg-gray-500 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progress level labels */}
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>۰٪</span>
              <span>۵۰٪</span>
              <span>۱۰۰٪</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Students Active */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-800/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">شاگردان فعال</span>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {toPersianNumbers(stats.totalStudents)}
                </div>
                <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg font-medium">
                  {stats.studentGrowth > 0 ? "+" : ""}{toPersianNumbers(stats.studentGrowth)}٪
                </div>
              </div>
              
              {/* Mini progress bar */}
              <div className="mt-3 h-1.5 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((stats.totalStudents / stats.maxCapacity) * 100, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Progress Level */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-gray-800/30 p-4 rounded-2xl border border-green-100 dark:border-green-900/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50">
                  <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">سطح پیشرفت</span>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold flex items-baseline gap-1 text-green-600 dark:text-green-400">
                  <span>{toPersianNumbers(stats.studentsProgress)}</span>
                  <span className="text-sm">%</span>
                </div>
                {stats.studentsProgress > 70 && (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                )}
              </div>
              
              {/* Progress level text */}
              <div className="mt-3">
                <ProgressLevelIndicator progress={stats.studentsProgress} />
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </div>
  );
};

// Helper component to show textual progress level
const ProgressLevelIndicator = ({ progress }: { progress: number }) => {
  let levelText = "";
  let colorClass = "";
  
  if (progress < 20) {
    levelText = "در ابتدای راه";
    colorClass = "text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800";
  } else if (progress < 40) {
    levelText = "در حال پیشرفت";
    colorClass = "text-orange-600 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800";
  } else if (progress < 60) {
    levelText = "نسبتاً خوب";
    colorClass = "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800";
  } else if (progress < 80) {
    levelText = "خیلی خوب";
    colorClass = "text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800";
  } else {
    levelText = "فوق‌العاده";
    colorClass = "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800";
  }
  
  return (
    <span className={`${colorClass} px-3 py-1.5 rounded-xl text-xs font-semibold`}>
      {levelText}
    </span>
  );
};
