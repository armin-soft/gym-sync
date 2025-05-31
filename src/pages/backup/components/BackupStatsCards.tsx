
import React from "react";
import { Users, Dumbbell, UtensilsCrossed, Pill } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface BackupStatsCardsProps {
  realStats: {
    students: number;
    exercises: number;
    meals: number;
    supplements: number;
  };
  isRefreshing?: boolean;
}

export const BackupStatsCards: React.FC<BackupStatsCardsProps> = ({ 
  realStats,
  isRefreshing = false 
}) => {
  const statsData = [
    {
      title: "شاگردان",
      value: realStats.students,
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50"
    },
    {
      title: "تمرینات",
      value: realStats.exercises,
      icon: Dumbbell,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      title: "وعده‌های غذایی",
      value: realStats.meals,
      icon: UtensilsCrossed,
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50"
    },
    {
      title: "مکمل‌ها",
      value: realStats.supplements,
      icon: Pill,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 relative z-10">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className={`p-4 sm:p-6 bg-gradient-to-br ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${isRefreshing ? 'animate-pulse' : ''}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-base font-medium text-slate-600 mb-1">
                  {stat.title}
                </p>
                <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent transition-all duration-300`}>
                  {stat.value.toLocaleString('fa-IR')}
                </p>
              </div>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
