
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Dumbbell, Utensils, Trophy, TrendingUp, CalendarRange, Pill, Activity } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const exerciseData = [
  { name: "شنبه", تمرینات: 4 },
  { name: "یکشنبه", تمرینات: 6 },
  { name: "دوشنبه", تمرینات: 5 },
  { name: "سه‌شنبه", تمرینات: 8 },
  { name: "چهارشنبه", تمرینات: 7 },
  { name: "پنج‌شنبه", تمرینات: 9 },
  { name: "جمعه", تمرینات: 3 },
];

const progressData = [
  { name: "هفته ۱", پیشرفت: 65 },
  { name: "هفته ۲", پیشرفت: 70 },
  { name: "هفته ۳", پیشرفت: 75 },
  { name: "هفته ۴", پیشرفت: 82 },
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
    },
    {
      title: "جلسات تمرینی",
      value: "۴۲",
      icon: Dumbbell,
      change: "+۱۵٪",
      trend: "up",
      description: "در این هفته",
    },
    {
      title: "برنامه‌های غذایی",
      value: "۸",
      icon: Utensils,
      change: "+۱۰٪",
      trend: "up",
      description: "برنامه فعال",
    },
    {
      title: "میانگین پیشرفت",
      value: "۸۲٪",
      icon: Trophy,
      change: "+۵٪",
      trend: "up",
      description: "در این ماه",
    },
  ];

  const quickActions = [
    { name: "افزودن شاگرد", icon: Users, href: "/students", color: "bg-blue-500" },
    { name: "ثبت تمرین", icon: Dumbbell, href: "/exercises", color: "bg-green-500" },
    { name: "برنامه غذایی", icon: Utensils, href: "/diet", color: "bg-orange-500" },
    { name: "مکمل‌ها", icon: Pill, href: "/supplements", color: "bg-purple-500" },
  ];

  return (
    <div className="container mx-auto py-6 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">داشبورد</h1>
        <p className="text-muted-foreground">
          خوش آمدید! در این بخش می‌توانید خلاصه‌ای از وضعیت باشگاه را مشاهده کنید
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        {quickActions.map((action) => (
          <Button
            key={action.name}
            variant="outline"
            className="h-24 flex-col gap-2 hover:bg-muted/50 transition-colors"
            onClick={() => window.location.href = action.href}
          >
            <div className={`${action.color} p-2 rounded-lg text-white`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span>{action.name}</span>
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
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
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={exerciseData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar
                    dataKey="تمرینات"
                    fill="#4f46e5"
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
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="پیشرفت"
                    stroke="#22c55e"
                    strokeWidth={2}
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
