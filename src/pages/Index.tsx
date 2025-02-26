
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Clock,
  User2,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  Crown,
  Users,
  Calendar,
  ChartBar,
  Bell,
  Sun
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
      {/* هدر اصلی با طراحی جدید */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-[url(/pattern.svg)] opacity-10" />
        {/* افکت شیشه‌ای بالای صفحه */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-white/10 via-white/30 to-white/10" />
        
        <div className="relative">
          <div className="flex flex-col space-y-6">
            {/* هدر و نشان‌ها */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-white/20 blur-sm animate-pulse" />
                    <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-full">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                        خوش آمدید 👋
                      </h1>
                      <Badge variant="secondary" className="bg-white/10 text-white border-0 backdrop-blur-sm">
                        مربی حرفه‌ای
                      </Badge>
                    </div>
                    <p className="mt-2 text-white/80 text-sm">
                      به داشبورد مدیریت برنامه تمرینی خود خوش آمدید
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-white backdrop-blur-sm px-3 py-1">
                    <Sun className="w-3.5 h-3.5 ml-1.5 text-yellow-400" />
                    {new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </Badge>
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-white backdrop-blur-sm px-3 py-1">
                    <Clock className="w-3.5 h-3.5 ml-1.5 text-blue-300" />
                    {new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`border-white/10 backdrop-blur-sm px-3 py-1 text-white ${
                      stats.totalStudents > 0 ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 ml-1.5" />
                    {stats.totalStudents > 0 ? 'در حال فعالیت' : 'در انتظار'}
                  </Badge>
                </div>
              </div>
              
              {/* نوتیفیکیشن و اطلاعات سریع */}
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                  <Bell className="w-5 h-5 text-white" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                    {toPersianNumbers(3)}
                  </span>
                </Button>
                <div className="hidden lg:block p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 border-l border-white/20">
                      <Users className="w-4 h-4 text-blue-300" />
                      <div className="flex flex-col">
                        <span className="text-xs text-white/60">شاگردان فعال</span>
                        <span className="text-sm font-semibold">{toPersianNumbers(stats.totalStudents)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3">
                      <Calendar className="w-4 h-4 text-emerald-300" />
                      <div className="flex flex-col">
                        <span className="text-xs text-white/60">جلسات امروز</span>
                        <span className="text-sm font-semibold">{toPersianNumbers(stats.totalSessions)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* کارت‌های آمار سریع */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Users className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80">تعداد شاگردان</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalStudents)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Calendar className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80">جلسات تمرینی</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalSessions)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <UtensilsCrossed className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80">برنامه های غذایی</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalMeals)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Pill className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80">مکمل های تجویز شده</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalSupplements)}</p>
                </div>
              </div>
            </div>

            {/* دکمه‌های اصلی */}
            <div className="flex flex-wrap gap-2">
              {[
                { title: "مدیریت شاگردان", icon: User2, href: '/students', color: "from-blue-600 to-blue-400" },
                { title: "مدیریت تمرین‌ها", icon: Dumbbell, href: '/exercises', color: "from-emerald-600 to-emerald-400" },
                { title: "برنامه‌های غذایی", icon: UtensilsCrossed, href: '/diet', color: "from-amber-600 to-amber-400" },
                { title: "مکمل‌ها", icon: Pill, href: '/supplements', color: "from-purple-600 to-purple-400" },
                { title: "گزارشات", icon: ChartBar, href: '/reports', color: "from-pink-600 to-pink-400" }
              ].map((item) => (
                <Button 
                  key={item.href}
                  variant="secondary" 
                  className="group relative overflow-hidden text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm border-white/10"
                  onClick={() => window.location.href = item.href}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r ${item.color} transition-opacity`} />
                  <span className="relative flex items-center gap-2">
                    {item.title}
                    <item.icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              ))}
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
