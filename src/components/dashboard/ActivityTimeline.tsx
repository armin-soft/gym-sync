
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, Users, Dumbbell, UtensilsCrossed, Pill, CalendarCheck, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const ActivityTimeline = () => {
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  
  const timelineItems = [
    {
      id: 1,
      time: "۰۹:۳۰",
      title: "شاگرد جدید اضافه شد",
      description: "علی محمدی به عنوان شاگرد جدید ثبت شد",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      id: 2,
      time: "۱۱:۱۵",
      title: "برنامه غذایی جدید",
      description: "برنامه غذایی برای محمد رضایی ایجاد شد",
      icon: UtensilsCrossed,
      color: "bg-green-500",
    },
    {
      id: 3,
      time: "۱۳:۰۰",
      title: "مکمل جدید تجویز شد",
      description: "مکمل پروتئین برای ۳ شاگرد تجویز شد",
      icon: Pill,
      color: "bg-purple-500",
    },
    {
      id: 4,
      time: "۱۵:۳۰",
      title: "پیام جدید",
      description: "۲ پیام جدید از طرف شاگردان دریافت شد",
      icon: MessageSquare,
      color: "bg-amber-500",
    },
    {
      id: 5,
      time: "۱۷:۰۰",
      title: "برنامه تمرینی جدید",
      description: "برنامه تمرینی برای سارا احمدی ایجاد شد",
      icon: Dumbbell,
      color: "bg-indigo-500",
    },
    {
      id: 6,
      time: "۱۸:۳۰",
      title: "جلسه تمرین",
      description: "جلسه تمرین با رضا کریمی برگزار شد",
      icon: CalendarCheck,
      color: "bg-pink-500",
    },
  ];
  
  // Display fewer items if not showing full timeline
  const displayedItems = showFullTimeline ? timelineItems : timelineItems.slice(0, 3);

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-lg font-bold">فعالیت‌های اخیر</CardTitle>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="h-3 w-3" />
            امروز
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-3.5 top-1.5 bottom-1.5 w-0.5 bg-gray-200 dark:bg-gray-800 z-0"></div>
          
          {/* Timeline items */}
          <div className="space-y-6">
            {displayedItems.map((item, index) => (
              <TimelineItem 
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
          
          {timelineItems.length > 3 && (
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFullTimeline(!showFullTimeline)}
                className="text-xs"
              >
                {showFullTimeline ? "نمایش کمتر" : "نمایش بیشتر"}
              </Button>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

interface TimelineItemProps {
  item: {
    time: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
  };
  index: number;
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const { time, title, description, icon: Icon, color } = item;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex relative"
    >
      {/* Icon */}
      <div className={`z-10 rounded-full h-7 w-7 flex items-center justify-center ${color} shadow-md relative right-1`}>
        <Icon className="h-3.5 w-3.5 text-white" />
      </div>
      
      {/* Content */}
      <div className="flex-1 mr-4">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {toPersianNumbers(time)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </motion.div>
  );
};
