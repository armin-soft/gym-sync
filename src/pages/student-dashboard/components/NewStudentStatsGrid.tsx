
import React from "react";
import { motion } from "framer-motion";
import { 
  Dumbbell, Calendar, TrendingUp, Target, 
  Flame, Trophy, Clock, BarChart3, 
  Apple, Pill, Activity, Zap 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatsData {
  totalWorkouts: number;
  completedDays: number;
  weeklyProgress: number;
  todayWorkouts: number;
  calories: number;
  weeklyGoal: number;
  totalMeals: number;
  totalSupplements: number;
  exerciseStreak: number;
  mealCompletionRate: number;
  supplementCompletionRate: number;
}

interface NewStudentStatsGridProps {
  data: StatsData;
  loading: boolean;
}

export const NewStudentStatsGrid: React.FC<NewStudentStatsGridProps> = ({ data, loading }) => {
  const statsCards = [
    {
      id: 1,
      title: "تمرین‌های هفته",
      value: data.totalWorkouts,
      subtitle: "تمرین",
      icon: Dumbbell,
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
      darkBgGradient: "from-blue-900/20 via-indigo-900/20 to-purple-900/20",
      progress: Math.round((data.totalWorkouts / 15) * 100),
      trend: "+۱۲%"
    },
    {
      id: 2,
      title: "روزهای فعال",
      value: data.completedDays,
      subtitle: "از ۷ روز",
      icon: Calendar,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
      darkBgGradient: "from-emerald-900/20 via-teal-900/20 to-cyan-900/20",
      progress: data.weeklyProgress,
      trend: "+۸%"
    },
    {
      id: 3,
      title: "پیشرفت هفتگی",
      value: `${data.weeklyProgress}%`,
      subtitle: "تکمیل شده",
      icon: TrendingUp,
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      bgGradient: "from-purple-50 via-pink-50 to-rose-50",
      darkBgGradient: "from-purple-900/20 via-pink-900/20 to-rose-900/20",
      progress: data.weeklyProgress,
      trend: "+۲۵%"
    },
    {
      id: 4,
      title: "تمرین امروز",
      value: data.todayWorkouts,
      subtitle: "حرکت",
      icon: Activity,
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      bgGradient: "from-orange-50 via-amber-50 to-yellow-50",
      darkBgGradient: "from-orange-900/20 via-amber-900/20 to-yellow-900/20",
      progress: data.todayWorkouts > 0 ? 100 : 0,
      trend: "امروز"
    },
    {
      id: 5,
      title: "کالری مصرفی",
      value: data.calories,
      subtitle: "کالری",
      icon: Flame,
      gradient: "from-red-500 via-orange-500 to-pink-500",
      bgGradient: "from-red-50 via-orange-50 to-pink-50",
      darkBgGradient: "from-red-900/20 via-orange-900/20 to-pink-900/20",
      progress: Math.min(100, Math.round((data.calories / 2000) * 100)),
      trend: "+۵%"
    },
    {
      id: 6,
      title: "استریک تمرین",
      value: data.exerciseStreak,
      subtitle: "روز متوالی",
      icon: Trophy,
      gradient: "from-violet-500 via-purple-500 to-indigo-500",
      bgGradient: "from-violet-50 via-purple-50 to-indigo-50",
      darkBgGradient: "from-violet-900/20 via-purple-900/20 to-indigo-900/20",
      progress: Math.min(100, Math.round((data.exerciseStreak / 30) * 100)),
      trend: "🔥"
    },
    {
      id: 7,
      title: "وعده‌های غذایی",
      value: data.totalMeals,
      subtitle: "وعده",
      icon: Apple,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      bgGradient: "from-green-50 via-emerald-50 to-teal-50",
      darkBgGradient: "from-green-900/20 via-emerald-900/20 to-teal-900/20",
      progress: data.mealCompletionRate,
      trend: "+۱۵%"
    },
    {
      id: 8,
      title: "مکمل و ویتامین",
      value: data.totalSupplements,
      subtitle: "مکمل",
      icon: Pill,
      gradient: "from-cyan-500 via-sky-500 to-blue-500",
      bgGradient: "from-cyan-50 via-sky-50 to-blue-50",
      darkBgGradient: "from-cyan-900/20 via-sky-900/20 to-blue-900/20",
      progress: data.supplementCompletionRate,
      trend: "+۱۰%"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.23, 1, 0.32, 1]
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
          >
            <Card className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} dark:${stat.darkBgGradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm`}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-black text-gray-900 dark:text-white">
                        {typeof stat.value === 'number' ? toPersianNumbers(stat.value.toString()) : stat.value}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.subtitle}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">پیشرفت</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {toPersianNumbers(stat.progress.toString())}%
                    </span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>

                {/* Trend */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {stat.trend}
                  </span>
                  <Zap className="h-3 w-3 text-yellow-500" />
                </div>

                {/* Background Decoration */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full blur-lg" />
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
