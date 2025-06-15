
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Target, Award, Zap, 
  Dumbbell, Apple, Pill, BarChart3 
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProgressData {
  weeklyProgress: number;
  mealCompletionRate: number;
  supplementCompletionRate: number;
  exerciseStreak: number;
  totalWorkouts: number;
  totalMeals: number;
  totalSupplements: number;
}

interface NewStudentProgressChartsProps {
  data: ProgressData;
}

export const NewStudentProgressCharts: React.FC<NewStudentProgressChartsProps> = ({ data }) => {
  const progressItems = [
    {
      title: "پیشرفت تمرینات هفتگی",
      current: data.totalWorkouts,
      target: 15,
      unit: "تمرین",
      progress: Math.min(100, Math.round((data.totalWorkouts / 15) * 100)),
      trend: "+۱۵%",
      color: "emerald",
      icon: Dumbbell,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "تکمیل برنامه غذایی",
      current: data.mealCompletionRate,
      target: 100,
      unit: "درصد",
      progress: data.mealCompletionRate,
      trend: "+۸%",
      color: "blue",
      icon: Apple,
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "مصرف مکمل‌ها",
      current: data.supplementCompletionRate,
      target: 100,
      unit: "درصد",
      progress: data.supplementCompletionRate,
      trend: "+۱۲%",
      color: "purple",
      icon: Pill,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "استریک تمرینی",
      current: data.exerciseStreak,
      target: 30,
      unit: "روز",
      progress: Math.min(100, Math.round((data.exerciseStreak / 30) * 100)),
      trend: "+۲۵%",
      color: "orange",
      icon: Award,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const getStatusMessage = (progress: number) => {
    if (progress >= 90) return { text: "عالی! ادامه دهید!", emoji: "🔥", color: "text-green-600" };
    if (progress >= 70) return { text: "خوب! به هدف نزدیک‌تر شوید", emoji: "💪", color: "text-blue-600" };
    if (progress >= 50) return { text: "متوسط، بیشتر تلاش کنید", emoji: "⚡", color: "text-yellow-600" };
    return { text: "شروع کنید و پیش بروید", emoji: "🎯", color: "text-gray-600" };
  };

  return (
    <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black">نمای کلی پیشرفت</span>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            هفته جاری
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8 space-y-8">
        {progressItems.map((item, index) => {
          const Icon = item.icon;
          const status = getStatusMessage(item.progress);
          
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {toPersianNumbers(item.current.toString())} از {toPersianNumbers(item.target.toString())} {item.unit}
                    </p>
                  </div>
                </div>
                
                <div className="text-left space-y-1">
                  <Badge variant="outline" className={`bg-${item.color}-50 text-${item.color}-700 border-${item.color}-200`}>
                    {item.trend}
                  </Badge>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">
                    {toPersianNumbers(item.progress.toString())}%
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-3">
                <Progress value={item.progress} className="h-3" />
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${status.color}`}>
                    {status.emoji} {status.text}
                  </span>
                  <Zap className="h-4 w-4 text-yellow-500" />
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-100/50 to-transparent rounded-full blur-2xl" />
            </motion.div>
          );
        })}
        
        {/* Overall Achievement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border border-indigo-200/50 dark:border-indigo-800/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
              <Target className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-xl text-indigo-900 dark:text-indigo-100 mb-2">
                عملکرد کلی این هفته
              </h4>
              <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
                شما در این هفته عملکرد فوق‌العاده‌ای داشته‌اید! با ادامه این روند می‌توانید به اهداف خود برسید.
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
