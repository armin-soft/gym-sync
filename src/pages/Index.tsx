
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
  Crown
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
    exerciseData: []
  });

  useEffect(() => {
    // خواندن اطلاعات از localStorage
    const loadStats = () => {
      // دریافت اطلاعات شاگردان
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      
      // دریافت برنامه‌های غذایی
      const meals = JSON.parse(localStorage.getItem('meals') || '[]');
      
      // دریافت مکمل‌ها
      const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');

      // محاسبه داده‌های نمودار تمرینات هفتگی
      const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
      const exerciseData = weekDays.map(day => ({
        name: day,
        تمرینات: Math.floor(Math.random() * (students.length * 2)) + students.length,
        پیشرفت: Math.floor(Math.random() * 20) + 80
      }));

      setStats({
        totalStudents: students.length,
        totalSessions: students.length * 3, // میانگین 3 جلسه برای هر شاگرد
        totalMeals: meals.length,
        totalSupplements: supplements.length,
        studentsProgress: 85,
        exerciseData
      });
    };

    loadStats();
  }, []);

  const quickActions = [
    { 
      name: "افزودن شاگرد", 
      description: "ثبت‌نام شاگرد جدید",
      icon: Users, 
      href: "/students", 
      color: "bg-gradient-to-br from-blue-500 to-blue-600" 
    },
    { 
      name: "ثبت تمرین", 
      description: "برنامه تمرینی جدید",
      icon: Dumbbell, 
      href: "/exercises", 
      color: "bg-gradient-to-br from-green-500 to-green-600" 
    },
    { 
      name: "برنامه غذایی", 
      description: "تنظیم رژیم غذایی",
      icon: Utensils, 
      href: "/diet", 
      color: "bg-gradient-to-br from-orange-500 to-orange-600" 
    },
    { 
      name: "مکمل‌ها", 
      description: "مدیریت مکمل‌ها",
      icon: Pill, 
      href: "/supplements", 
      color: "bg-gradient-to-br from-purple-500 to-purple-600" 
    },
  ];

  const achievements = [
    {
      title: "شاگرد برتر",
      description: stats.totalStudents > 0 ? `${toPersianNumbers(stats.studentsProgress)}٪ پیشرفت` : "در انتظار ثبت شاگرد",
      icon: Crown,
      color: "text-yellow-500",
    },
    {
      title: "تعداد جلسات",
      description: `${toPersianNumbers(stats.totalSessions)} جلسه در این ماه`,
      icon: Target,
      color: "text-blue-500",
    },
    {
      title: "برنامه‌های فعال",
      description: `${toPersianNumbers(stats.totalMeals)} برنامه غذایی`,
      icon: Scale,
      color: "text-green-500",
    },
  ];

  return (
    <div className="container mx-auto py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">داشبورد مدیریت</h1>
            <p className="text-muted-foreground mt-2">
              خلاصه وضعیت سیستم مدیریت برنامه تمرینی
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-medium">
              <Clock className="w-3 h-3 ml-1" />
              امروز
            </Badge>
            <Badge variant="secondary" className="font-medium">
              <Activity className="w-3 h-3 ml-1" />
              {stats.totalStudents > 0 ? 'فعال' : 'در انتظار'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        {quickActions.map((action) => (
          <Button
            key={action.name}
            variant="ghost"
            className="h-32 flex flex-col items-center justify-center gap-4 hover:bg-muted/50 transition-all hover:scale-105"
            onClick={() => window.location.href = action.href}
          >
            <div className={`${action.color} p-3 rounded-xl text-white shadow-lg`}>
              <action.icon className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-semibold">{action.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {action.description}
              </div>
            </div>
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">تعداد شاگردان</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toPersianNumbers(stats.totalStudents)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              شاگرد فعال در سیستم
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">جلسات تمرینی</CardTitle>
            <Dumbbell className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toPersianNumbers(stats.totalSessions)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              جلسه در این ماه
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">برنامه‌های غذایی</CardTitle>
            <Utensils className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toPersianNumbers(stats.totalMeals)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              برنامه فعال
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">مکمل‌های تجویز شده</CardTitle>
            <Pill className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toPersianNumbers(stats.totalSupplements)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              مکمل فعال
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <div className="grid gap-4 md:grid-cols-3">
        {achievements.map((achievement) => (
          <Card key={achievement.title} className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-full p-3 bg-muted ${achievement.color}`}>
                  <achievement.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                تمرینات روزانه
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
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

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                روند پیشرفت
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
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
