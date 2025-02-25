
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Dumbbell, UtensilsCrossed, Pill, TrendingUp, TrendingDown } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { DashboardStats } from "@/types/dashboard";

const renderGrowthBadge = (growth: number) => (
  <Badge 
    variant="secondary" 
    className={`rounded-lg ${growth >= 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}
  >
    {growth >= 0 ? <TrendingUp className="w-3 h-3 ml-1" /> : <TrendingDown className="w-3 h-3 ml-1" />}
    {toPersianNumbers(Math.abs(growth))}٪
  </Badge>
);

export const StatsCards = ({ stats }: { stats: DashboardStats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="group overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">تعداد شاگردان</CardTitle>
          <Users className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="mt-4 flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">
              {toPersianNumbers(stats.totalStudents)}
            </div>
            {renderGrowthBadge(stats.studentGrowth)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            شاگرد فعال در سیستم
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 group-hover:w-full"
              style={{ width: `${Math.min((stats.totalStudents / stats.maxCapacity) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">جلسات تمرینی</CardTitle>
          <Dumbbell className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="mt-4 flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">
              {toPersianNumbers(stats.totalSessions)}
            </div>
            {renderGrowthBadge(stats.sessionGrowth)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            جلسه در این ماه
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 group-hover:w-full"
              style={{ width: `${Math.min((stats.totalSessions / stats.maxSessionsPerMonth) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">برنامه های غذایی</CardTitle>
          <UtensilsCrossed className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="mt-4 flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">
              {toPersianNumbers(stats.totalMeals)}
            </div>
            {renderGrowthBadge(stats.mealGrowth)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {toPersianNumbers(Math.round(stats.mealCompletionRate))}٪ شاگردان دارای برنامه غذایی
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 group-hover:w-full"
              style={{ width: `${stats.mealCompletionRate}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">مکمل و ویتامین تجویز شده</CardTitle>
          <Pill className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="mt-4 flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">
              {toPersianNumbers(stats.totalSupplements)}
            </div>
            {renderGrowthBadge(stats.supplementGrowth)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {toPersianNumbers(Math.round(stats.supplementCompletionRate))}٪ شاگردان دارای مکمل و ویتامین
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 group-hover:w-full"
              style={{ width: `${stats.supplementCompletionRate}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
