
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Users, 
  Dumbbell, 
  Utensils, 
  Trophy,
  TrendingUp, 
  CalendarRange, 
  Pill, 
  Clock,
  Scale,
  Target,
  Crown,
  Plus,
  ChevronLeft,
  TrendingDown
} from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DashboardStats {
  totalStudents: number;
  totalSessions: number;
  totalMeals: number;
  totalSupplements: number;
  studentsProgress: number;
  studentGrowth: number;
  sessionGrowth: number;
  mealGrowth: number;
  supplementGrowth: number;
  exerciseData: Array<{
    name: string;
    تمرینات: number;
    پیشرفت: number;
  }>;
}

const Index = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalSessions: 0,
    totalMeals: 0,
    totalSupplements: 0,
    studentsProgress: 0,
    studentGrowth: 0,
    sessionGrowth: 0,
    mealGrowth: 0,
    supplementGrowth: 0,
    exerciseData: []
  });

  useEffect(() => {
    const calculateStats = () => {
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const meals = JSON.parse(localStorage.getItem('meals') || '[]');
      const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');

      const totalSessions = students.reduce((acc: number, student: any) => {
        return acc + (student.sessionsPerWeek || 3) * 4;
      }, 0);

      const totalProgress = students.reduce((acc: number, student: any) => {
        return acc + (student.progress || 0);
      }, 0);
      const averageProgress = students.length ? Math.round(totalProgress / students.length) : 0;

      const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
      const exerciseData = weekDays.map(day => {
        const dayStudents = students.filter((s: any) => s.trainingDays?.includes(day));
        return {
          name: day,
          تمرینات: dayStudents.length,
          پیشرفت: dayStudents.reduce((acc: number, s: any) => acc + (s.progress || 0), 0) / 
                  (dayStudents.length || 1)
        };
      });

      const prevStudents = JSON.parse(localStorage.getItem('prevMonthStudents') || '[]');
      const prevMeals = JSON.parse(localStorage.getItem('prevMonthMeals') || '[]');
      const prevSupplements = JSON.parse(localStorage.getItem('prevMonthSupplements') || '[]');
      const prevSessions = prevStudents.length * 12;

      const calculateGrowth = (current: number, previous: number) => {
        if (!previous) return 0;
        return Math.round(((current - previous) / previous) * 100);
      };

      setStats({
        totalStudents: students.length,
        totalSessions,
        totalMeals: meals.length,
        totalSupplements: supplements.length,
        studentsProgress: averageProgress,
        studentGrowth: calculateGrowth(students.length, prevStudents.length),
        sessionGrowth: calculateGrowth(totalSessions, prevSessions),
        mealGrowth: calculateGrowth(meals.length, prevMeals.length),
        supplementGrowth: calculateGrowth(supplements.length, prevSupplements.length),
        exerciseData
      });
    };

    // اولین اجرای محاسبات
    calculateStats();

    // ایجاد یک MutationObserver برای نظارت بر تغییرات localStorage
    const observer = new MutationObserver(() => {
      calculateStats();
    });

    // نظارت بر تغییرات localStorage
    const storageHandler = () => {
      calculateStats();
    };

    window.addEventListener('storage', storageHandler);

    // اضافه کردن یک interval کوتاه برای اطمینان از به‌روزرسانی در صورت تغییر مستقیم localStorage
    const quickInterval = setInterval(calculateStats, 1000);

    return () => {
      window.removeEventListener('storage', storageHandler);
      observer.disconnect();
      clearInterval(quickInterval);
    };
  }, []);

  const quickActions = [
    { 
      name: "افزودن شاگرد", 
      description: "ثبت‌نام شاگرد جدید",
      icon: Users, 
      href: "/students", 
      gradient: "from-blue-500 via-blue-600 to-blue-700"
    },
    { 
      name: "ثبت تمرین", 
      description: "برنامه تمرینی جدید",
      icon: Dumbbell, 
      href: "/exercises", 
      gradient: "from-green-500 via-green-600 to-green-700"
    },
    { 
      name: "برنامه غذایی", 
      description: "تنظیم رژیم غذایی",
      icon: Utensils, 
      href: "/diet", 
      gradient: "from-orange-500 via-orange-600 to-orange-700"
    },
    { 
      name: "مکمل‌ها", 
      description: "مدیریت مکمل‌ها",
      icon: Pill, 
      href: "/supplements", 
      gradient: "from-purple-500 via-purple-600 to-purple-700"
    },
  ];

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
      progress: (stats.totalSessions / (stats.totalStudents * 16)) * 100
    },
    {
      title: "برنامه‌های فعال",
      description: `${toPersianNumbers(stats.totalMeals)} برنامه غذایی`,
      icon: Scale,
      gradient: "from-green-500 to-green-600",
      progress: (stats.totalMeals / stats.totalStudents) * 100
    },
  ];

  const renderGrowthBadge = (growth: number) => (
    <Badge 
      variant="secondary" 
      className={`rounded-lg ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}
    >
      {growth >= 0 ? <TrendingUp className="w-3 h-3 ml-1" /> : <TrendingDown className="w-3 h-3 ml-1" />}
      {toPersianNumbers(Math.abs(growth))}٪
    </Badge>
  );

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

      <div className="grid gap-4 md:grid-cols-4">
        {quickActions.map((action) => (
          <Button
            key={action.name}
            variant="ghost"
            className="group relative h-32 overflow-hidden rounded-xl border bg-card p-0 hover:border-primary/50"
            onClick={() => window.location.href = action.href}
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
            <div className="relative flex h-full flex-col items-center justify-center gap-4 transition-transform duration-300 group-hover:scale-105">
              <div className={`rounded-xl bg-gradient-to-br ${action.gradient} p-3 text-white shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <div className="font-semibold">{action.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {action.description}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>

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
                style={{ width: `${Math.min((stats.totalStudents / 50) * 100, 100)}%` }}
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
                style={{ width: `${Math.min((stats.totalSessions / (stats.totalStudents * 16)) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">برنامه‌های غذایی</CardTitle>
            <Utensils className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="mt-4 flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">
                {toPersianNumbers(stats.totalMeals)}
              </div>
              {renderGrowthBadge(stats.mealGrowth)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              برنامه فعال
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 group-hover:w-full"
                style={{ width: `${Math.min((stats.totalMeals / stats.totalStudents) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">مکمل‌های تجویز شده</CardTitle>
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
              مکمل فعال
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-primary/10">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 group-hover:w-full"
                style={{ width: `${Math.min((stats.totalSupplements / stats.totalStudents) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {achievements.map((achievement) => (
          <Card key={achievement.title} className="group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-xl bg-gradient-to-br ${achievement.gradient} p-3 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                  <achievement.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300"
                  style={{ width: `${Math.min(achievement.progress, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                تمرینات روزانه
              </CardTitle>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] transition-transform duration-300 group-hover:scale-[1.02]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.exerciseData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Bar
                    dataKey="تمرینات"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                روند پیشرفت
              </CardTitle>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] transition-transform duration-300 group-hover:scale-[1.02]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.exerciseData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Line
                    type="monotone"
                    dataKey="پیشرفت"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
