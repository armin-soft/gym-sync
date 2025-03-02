import { Card, CardContent } from "@/components/ui/card";
import { Crown, Target, Scale } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { DashboardStats } from "@/types/dashboard";
export const Achievements = ({
  stats
}: {
  stats: DashboardStats;
}) => {
  const achievements = [{
    title: "میانگین پیشرفت",
    description: `${toPersianNumbers(stats.studentsProgress)}٪ پیشرفت کلی`,
    icon: Crown,
    gradient: "from-yellow-500 to-yellow-600",
    progress: stats.studentsProgress
  }, {
    title: "جلسات تمرینی",
    description: `${toPersianNumbers(stats.totalSessions)} جلسه در این ماه`,
    icon: Target,
    gradient: "from-blue-500 to-blue-600",
    progress: Math.min(stats.totalSessions / stats.maxSessionsPerMonth * 100, 100)
  }, {
    title: "برنامه های غذایی",
    description: `${toPersianNumbers(Math.round(stats.mealCompletionRate))}٪ تکمیل شده`,
    icon: Scale,
    gradient: "from-green-500 to-green-600",
    progress: stats.mealCompletionRate
  }];
  return;
};