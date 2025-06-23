
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Calendar, Target, Award,
  Activity, Clock, Star, Zap
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface StudentProgressProps {
  studentExercises: any[];
  currentStudent: any;
}

const StudentProgress: React.FC<StudentProgressProps> = ({
  studentExercises,
  currentStudent
}) => {
  // Calculate progress metrics
  const totalDays = 6;
  const daysWithExercises = Array.from(new Set(studentExercises.map(ex => ex.day))).length;
  const completedExercises = studentExercises.filter(ex => ex.completed).length;
  const totalAssignedExercises = studentExercises.length;
  const weeklyCompletion = totalAssignedExercises > 0 ? Math.round((completedExercises / totalAssignedExercises) * 100) : 0;

  // Weekly progress data (mock data - would come from real tracking)
  const weeklyData = [
    { day: "شنبه", completed: 4, total: 5, percentage: 80 },
    { day: "یکشنبه", completed: 3, total: 4, percentage: 75 },
    { day: "دوشنبه", completed: 5, total: 6, percentage: 83 },
    { day: "سه‌شنبه", completed: 2, total: 4, percentage: 50 },
    { day: "چهارشنبه", completed: 6, total: 6, percentage: 100 },
    { day: "پنج‌شنبه", completed: 3, total: 5, percentage: 60 },
    { day: "جمعه", completed: 0, total: 0, percentage: 0 }
  ];

  // Progress by exercise type
  const progressByDay = Array.from({ length: 6 }, (_, i) => {
    const day = i + 1;
    const dayExercises = studentExercises.filter(ex => ex.day === day);
    const dayCompleted = dayExercises.filter(ex => ex.completed).length;
    return {
      day,
      label: `روز ${toPersianNumbers(day.toString())}`,
      total: dayExercises.length,
      completed: dayCompleted,
      percentage: dayExercises.length > 0 ? Math.round((dayCompleted / dayExercises.length) * 100) : 0
    };
  });

  return (
    <div className="space-y-8">
      {/* Overall Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers(weeklyCompletion.toString())}%
                </p>
                <p className="text-sm text-muted-foreground">تکمیل هفتگی</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers(daysWithExercises.toString())}/{toPersianNumbers(totalDays.toString())}
                </p>
                <p className="text-sm text-muted-foreground">روزهای فعال</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers(completedExercises.toString())}/{toPersianNumbers(totalAssignedExercises.toString())}
                </p>
                <p className="text-sm text-muted-foreground">تمرین تکمیل شده</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("12")}
                </p>
                <p className="text-sm text-muted-foreground">جلسه انجام شده</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Progress Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              پیشرفت روزانه
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {progressByDay.map((dayData, index) => (
              <motion.div
                key={dayData.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold text-sm">
                      {toPersianNumbers(dayData.day.toString())}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {dayData.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {toPersianNumbers(dayData.completed.toString())} از {toPersianNumbers(dayData.total.toString())} تمرین
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <Progress value={dayData.percentage} className="h-2" />
                  </div>
                  <Badge 
                    className={cn(
                      "text-white px-3 py-1",
                      dayData.percentage >= 80 ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                      dayData.percentage >= 60 ? "bg-gradient-to-r from-yellow-500 to-orange-500" :
                      dayData.percentage > 0 ? "bg-gradient-to-r from-orange-500 to-red-500" :
                      "bg-gradient-to-r from-gray-400 to-gray-500"
                    )}
                  >
                    {toPersianNumbers(dayData.percentage.toString())}%
                  </Badge>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              فعالیت هفتگی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                  <div 
                    className={cn(
                      "w-full h-16 rounded-lg flex items-end justify-center p-1 transition-all duration-300 hover:scale-105",
                      day.percentage >= 80 ? "bg-gradient-to-t from-green-500 to-emerald-400" :
                      day.percentage >= 60 ? "bg-gradient-to-t from-yellow-500 to-orange-400" :
                      day.percentage > 0 ? "bg-gradient-to-t from-orange-500 to-red-400" :
                      "bg-gradient-to-t from-gray-200 to-gray-300"
                    )}
                    style={{ height: `${Math.max(16, day.percentage * 0.8)}px` }}
                  >
                    <span className="text-xs text-white font-bold">
                      {day.percentage > 0 ? toPersianNumbers(day.percentage.toString()) + "%" : ""}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {toPersianNumbers(day.completed.toString())}/{toPersianNumbers(day.total.toString())}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentProgress;
