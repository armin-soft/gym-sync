
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { BarChart3, Dumbbell, Users, TrendingUp, Award, Trophy } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";

interface ProgressCardProps {
  stats: DashboardStats;
}

export const ProgressCard = ({ stats }: ProgressCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200/50 dark:border-slate-800/50 group">
      <CardHeader className="bg-gradient-to-r from-emerald-50/70 to-slate-50/70 dark:from-emerald-900/20 dark:to-slate-900/20 py-4 border-b border-slate-200/70 dark:border-slate-800/70">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 ring-1 ring-emerald-500/20 shadow-sm">
            <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          پیشرفت کلی
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            میانگین پیشرفت شاگردان
          </span>
          <div className="text-xl font-bold flex items-center">
            <span>{toPersianNumbers(stats.studentsProgress)}</span>
            <span className="text-emerald-500 dark:text-emerald-400">٪</span>
            
            {/* Trophy animation for high progress */}
            {stats.studentsProgress > 75 && (
              <motion.div 
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: [0, -15, 15, 0]
                }}
                transition={{ duration: 0.6 }}
                className="ml-2"
              >
                <Trophy className="w-4 h-4 text-amber-400" fill="#fbbf24" />
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${stats.studentsProgress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full relative"
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 w-full h-full">
              <motion.div 
                className="absolute top-0 bottom-0 w-10 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  left: ["-10%", "120%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
          
          {/* Progress percentage markers */}
          <div className="absolute inset-0 flex justify-between px-2 opacity-70">
            {[25, 50, 75].map((mark) => (
              <div key={mark} className="h-full flex items-center">
                <div className="h-3 w-0.5 bg-white/30 dark:bg-slate-700/70" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Progress level indicator */}
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          <span>۰٪</span>
          <span>۵۰٪</span>
          <span>۱۰۰٪</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <motion.div 
            whileHover={{ translateY: -2 }}
            className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg hover:shadow-md transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group"
          >
            <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="p-1.5 rounded-md bg-blue-100/70 dark:bg-blue-900/30">
                <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <span>شاگردان فعال</span>
            </div>
            <div className="mt-2 flex justify-between items-baseline">
              <p className="text-xl font-bold">{toPersianNumbers(stats.totalStudents)}</p>
              <div className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
                {stats.studentGrowth > 0 ? "+" : ""}{toPersianNumbers(stats.studentGrowth)}٪
              </div>
            </div>
            
            {/* Mini progress bar */}
            <div className="mt-2 h-1 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((stats.totalStudents / stats.maxCapacity) * 100, 100)}%` }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
              />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ translateY: -2 }}
            className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg hover:shadow-md transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group"
          >
            <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="p-1.5 rounded-md bg-emerald-100/70 dark:bg-emerald-900/30">
                <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>پیشرفت</span>
            </div>
            <p className="mt-2 text-xl font-bold flex items-baseline gap-1">
              <span>{toPersianNumbers(stats.studentsProgress)}</span>
              <span className="text-sm text-emerald-500">%</span>
            </p>
            
            {/* Progress level text */}
            <div className="mt-2 text-xs">
              <ProgressLevelIndicator progress={stats.studentsProgress} />
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component to show textual progress level
const ProgressLevelIndicator = ({ progress }: { progress: number }) => {
  let levelText = "";
  let colorClass = "";
  
  if (progress < 20) {
    levelText = "در ابتدای راه";
    colorClass = "text-red-500 bg-red-50 dark:bg-red-900/20";
  } else if (progress < 40) {
    levelText = "در حال پیشرفت";
    colorClass = "text-orange-500 bg-orange-50 dark:bg-orange-900/20";
  } else if (progress < 60) {
    levelText = "نسبتاً خوب";
    colorClass = "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
  } else if (progress < 80) {
    levelText = "خیلی خوب";
    colorClass = "text-green-500 bg-green-50 dark:bg-green-900/20";
  } else {
    levelText = "فوق‌العاده";
    colorClass = "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
  }
  
  return (
    <span className={`${colorClass} px-2 py-0.5 rounded text-xs font-medium`}>
      {levelText}
    </span>
  );
};
