
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, TrendingUp, Calendar, Award,
  Dumbbell, Clock, Star, Activity
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface ExerciseStatsProps {
  studentExercises: any[];
  totalExercises: number;
  totalCategories: number;
}

const ExerciseStats: React.FC<ExerciseStatsProps> = ({
  studentExercises,
  totalExercises,
  totalCategories
}) => {
  const completedExercises = studentExercises.filter(ex => ex.completed).length;
  const weeklyProgress = studentExercises.length > 0 ? Math.round((completedExercises / studentExercises.length) * 100) : 0;
  const averageTime = 45; // This would come from actual tracking
  const totalWorkouts = 12; // This would come from actual tracking

  const stats = [
    {
      icon: Target,
      label: "تمرین اختصاصی",
      value: studentExercises.length,
      suffix: "",
      gradient: "from-emerald-500 to-teal-500",
      description: "تمرین برای شما"
    },
    {
      icon: TrendingUp,
      label: "پیشرفت هفتگی",
      value: weeklyProgress,
      suffix: "%",
      gradient: "from-sky-500 to-blue-500",
      description: "تکمیل شده"
    },
    {
      icon: Clock,
      label: "متوسط زمان",
      value: averageTime,
      suffix: " دقیقه",
      gradient: "from-purple-500 to-pink-500",
      description: "در هر جلسه"
    },
    {
      icon: Award,
      label: "کل تمرینات",
      value: totalWorkouts,
      suffix: " جلسه",
      gradient: "from-orange-500 to-red-500",
      description: "انجام شده"
    },
    {
      icon: Dumbbell,
      label: "حرکات موجود",
      value: totalExercises,
      suffix: "",
      gradient: "from-indigo-500 to-purple-500",
      description: "در سیستم"
    },
    {
      icon: Activity,
      label: "دسته‌بندی‌ها",
      value: totalCategories,
      suffix: "",
      gradient: "from-green-500 to-emerald-500",
      description: "گروه تمرین"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group hover:scale-105">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
                  stat.gradient
                )}>
                  <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {toPersianNumbers(stat.value.toString())}{stat.suffix}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExerciseStats;
