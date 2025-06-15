
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Dumbbell, Target, Calendar, Award,
  TrendingUp, Activity, Timer, Zap
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

const statsData = [
  {
    title: "تمرینات انجام شده",
    value: "24",
    unit: "تمرین",
    icon: Dumbbell,
    progress: 75,
    change: "+۳",
    changeType: "increase" as const,
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20"
  },
  {
    title: "هدف ماهانه",
    value: "85",
    unit: "درصد",
    icon: Target,
    progress: 85,
    change: "+۱۲",
    changeType: "increase" as const,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
  },
  {
    title: "روزهای فعال",
    value: "18",
    unit: "روز",
    icon: Calendar,
    progress: 60,
    change: "+۵",
    changeType: "increase" as const,
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20"
  },
  {
    title: "امتیاز کلی",
    value: "2,450",
    unit: "امتیاز",
    icon: Award,
    progress: 92,
    change: "+۲۱۰",
    changeType: "increase" as const,
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const StudentStatsGrid = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${stat.bgGradient} hover:shadow-xl transition-all duration-300`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge 
                    variant={stat.changeType === 'increase' ? 'default' : 'secondary'}
                    className={`${
                      stat.changeType === 'increase' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <TrendingUp className="w-3 h-3 ml-1" />
                    {stat.change}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {toPersianNumbers(stat.value)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.unit}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">پیشرفت</span>
                    <span className="font-medium">{toPersianNumbers(stat.progress.toString())}%</span>
                  </div>
                  <Progress 
                    value={stat.progress} 
                    className="h-2 bg-white/50 dark:bg-slate-800/50"
                  />
                </div>
              </CardContent>
              
              {/* Decorative gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 pointer-events-none`} />
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
