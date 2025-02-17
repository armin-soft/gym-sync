
import { Card } from "@/components/ui/card";
import { Users, Dumbbell, Utensils, Pill } from "lucide-react";

const Index = () => {
  const stats = [
    {
      title: "شاگردان",
      value: "۱۲",
      icon: Users,
      change: "+۲۰٪",
      trend: "up",
    },
    {
      title: "تمرین‌ها",
      value: "۲۴",
      icon: Dumbbell,
      change: "+۱۵٪",
      trend: "up",
    },
    {
      title: "برنامه‌های غذایی",
      value: "۸",
      icon: Utensils,
      change: "+۱۰٪",
      trend: "up",
    },
    {
      title: "مکمل‌ها",
      value: "۱۶",
      icon: Pill,
      change: "+۵٪",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">داشبورد</h1>
        <p className="text-muted-foreground">
          خوش آمدید به سیستم مدیریت برنامه تمرینی باشگاه بدنسازی فیکس
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 card-hover">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <stat.icon className="h-5 w-5 text-muted-foreground ml-4" />
                <div>
                  <p className="text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
              <p className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
