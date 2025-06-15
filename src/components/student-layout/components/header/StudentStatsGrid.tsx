
import React from "react";
import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarDimensions } from "@/components/modern-sidebar/utils/deviceUtils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { StudentSidebarStats } from "../../types/studentSidebarTypes";

interface StudentStatsGridProps {
  stats: StudentSidebarStats;
}

export const StudentStatsGrid: React.FC<StudentStatsGridProps> = ({ stats }) => {
  const { deviceInfo } = useSidebarDimensions();
  
  const getGridCols = () => {
    if (deviceInfo.isMobile) return "grid-cols-2";
    if (deviceInfo.isTablet) return "grid-cols-2";
    return "grid-cols-2";
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-2";
    if (deviceInfo.isTablet) return "p-2.5";
    return "p-3";
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) return "h-3.5 w-3.5";
    if (deviceInfo.isTablet) return "h-4 w-4";
    return "h-4 w-4";
  };

  const getTextSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-xs";
    return "text-sm";
  };

  const getValueSize = () => {
    if (deviceInfo.isMobile) return "text-sm";
    if (deviceInfo.isTablet) return "text-base";
    return "text-lg";
  };

  const statsData = [
    {
      id: "workouts",
      label: "تمرینات",
      value: stats.totalWorkouts,
      icon: Trophy,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      id: "days",
      label: "روزهای فعال",
      value: stats.completedDays,
      icon: Target,
      color: "from-sky-500 to-sky-600",
      bgColor: "bg-sky-50 dark:bg-sky-900/20",
      textColor: "text-sky-600 dark:text-sky-400"
    },
    {
      id: "goals",
      label: "اهداف",
      value: stats.achievedGoals,
      icon: Award,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      textColor: "text-amber-600 dark:text-amber-400"
    },
    {
      id: "progress",
      label: "پیشرفت",
      value: `${stats.progressPercent}%`,
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <motion.div 
      className={cn("grid gap-2", getGridCols())}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            className={cn(
              "rounded-xl border border-white/20 backdrop-blur-sm shadow-sm",
              stat.bgColor,
              getCardPadding()
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.5 + (index * 0.1),
              type: "spring",
              stiffness: 300 
            }}
            whileHover={{ scale: 1.02 }}
            dir="rtl"
          >
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className={cn(
                  "font-bold truncate",
                  stat.textColor,
                  getValueSize()
                )}>
                  {typeof stat.value === 'number' ? toPersianNumbers(stat.value.toString()) : stat.value}
                </p>
                <p className={cn(
                  "truncate text-gray-600 dark:text-gray-400",
                  getTextSize()
                )}>
                  {stat.label}
                </p>
              </div>
              
              <div className={cn(
                "flex-shrink-0 rounded-lg p-1.5",
                stat.bgColor
              )}>
                <Icon className={cn(
                  stat.textColor,
                  getIconSize()
                )} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
