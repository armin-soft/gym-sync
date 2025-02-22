
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

const exerciseData = [
  { name: "شنبه", تمرینات: 4, پیشرفت: 80 },
  { name: "یکشنبه", تمرینات: 6, پیشرفت: 82 },
  { name: "دوشنبه", تمرینات: 5, پیشرفت: 85 },
  { name: "سه‌شنبه", تمرینات: 8, پیشرفت: 87 },
  { name: "چهارشنبه", تمرینات: 7, پیشرفت: 90 },
  { name: "پنج‌شنبه", تمرینات: 9, پیشرفت: 92 },
  { name: "جمعه", تمرینات: 3, پیشرفت: 95 },
];

const achievements = [
  {
    title: "شاگرد برتر",
    description: "علی محمدی با ۲۵٪ پیشرفت",
    icon: Crown,
    color: "text-yellow-500",
  },
  {
    title: "بیشترین تمرین",
    description: "۴۲ جلسه در این ماه",
    icon: Target,
    color: "text-blue-500",
  },
  {
    title: "کاهش وزن",
    description: "میانگین ۵ کیلو در ماه",
    icon: Scale,
    color: "text-green-500",
  },
];

const Index = () => {
  const stats = [
    {
      title: "شاگردان فعال",
      value: "۱۲",
      icon: Users,
      change: "+۲۰٪",
      trend: "up",
      description: "نسبت به ماه گذشته",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "جلسات تمرینی",
      value: "۴۲",
      icon: Dumbbell,
      change: "+۱۵٪",
      trend: "up",
      description: "در این هفته",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "برنامه‌های غذایی",
      value: "۸",
      icon: Utensils,
      change: "+۱۰٪",
      trend: "up",
      description: "برنامه فعال",
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "میانگین پیشرفت",
      value: "۸۲٪",
      icon: Trophy,
      change: "+۵٪",
      trend: "up",
      description: "در این ماه",
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

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

  return (
    <div className="container mx-auto py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">سلام 👋</h1>
            <p className="text-muted-foreground mt-2">
              به داشبورد مدیریت باشگاه خوش آمدید
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-medium">
              <Clock className="w-3 h-3 ml-1" />
              ۱۴۰۲/۱۲/۲۵
            </Badge>
            <Badge variant="secondary" className="font-medium">
              <Activity className="w-3 h-3 ml-1" />
              فعال
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
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value}
              </div>
              <div className="flex items-center text-xs mt-1">
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground mr-1">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
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
                <BarChart data={exerciseData}>
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
                <LineChart data={exerciseData}>
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
