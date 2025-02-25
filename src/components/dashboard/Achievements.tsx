
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Target, Scale } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { DashboardStats } from "@/types/dashboard";

export const Achievements = ({ stats }: { stats: DashboardStats }) => {
  const achievements = [
    {
      title: "میانگین پیشرفت",
      description: `${toPersianNumbers(stats.studentsProgress)}٪ پیشرفت کلی`,
      icon: Crown,
      gradient: "from-yellow-500 to-yellow-600",
      progress: stats.studentsProgress
    },
    {
      title: "جلسات تمرینی",
      description: `${toPersianNumbers(stats.totalSessions)} جلسه در این ماه`,
      icon: Target,
      gradient: "from-blue-500 to-blue-600",
      progress: Math.min((stats.totalSessions / stats.maxSessionsPerMonth) * 100, 100)
    },
    {
      title: "برنامه های غذایی",
      description: `${toPersianNumbers(Math.round(stats.mealCompletionRate))}٪ تکمیل شده`,
      icon: Scale,
      gradient: "from-green-500 to-green-600",
      progress: stats.mealCompletionRate
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {achievements.map((achievement) => (
        <Card key={achievement.title} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg bg-gradient-to-br ${achievement.gradient} p-2 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                <achievement.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">{achievement.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {achievement.description}
                </p>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${achievement.gradient} transition-all duration-300`}
                style={{ width: `${Math.min(achievement.progress, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
