
import React from "react";
import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, Calendar, Dumbbell, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useStudentDashboardData } from "../hooks/useStudentDashboardData";

export const StudentStatsGrid = () => {
  const { data, loading } = useStudentDashboardData();

  const stats = [
    {
      id: 1,
      title: "کل تمرین‌ها",
      value: data.totalWorkouts,
      icon: Dumbbell,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20"
    },
    {
      id: 2,
      title: "روزهای فعال",
      value: data.completedDays,
      icon: Calendar,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/20 to-teal-900/20"
    },
    {
      id: 3,
      title: "پیشرفت هفتگی",
      value: `${data.progressPercent}%`,
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "from-purple-900/20 to-pink-900/20"
    },
    {
      id: 4,
      title: "تمرین امروز",
      value: data.todayWorkouts,
      icon: Trophy,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      darkBgGradient: "from-orange-900/20 to-red-900/20"
    },
    {
      id: 5,
      title: "هدف هفتگی",
      value: data.weeklyGoal,
      icon: Target,
      gradient: "from-teal-500 to-green-500",
      bgGradient: "from-teal-50 to-green-50",
      darkBgGradient: "from-teal-900/20 to-green-900/20"
    },
    {
      id: 6,
      title: "کالری روزانه",
      value: data.calories,
      icon: Flame,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      darkBgGradient: "from-yellow-900/20 to-orange-900/20"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className={`bg-gradient-to-br ${stat.bgGradient} dark:${stat.darkBgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {typeof stat.value === 'number' ? toPersianNumbers(stat.value.toString()) : stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
