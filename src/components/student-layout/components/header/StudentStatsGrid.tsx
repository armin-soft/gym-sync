
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Calendar, Target, TrendingUp } from "lucide-react";
import { useSidebarDimensions } from "@/components/modern-sidebar/utils/deviceUtils";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { StudentSidebarStats } from "../../types/studentSidebarTypes";

interface StudentStatsGridProps {
  stats: StudentSidebarStats;
}

export const StudentStatsGrid: React.FC<StudentStatsGridProps> = ({ stats }) => {
  const { deviceInfo } = useSidebarDimensions();
  
  const getGridCols = () => {
    if (deviceInfo.isMobile) return "grid-cols-2";
    return "grid-cols-2";
  };

  const statsItems = [
    {
      label: "تمرینات",
      value: toPersianNumbers(stats.totalWorkouts.toString()),
      icon: Dumbbell,
      color: "emerald"
    },
    {
      label: "روزهای فعال",
      value: toPersianNumbers(stats.completedDays.toString()),
      icon: Calendar,
      color: "sky"
    },
    {
      label: "اهداف محقق شده",
      value: toPersianNumbers(stats.achievedGoals.toString()),
      icon: Target,
      color: "purple"
    },
    {
      label: "پیشرفت",
      value: `${toPersianNumbers(stats.progressPercent.toString())}%`,
      icon: TrendingUp,
      color: "orange"
    }
  ];

  return (
    <motion.div
      className={cn("grid gap-3", getGridCols())}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {statsItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/60 to-white/40 dark:from-slate-700/60 dark:to-slate-600/40 backdrop-blur-sm border border-white/50 dark:border-slate-600/50 p-3 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shadow-md",
                `bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600`
              )}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                  {stat.label}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
