
import { motion } from "framer-motion";
import { ModernStatCard } from "./ModernStatCard";
import { Users, UtensilsCrossed, Pill } from "lucide-react";
import type { DashboardStats } from "@/types/dashboard";
import { toPersianNumbers } from "@/lib/utils/numbers";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

export const ModernStatsCards = ({ stats }: { stats: DashboardStats }) => {
  const cardConfigs = [
    {
      title: "تعداد شاگردان",
      icon: Users,
      value: stats.totalStudents,
      growth: stats.studentGrowth,
      maxValue: stats.maxCapacity,
      color: "black" as const,
      description: "شاگرد فعال در سیستم",
      gradient: "from-black via-gray-800 to-gray-900",
      bgGradient: "from-black/5 via-gray-800/5 to-gray-900/5",
      textColor: "text-black dark:text-white",
      iconBg: "bg-black/10 dark:bg-white/10"
    },
    {
      title: "برنامه های غذایی",
      icon: UtensilsCrossed,
      value: stats.totalMeals,
      growth: stats.mealGrowth,
      maxValue: 100,
      percentage: stats.mealCompletionRate,
      color: "blue" as const,
      description: `${toPersianNumbers(Math.round(stats.mealCompletionRate))}٪ شاگردان دارای برنامه غذایی`,
      gradient: "from-blue-600 via-blue-700 to-blue-800",
      bgGradient: "from-blue-500/5 via-blue-600/5 to-blue-700/5",
      textColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/10"
    },
    {
      title: "مکمل و ویتامین تجویز شده",
      icon: Pill,
      value: stats.totalSupplements,
      growth: stats.supplementGrowth,
      maxValue: 100,
      percentage: stats.supplementCompletionRate,
      color: "gold" as const,
      description: `${toPersianNumbers(Math.round(stats.supplementCompletionRate))}٪ شاگردان دارای مکمل و ویتامین`,
      gradient: "from-yellow-500 via-yellow-600 to-yellow-700",
      bgGradient: "from-yellow-500/5 via-yellow-600/5 to-yellow-700/5",
      textColor: "text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-500/10"
    }
  ];

  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">آمار کلی</h2>
        <p className="text-gray-600 dark:text-gray-400">نمای کلی از عملکرد سیستم</p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full mt-2"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {cardConfigs.map((config, index) => (
          <ModernStatCard
            key={`stat-card-${index}`}
            {...config}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ModernStatsCards;
