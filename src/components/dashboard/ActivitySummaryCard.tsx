
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  LineChart, 
  UtensilsCrossed, 
  Pill, 
  Dumbbell, 
  Sparkles, 
  Activity,
  ArrowUpRight,
  TrendingUp,
  Star
} from "lucide-react";
import { DashboardStats } from "@/types/dashboard";

interface ActivitySummaryCardProps {
  stats: DashboardStats;
}

export const ActivitySummaryCard = ({ stats }: ActivitySummaryCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200/50 dark:border-slate-800/50 group">
      <CardHeader className="bg-gradient-to-r from-blue-50/70 to-slate-50/70 dark:from-blue-900/20 dark:to-slate-900/20 py-4 border-b border-slate-200/70 dark:border-slate-800/70">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/50 ring-1 ring-blue-500/20 shadow-sm">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          خلاصه فعالیت‌ها
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 opacity-5">
          <LineChart className="w-24 h-24" />
        </div>
        
        <div className="space-y-4 relative z-10">
          <ActivityItem
            icon={UtensilsCrossed}
            title="برنامه‌های غذایی"
            value={stats.totalMeals}
            unit="برنامه"
            growth={stats.mealGrowth}
            color="blue"
            completionRate={stats.mealCompletionRate}
          />
          
          <ActivityItem
            icon={Pill}
            title="مکمل‌های تجویز شده"
            value={stats.totalSupplements}
            unit="مورد"
            growth={stats.supplementGrowth}
            color="purple"
            completionRate={stats.supplementCompletionRate}
          />
          
          <ActivityItem
            icon={Dumbbell}
            title="نرخ تکمیل تمرین‌ها"
            value={stats.studentsProgress}
            unit="%"
            showProgress
            color="amber"
          />
          
          <ActivityOverview stats={stats} />
        </div>

        <CardFooter className="mt-4 pt-4 border-t dark:border-slate-800 px-0">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-colors duration-300" 
            asChild
          >
            <Link to="/Reports">
              <span>مشاهده گزارش کامل</span>
              <motion.div
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

// Activity item component
const ActivityItem = ({ 
  icon: Icon, 
  title, 
  value, 
  unit, 
  growth = 0, 
  color = "blue",
  showProgress = false,
  completionRate = 0
}: { 
  icon: React.ElementType;
  title: string;
  value: number;
  unit: string;
  growth?: number;
  color: "blue" | "purple" | "amber";
  showProgress?: boolean;
  completionRate?: number;
}) => {
  // Color mapping
  const colorMap = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      bgLight: "bg-blue-50 dark:bg-blue-950",
      gradient: "from-blue-500 to-blue-400"
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bgLight: "bg-purple-50 dark:bg-purple-950",
      gradient: "from-purple-500 to-purple-400"
    },
    amber: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800", 
      bgLight: "bg-amber-50 dark:bg-amber-950",
      gradient: "from-amber-500 to-amber-400"
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between group/item"
    >
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${colorMap[color].bg}`}>
          <Icon className={`w-4 h-4 ${colorMap[color].text}`} />
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      
      <div className="flex items-center">
        {showProgress ? (
          <div className="flex items-center">
            <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ml-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`h-full bg-gradient-to-r ${colorMap[color].gradient} rounded-full`}
              >
                {/* Animated shine effect */}
                <motion.div 
                  className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    left: ["-10%", "120%"],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
            <span className="text-xs font-medium">{toPersianNumbers(value)}٪</span>
          </div>
        ) : (
          <Badge 
            variant="outline" 
            className={`bg-${colorMap[color].bgLight} ${colorMap[color].text} border-${colorMap[color].border} flex items-center gap-1.5 group-hover/item:scale-105 transition-transform duration-300`}
          >
            <span>{toPersianNumbers(value)} {unit}</span>
            {growth !== 0 && (
              <motion.div 
                className="flex items-center"
                animate={growth > 0 ? {
                  translateY: [0, -1, 0]
                } : {
                  translateY: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                {growth > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <ArrowUpRight className="w-3 h-3 rotate-90" />
                )}
              </motion.div>
            )}
          </Badge>
        )}
      </div>
    </motion.div>
  );
};

// Activity overview component
const ActivityOverview = ({ stats }: { stats: DashboardStats }) => {
  // Calculate average completion rate
  const avgCompletionRate = Math.round((stats.mealCompletionRate + stats.supplementCompletionRate) / 2);
  const isHighPerforming = avgCompletionRate > 70;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="mt-6 p-3 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-800/50 dark:to-blue-900/10 border border-blue-100/50 dark:border-blue-800/30"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          خلاصه عملکرد
        </h4>
        
        <Badge variant="outline" className={`
          ${isHighPerforming ? 
            'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
            'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50'
          }
        `}>
          {isHighPerforming ? 'عالی' : 'متوسط'}
        </Badge>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between mb-1">
          <span>نرخ تکمیل برنامه‌ها</span>
          <span className="font-medium">{toPersianNumbers(avgCompletionRate)}٪</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${avgCompletionRate}%` }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`h-full rounded-full ${
              isHighPerforming ? 
                'bg-gradient-to-r from-emerald-500 to-green-400' : 
                'bg-gradient-to-r from-amber-500 to-yellow-400'
            }`}
          />
        </div>
      </div>
      
      {isHighPerforming && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400"
        >
          <Star className="w-3 h-3" fill="currentColor" />
          <span>عملکرد بسیار خوب! ادامه دهید</span>
        </motion.div>
      )}
    </motion.div>
  );
};
