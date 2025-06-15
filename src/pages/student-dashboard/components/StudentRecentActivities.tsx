
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import { 
  Activity, Dumbbell, Apple, Pill, 
  MessageCircle, Award, Clock
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

const activities = [
  {
    type: "exercise",
    title: "تمرین سینه و دوسر",
    description: "۸ حرکت تکمیل شد",
    time: "۲ ساعت پیش",
    icon: Dumbbell,
    color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
  },
  {
    type: "diet",
    title: "صبحانه مصرف شد",
    description: "۴۵۰ کالری دریافت شد",
    time: "۴ ساعت پیش",
    icon: Apple,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    type: "supplement",
    title: "مکمل پروتئین",
    description: "۳۰ گرم پروتئین دریافت شد",
    time: "۵ ساعت پیش",
    icon: Pill,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400"
  },
  {
    type: "message",
    title: "پیام از مربی",
    description: "تبریک بابت پیشرفت عالی",
    time: "۱ روز پیش",
    icon: MessageCircle,
    color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
  },
  {
    type: "achievement",
    title: "دستاورد جدید",
    description: "۳۰ روز تمرین مداوم",
    time: "۲ روز پیش",
    icon: Award,
    color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
  }
];

export const StudentRecentActivities = () => {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">فعالیت‌های اخیر</CardTitle>
            <p className="text-sm text-muted-foreground">آخرین اتفاقات حساب شما</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            مشاهده همه فعالیت‌ها
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
