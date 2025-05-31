
import { motion } from "framer-motion";
import { EliteStatCard } from "./EliteStatCard";
import { Users, UtensilsCrossed, Pill } from "lucide-react";
import type { DashboardStats } from "@/types/dashboard";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const EliteStatsCards = ({ stats }: { stats: DashboardStats }) => {
  const cardConfigs = [
    {
      title: "تعداد شاگردان",
      icon: Users,
      value: stats.totalStudents,
      growth: stats.studentGrowth,
      maxValue: stats.maxCapacity,
      color: "slate" as const,
      description: "شاگرد فعال در سیستم",
      gradient: "from-slate-500 to-slate-700",
      bgGradient: "from-slate-50 to-slate-100/50"
    },
    {
      title: "برنامه‌های غذایی",
      icon: UtensilsCrossed,
      value: stats.totalMeals,
      growth: stats.mealGrowth,
      maxValue: 100,
      percentage: stats.mealCompletionRate,
      color: "violet" as const,
      description: `${toPersianNumbers(Math.round(stats.mealCompletionRate))}٪ شاگردان دارای برنامه غذایی`,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-100/50"
    },
    {
      title: "مکمل و ویتامین",
      icon: Pill,
      value: stats.totalSupplements,
      growth: stats.supplementGrowth,
      maxValue: 100,
      percentage: stats.supplementCompletionRate,
      color: "emerald" as const,
      description: `${toPersianNumbers(Math.round(stats.supplementCompletionRate))}٪ شاگردان دارای مکمل`,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-100/50"
    }
  ];

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">آمار کلی</h2>
        <p className="text-slate-600 dark:text-slate-400">نمای کلی از عملکرد سیستم</p>
        <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mt-3"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cardConfigs.map((config, index) => (
          <EliteStatCard
            key={`stat-card-${index}`}
            {...config}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default EliteStatsCards;
