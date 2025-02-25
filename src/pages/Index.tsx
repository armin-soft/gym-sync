
import { Badge } from "@/components/ui/badge";
import { Activity, Clock } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Achievements } from "@/components/dashboard/Achievements";
import { useDashboardStats } from "@/hooks/useDashboardStats";

const Index = () => {
  const stats = useDashboardStats();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  داشبورد مدیریت
                </h1>
                <p className="mt-2 text-primary-foreground/80">
                  خلاصه وضعیت سیستم مدیریت برنامه تمرینی
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground">
                  <Clock className="w-3 h-3 ml-1" />
                  امروز
                </Badge>
                <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground">
                  <Activity className="w-3 h-3 ml-1" />
                  {stats.totalStudents > 0 ? 'فعال' : 'در انتظار'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickActions />
      <StatsCards stats={stats} />
      <Achievements stats={stats} />
    </div>
  );
};

export default Index;

