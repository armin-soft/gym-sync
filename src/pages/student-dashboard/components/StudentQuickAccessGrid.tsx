
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
  Calendar,
  Target,
  ArrowLeft
} from "lucide-react";

const quickAccessItems = [
  {
    icon: Dumbbell,
    title: "برنامه تمرینی امروز",
    description: "مشاهده و شروع تمرین‌های برنامه‌ریزی شده برای امروز",
    badge: "۳ تمرین",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100/50",
    delay: 0
  },
  {
    icon: Apple,
    title: "برنامه غذایی",
    description: "مشاهده وعده‌های غذایی و ثبت مصرف",
    badge: "۵ وعده",
    color: "from-sky-500 to-sky-600",
    bgColor: "from-sky-50 to-sky-100/50",
    delay: 0.1
  },
  {
    icon: Pill,
    title: "مکمل‌های روزانه",
    description: "مشاهده و ثبت مصرف مکمل‌ها",
    badge: "۴ مکمل",
    color: "from-emerald-600 to-sky-600",
    bgColor: "from-emerald-50 to-sky-100/50",
    delay: 0.2
  },
  {
    icon: Calendar,
    title: "برنامه هفتگی",
    description: "نمای کلی برنامه تمرینی و غذایی هفته",
    color: "from-sky-600 to-emerald-600",
    bgColor: "from-sky-50 to-emerald-100/50",
    delay: 0.3
  },
  {
    icon: BarChart3,
    title: "گزارشات پیشرفت",
    description: "مشاهده آمار و نمودارهای پیشرفت",
    color: "from-emerald-500 to-sky-500",
    bgColor: "from-emerald-50 to-sky-100/50",
    delay: 0.4
  },
  {
    icon: MessageSquare,
    title: "ارتباط با مربی",
    description: "چت و دریافت راهنمایی از مربی",
    badge: "جدید",
    color: "from-sky-500 to-emerald-500",
    bgColor: "from-sky-50 to-emerald-100/50",
    delay: 0.5
  }
];

export const StudentQuickAccessGrid: React.FC = () => {
  return (
    <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          دسترسی سریع
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`group relative overflow-hidden bg-gradient-to-br ${item.bgColor} border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full`}>
                  <CardContent className="p-6">
                    {/* هدر */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}
                        whileHover={{ rotate: 8, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs font-medium">
                          {item.badge}
                        </Badge>
                      )}
                    </div>

                    {/* محتوا */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* دکمه */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full group-hover:bg-primary/10 transition-colors"
                      >
                        مشاهده
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </div>

                    {/* تأثیر نور */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300"
                      whileHover={{ opacity: 1 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
