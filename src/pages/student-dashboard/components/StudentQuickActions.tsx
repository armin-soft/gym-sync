
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, Apple, Pill, MessageCircle, 
  Calendar, CheckCircle, ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toPersianNumbers } from "@/lib/utils/numbers";

const quickActions = [
  {
    title: "شروع تمرین امروز",
    description: "۵ حرکت در انتظار شماست",
    icon: Dumbbell,
    href: "/Student/Exercise-Movements",
    badge: "۵ حرکت",
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20",
    urgent: true
  },
  {
    title: "وعده غذایی بعدی",
    description: "ناهار - ۱ ساعت دیگر",
    icon: Apple,
    href: "/Student/Diet-Plan",
    badge: "ناهار",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    urgent: false
  },
  {
    title: "مکمل‌های امروز",
    description: "۲ مکمل مانده",
    icon: Pill,
    href: "/Student/Supplements-Vitamins",
    badge: "۲ مانده",
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
    urgent: false
  },
  {
    title: "پیام از مربی",
    description: "پیام جدید دریافت شده",
    icon: MessageCircle,
    href: "/Student/Support",
    badge: "جدید",
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
    urgent: true
  }
];

export const StudentQuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">اقدامات سریع</CardTitle>
              <p className="text-sm text-muted-foreground">کارهای امروز شما</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
            {toPersianNumbers("4")} کار
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`relative overflow-hidden cursor-pointer border-0 shadow-md bg-gradient-to-br ${action.bgGradient} hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="p-4" onClick={() => navigate(action.href)}>
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-md`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          {action.urgent && (
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          )}
                          <Badge 
                            variant="outline" 
                            className={`text-xs h-5 px-2 ${
                              action.urgent 
                                ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                                : 'bg-white/70 dark:bg-slate-800/70 border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            {action.badge}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm text-foreground leading-tight">
                          {action.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                      
                      {/* Action */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between h-8 text-xs hover:bg-white/50 dark:hover:bg-slate-800/50"
                      >
                        <span>مشاهده</span>
                        <ArrowLeft className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    {/* Decorative gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-3 pointer-events-none`} />
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
