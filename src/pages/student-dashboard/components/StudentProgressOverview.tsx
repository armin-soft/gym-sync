
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Calendar } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const StudentProgressOverview = () => {
  const progressData = [
    {
      title: "هدف وزن",
      current: 75,
      target: 70,
      unit: "کیلوگرم",
      progress: 83,
      timeLeft: "۲ ماه",
      status: "در حال پیشرفت"
    },
    {
      title: "درصد چربی",
      current: 18,
      target: 15,
      unit: "درصد",
      progress: 67,
      timeLeft: "۳ ماه",
      status: "روبه بهبود"
    },
    {
      title: "قدرت بدنی",
      current: 120,
      target: 150,
      unit: "کیلوگرم",
      progress: 80,
      timeLeft: "۱ ماه",
      status: "عالی"
    }
  ];

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">نمای کلی پیشرفت</CardTitle>
            <p className="text-sm text-muted-foreground">وضعیت فعلی اهداف شما</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {progressData.map((item, index) => (
          <div key={item.title} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{item.title}</span>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  item.status === "عالی" 
                    ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                    : item.status === "در حال پیشرفت"
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                    : "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                }`}
              >
                {item.status}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                فعلی: <span className="font-medium text-foreground">{toPersianNumbers(item.current.toString())} {item.unit}</span>
              </span>
              <span className="text-muted-foreground">
                هدف: <span className="font-medium text-foreground">{toPersianNumbers(item.target.toString())} {item.unit}</span>
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">پیشرفت</span>
                <span className="font-medium">{toPersianNumbers(item.progress.toString())}%</span>
              </div>
              <Progress value={item.progress} className="h-2" />
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>زمان باقی‌مانده: {item.timeLeft}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
