
import { Users, UtensilsCrossed, Pill, LucideIcon } from "lucide-react";
import { type DashboardStats } from "@/types/dashboard";
import { toPersianNumbers } from "@/lib/utils/numbers";

// Configuration for each stat card
export interface StatCardConfig {
  title: string;
  icon: LucideIcon;
  value: number;
  growth: number;
  maxValue: number;
  percentage?: number;
  color: "black" | "orange" | "gold";
  description: string;
}

// Function to generate all stats card configs
export const generateStatsCardConfigs = (stats: DashboardStats): StatCardConfig[] => {
  return [
    {
      title: "تعداد شاگردان",
      icon: Users,
      value: stats.totalStudents,
      growth: stats.studentGrowth,
      maxValue: stats.maxCapacity,
      color: "black",
      description: "شاگرد فعال در سیستم",
    },
    {
      title: "برنامه های غذایی",
      icon: UtensilsCrossed,
      value: stats.totalMeals,
      growth: stats.mealGrowth,
      maxValue: 100,
      percentage: stats.mealCompletionRate,
      color: "orange",
      description: `${toPersianNumbers(Math.round(stats.mealCompletionRate))}٪ شاگردان دارای برنامه غذایی`,
    },
    {
      title: "مکمل و ویتامین تجویز شده",
      icon: Pill,
      value: stats.totalSupplements,
      growth: stats.supplementGrowth,
      maxValue: 100,
      percentage: stats.supplementCompletionRate,
      color: "gold",
      description: `${toPersianNumbers(Math.round(stats.supplementCompletionRate))}٪ شاگردان دارای مکمل و ویتامین`,
    }
  ];
};
