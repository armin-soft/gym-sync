
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Clock,
  User2,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  TrendingUp,
  Users,
  Calendar,
  ChartBar
} from "lucide-react";
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
      {/* هدر صفحه با گرادینت جدید */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 p-8 text-white">
        <div className="absolute inset-0 bg-[url(/pattern.svg)] opacity-20" />
        <div className="relative">
          <div className="flex flex-col space-y-4">
            {/* بخش عنوان و نشان‌ها */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    خوش آمدید 👋
                  </h1>
                  <Badge variant="secondary" className="bg-white/10 text-white border-0">
                    مربی
                  </Badge>
                </div>
                <p className="mt-2 text-white/80">
                  داشبورد مدیریت برنامه تمرینی
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-white/20 text-white">
                  <Clock className="w-3 h-3 ml-1" />
                  {new Date().toLocaleDateString('fa-IR')}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`border-white/20 text-white ${
                    stats.totalStudents > 0 ? 'bg-green-500/20' : 'bg-yellow-500/20'
                  }`}
                >
                  <Activity className="w-3 h-3 ml-1" />
                  {stats.totalStudents > 0 ? 'فعال' : 'در انتظار'}
                </Badge>
              </div>
            </div>

            {/* کارت‌های آمار */}
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-lg">
                <Users className="h-5 w-5 text-white/80" />
                <div>
                  <p className="text-sm text-white/80">تعداد شاگردان</p>
                  <p className="text-lg font-semibold text-white">{toPersianNumbers(stats.totalStudents)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-lg">
                <Calendar className="h-5 w-5 text-white/80" />
                <div>
                  <p className="text-sm text-white/80">جلسات تمرینی</p>
                  <p className="text-lg font-semibold text-white">{toPersianNumbers(stats.totalSessions)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-lg">
                <UtensilsCrossed className="h-5 w-5 text-white/80" />
                <div>
                  <p className="text-sm text-white/80">برنامه های غذایی</p>
                  <p className="text-lg font-semibold text-white">{toPersianNumbers(stats.totalMeals)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-lg">
                <Pill className="h-5 w-5 text-white/80" />
                <div>
                  <p className="text-sm text-white/80">مکمل های تجویز شده</p>
                  <p className="text-lg font-semibold text-white">{toPersianNumbers(stats.totalSupplements)}</p>
                </div>
              </div>
            </div>

            {/* دکمه‌های اصلی */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button 
                variant="secondary" 
                className="group text-white bg-white/10 hover:bg-white/20 backdrop-blur-lg"
                onClick={() => window.location.href = '/students'}
              >
                مدیریت شاگردان
                <User2 className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="secondary" 
                className="group text-white bg-white/10 hover:bg-white/20 backdrop-blur-lg"
                onClick={() => window.location.href = '/exercises'}
              >
                مدیریت تمرین‌ها
                <Dumbbell className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="secondary" 
                className="group text-white bg-white/10 hover:bg-white/20 backdrop-blur-lg"
                onClick={() => window.location.href = '/diet'}
              >
                برنامه‌های غذایی
                <UtensilsCrossed className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="secondary" 
                className="group text-white bg-white/10 hover:bg-white/20 backdrop-blur-lg"
                onClick={() => window.location.href = '/supplements'}
              >
                مکمل‌ها
                <Pill className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="secondary" 
                className="group text-white bg-white/10 hover:bg-white/20 backdrop-blur-lg"
                onClick={() => window.location.href = '/reports'}
              >
                گزارشات
                <ChartBar className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
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
