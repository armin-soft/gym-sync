
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Play, Plus, BarChart3, MessageCircle, User, Camera,
  Dumbbell, Apple, Pill, BookOpen, Settings, Timer
} from "lucide-react";

const quickActions = [
  {
    title: "شروع تمرین امروز",
    description: "برنامه تمرینی امروز را آغاز کنید",
    icon: Play,
    href: "/Student/Exercise-Movements",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    badge: "فوری",
    priority: "high"
  },
  {
    title: "ثبت وعده غذایی",
    description: "وعده غذایی مصرف شده را ثبت کنید",
    icon: Plus,
    href: "/Student/Diet-Plan",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    badge: "ناهار",
    priority: "medium"
  },
  {
    title: "مصرف مکمل",
    description: "مکمل‌های روزانه را بررسی کنید",
    icon: Pill,
    href: "/Student/Supplements-Vitamins",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    badge: "۲ مکمل",
    priority: "medium"
  },
  {
    title: "گزارش پیشرفت",
    description: "نمودار پیشرفت و آمار شخصی",
    icon: BarChart3,
    href: "/Student/Report",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    priority: "low"
  },
  {
    title: "پیام به مربی",
    description: "ارتباط مستقیم با مربی شخصی",
    icon: MessageCircle,
    href: "/Student/Support",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    badge: "۱ پیام جدید",
    priority: "medium"
  },
  {
    title: "ویرایش پروفایل",
    description: "به‌روزرسانی اطلاعات شخصی",
    icon: User,
    href: "/Student/Profile",
    gradient: "from-teal-500 via-cyan-500 to-sky-500",
    priority: "low"
  }
];

export const NewStudentQuickActions: React.FC = () => {
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30';
      case 'medium': return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30';
      default: return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/30';
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mb-8 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <CardTitle className="flex items-center gap-4 text-2xl font-black">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          دسترسی سریع
          <Badge className="bg-white/20 text-white border-white/30">
            <Timer className="w-3 h-3 ml-1" />
            ۶ عملیات
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => navigate(action.href)}
                  className={`w-full h-auto p-6 justify-start hover:bg-transparent group transition-all duration-300 border-2 ${getPriorityColor(action.priority)}`}
                >
                  <div className="flex items-start gap-5 w-full">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 text-right space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                          {action.title}
                        </h3>
                        {action.badge && (
                          <Badge variant="secondary" className="text-xs font-medium">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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
