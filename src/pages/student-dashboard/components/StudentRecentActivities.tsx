
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Dumbbell, Apple, Pill, MessageCircle, 
  CheckCircle, Clock, Calendar
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

const activities = [
  {
    id: 1,
    type: "exercise",
    title: "تکمیل تمرین سینه و بازو",
    description: "۸ حرکت در ۴۵ دقیقه",
    time: "۲ ساعت پیش",
    icon: Dumbbell,
    status: "completed",
    color: "emerald"
  },
  {
    id: 2,
    type: "meal",
    title: "ثبت وعده ناهار",
    description: "سالاد سبزیجات و مرغ گریل",
    time: "۴ ساعت پیش",
    icon: Apple,
    status: "completed",
    color: "sky"
  },
  {
    id: 3,
    type: "supplement",
    title: "مصرف پروتئین",
    description: "۳۰ گرم پروتئین وی",
    time: "۶ ساعت پیش",
    icon: Pill,
    status: "completed",
    color: "purple"
  },
  {
    id: 4,
    type: "message",
    title: "پیام از مربی",
    description: "راهنمایی برای تمرین فردا",
    time: "۸ ساعت پیش",
    icon: MessageCircle,
    status: "new",
    color: "orange"
  },
  {
    id: 5,
    type: "exercise",
    title: "تمرین کاردیو",
    description: "۳۰ دقیقه دویدن",
    time: "دیروز",
    icon: Dumbbell,
    status: "completed",
    color: "emerald"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircle className="w-3 h-3 ml-1" />
          تکمیل شده
        </Badge>
      );
    case "new":
      return (
        <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
          جدید
        </Badge>
      );
    default:
      return null;
  }
};

export const StudentRecentActivities = () => {
  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Clock className="h-4 w-4 text-white" />
          </div>
          فعالیت‌های اخیر
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${activity.color}-500 to-${activity.color}-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </h3>
                    {getStatusBadge(activity.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-center text-sm text-muted-foreground">
            مشاهده همه فعالیت‌ها در صفحه گزارشات
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};
