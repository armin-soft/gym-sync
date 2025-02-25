
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, User2, Dumbbell, UtensilsCrossed, Pill, ArrowUpRight } from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Achievements } from "@/components/dashboard/Achievements";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";

const Index = () => {
  const stats = useDashboardStats();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70 p-8 text-primary-foreground">
        <div className="absolute inset-0 bg-[url(/pattern.svg)] opacity-20" />
        <div className="relative">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    خوش آمدید 👋
                  </h1>
                  <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-0">
                    مربی
                  </Badge>
                </div>
                <p className="mt-2 text-primary-foreground/80">
                  خلاصه وضعیت سیستم مدیریت برنامه تمرینی
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground">
                  <Clock className="w-3 h-3 ml-1" />
                  {new Date().toLocaleDateString('fa-IR')}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`border-primary-foreground/20 text-primary-foreground ${
                    stats.totalStudents > 0 ? 'bg-green-500/20' : 'bg-yellow-500/20'
                  }`}
                >
                  <Activity className="w-3 h-3 ml-1" />
                  {stats.totalStudents > 0 ? 'فعال' : 'در انتظار'}
                </Badge>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 px-4 py-3">
                <User2 className="h-5 w-5 text-primary-foreground/80" />
                <div>
                  <p className="text-sm text-primary-foreground/80">تعداد شاگردان</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalStudents)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 px-4 py-3">
                <Dumbbell className="h-5 w-5 text-primary-foreground/80" />
                <div>
                  <p className="text-sm text-primary-foreground/80">جلسات تمرینی</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalSessions)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 px-4 py-3">
                <UtensilsCrossed className="h-5 w-5 text-primary-foreground/80" />
                <div>
                  <p className="text-sm text-primary-foreground/80">برنامه های غذایی</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalMeals)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 px-4 py-3">
                <Pill className="h-5 w-5 text-primary-foreground/80" />
                <div>
                  <p className="text-sm text-primary-foreground/80">مکمل های تجویز شده</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalSupplements)}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button 
                variant="secondary" 
                className="group text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20"
                onClick={() => window.location.href = '/Students'}
              >
                مشاهده لیست شاگردان
                <ArrowUpRight className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
              </Button>
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

