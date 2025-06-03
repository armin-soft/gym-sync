
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Utensils, Users, Calendar, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DietStatsProps {
  stats: {
    totalMeals: number;
    totalStudents: number;
    weeklyPlans: number;
    completionRate: number;
  };
  isLoading: boolean;
}

export const DietStats: React.FC<DietStatsProps> = ({ stats, isLoading }) => {
  const statsData = [
    {
      title: "کل وعده‌های غذایی",
      value: stats.totalMeals,
      icon: Utensils,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "شاگردان فعال",
      value: stats.totalStudents,
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "برنامه‌های هفتگی",
      value: stats.weeklyPlans,
      icon: Calendar,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "نرخ تکمیل برنامه‌ها",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className={`p-6 ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {isLoading ? "..." : typeof stat.value === 'string' ? stat.value : toPersianNumbers(stat.value)}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
