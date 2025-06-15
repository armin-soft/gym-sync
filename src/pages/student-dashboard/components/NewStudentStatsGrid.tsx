
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Trophy, Calendar, TrendingUp, Zap, Clock } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Skeleton } from "@/components/ui/skeleton";

interface NewStudentStatsGridProps {
  data: any;
  loading: boolean;
}

const StatsCard = React.memo(({ icon: Icon, title, value, subtitle, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <Badge variant="secondary" className="text-xs">
            جدید
          </Badge>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {toPersianNumbers(value)}
          </h3>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
));

export const NewStudentStatsGrid: React.FC<NewStudentStatsGridProps> = React.memo(({ data, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-12 w-12 rounded-xl mb-4" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-20" />
          </Card>
        ))}
      </div>
    );
  }

  const statsCards = [
    {
      icon: Target,
      title: "تمرین‌های کل",
      value: data.totalWorkouts.toString(),
      subtitle: "در برنامه هفتگی شما",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      delay: 0
    },
    {
      icon: Trophy,
      title: "روزهای فعال",
      value: data.completedDays.toString(),
      subtitle: "از ۷ روز هفته",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      delay: 0.1
    },
    {
      icon: Calendar,
      title: "تمرین امروز",
      value: data.todayWorkouts.toString(),
      subtitle: "برنامه‌ریزی شده",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      delay: 0.2
    },
    {
      icon: Zap,
      title: "کالری",
      value: data.calories.toString(),
      subtitle: "برآورد روزانه",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      delay: 0.3
    },
    {
      icon: TrendingUp,
      title: "پیشرفت وزن",
      value: `${data.weightProgress}%`,
      subtitle: "نسبت به هدف",
      color: "bg-gradient-to-r from-pink-500 to-pink-600",
      delay: 0.4
    },
    {
      icon: Clock,
      title: "مکمل‌ها",
      value: data.totalSupplements.toString(),
      subtitle: "تعریف شده",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      delay: 0.5
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {statsCards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  );
});

NewStudentStatsGrid.displayName = "NewStudentStatsGrid";
