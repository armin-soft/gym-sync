
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Dumbbell, Apple, Pill, BarChart3, MessageCircle, 
  User, Play, BookOpen, Camera, Plus
} from "lucide-react";

const quickActions = [
  {
    title: "شروع تمرین",
    description: "تمرین امروز را آغاز کنید",
    icon: Play,
    href: "/Student/Exercise-Movements",
    gradient: "from-emerald-500 to-green-600",
    badge: "۳ تمرین باقی‌مانده"
  },
  {
    title: "ثبت وعده غذایی",
    description: "وعده‌ای که مصرف کردید را ثبت کنید",
    icon: Plus,
    href: "/Student/Diet-Plan",
    gradient: "from-sky-500 to-blue-600",
    badge: "ناهار"
  },
  {
    title: "مصرف مکمل",
    description: "مکمل‌های روزانه را چک کنید",
    icon: Pill,
    href: "/Student/Supplements-Vitamins",
    gradient: "from-purple-500 to-violet-600",
    badge: "۲ مکمل"
  },
  {
    title: "گزارش پیشرفت",
    description: "وضعیت پیشرفت خود را ببینید",
    icon: BarChart3,
    href: "/Student/Report",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "ارتباط با مربی",
    description: "پیام جدید یا سوال داشته باشید",
    icon: MessageCircle,
    href: "/Student/Support",
    gradient: "from-pink-500 to-rose-600",
    badge: "۱ پیام"
  },
  {
    title: "ویرایش پروفایل",
    description: "اطلاعات شخصی خود را به‌روزرسانی کنید",
    icon: User,
    href: "/Student/Profile",
    gradient: "from-teal-500 to-cyan-600"
  }
];

export const StudentQuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          دسترسی سریع
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => navigate(action.href)}
                  className="w-full h-auto p-4 justify-start hover:bg-gray-50 dark:hover:bg-gray-800/50 group transition-all duration-300"
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1 text-right space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {action.title}
                        </h3>
                        {action.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
