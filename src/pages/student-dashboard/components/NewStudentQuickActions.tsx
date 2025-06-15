import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Apple, 
  Pill, 
  BarChart3, 
  MessageSquare, 
  User,
  ArrowLeft
} from "lucide-react";

const ActionCard = React.memo(({ icon: Icon, title, description, badge, color, onClick, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card className="group relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-2.5 rounded-lg ${color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {description}
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full group-hover:bg-primary/10 transition-colors"
          onClick={onClick}
        >
          دسترسی سریع
          <ArrowLeft className="w-4 h-4 mr-2" />
        </Button>
      </CardContent>
    </Card>
  </motion.div>
));

export const NewStudentQuickActions: React.FC = React.memo(() => {
  const quickActions = [
    {
      icon: Dumbbell,
      title: "برنامه تمرینی",
      description: "مشاهده و پیگیری تمرین‌های روزانه شما",
      badge: "فعال",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      delay: 0,
      onClick: () => {}
    },
    {
      icon: Apple,
      title: "برنامه غذایی",
      description: "رژیم و وعده‌های غذایی تنظیم شده",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      delay: 0.1,
      onClick: () => {}
    },
    {
      icon: Pill,
      title: "مکمل‌ها",
      description: "مکمل‌ها و ویتامین‌های تجویز شده",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      delay: 0.2,
      onClick: () => {}
    },
    {
      icon: BarChart3,
      title: "گزارشات",
      description: "آمار پیشرفت و نمودارهای عملکرد",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      delay: 0.3,
      onClick: () => {}
    },
    {
      icon: MessageSquare,
      title: "پشتیبانی",
      description: "ارتباط با مربی و دریافت راهنمایی",
      color: "bg-gradient-to-r from-pink-500 to-pink-600",
      delay: 0.4,
      onClick: () => {}
    },
    {
      icon: User,
      title: "پروفایل",
      description: "مدیریت اطلاعات شخصی و تنظیمات",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      delay: 0.5,
      onClick: () => {}
    }
  ];

  return (
    <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          دسترسی سریع
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <ActionCard key={index} {...action} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

NewStudentQuickActions.displayName = "NewStudentQuickActions";
