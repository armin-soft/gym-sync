
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, TrendingUp, Calendar, Target, Download, 
  Activity, Apple, Pill, Award, Clock, User
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

const weeklyStats = [
  { day: 'شنبه', exercise: 85, diet: 90, supplements: 100 },
  { day: 'یکشنبه', exercise: 95, diet: 80, supplements: 85 },
  { day: 'دوشنبه', exercise: 75, diet: 85, supplements: 90 },
  { day: 'سه‌شنبه', exercise: 90, diet: 95, supplements: 80 },
  { day: 'چهارشنبه', exercise: 80, diet: 75, supplements: 95 },
  { day: 'پنج‌شنبه', exercise: 85, diet: 90, supplements: 85 },
  { day: 'جمعه', exercise: 0, diet: 70, supplements: 75 }
];

const monthlyProgress = [
  { 
    category: 'تمرینات',
    current: 128,
    target: 150,
    progress: 85,
    trend: '+12%',
    color: 'emerald',
    icon: Activity
  },
  { 
    category: 'تغذیه',
    current: 92,
    target: 100,
    progress: 92,
    trend: '+8%',
    color: 'sky',
    icon: Apple
  },
  { 
    category: 'مکمل‌ها',
    current: 78,
    target: 90,
    progress: 87,
    trend: '+15%',
    color: 'purple',
    icon: Pill
  },
  { 
    category: 'اهداف',
    current: 8,
    target: 10,
    progress: 80,
    trend: '+25%',
    color: 'orange',
    icon: Target
  }
];

const achievements = [
  {
    id: 1,
    title: "ماراتن تمرینی",
    description: "۳۰ روز متوالی تمرین",
    date: "۱۴۰۳/۰۹/۱۵",
    badge: "طلایی",
    color: "yellow"
  },
  {
    id: 2,
    title: "تغذیه منظم",
    description: "۲۱ روز رعایت کامل رژیم",
    date: "۱۴۰۳/۰۹/۱۰",
    badge: "نقره‌ای",
    color: "gray"
  },
  {
    id: 3,
    title: "مصرف مداوم مکمل",
    description: "۱۴ روز مصرف منظم",
    date: "۱۴۰۳/۰۹/۰۵",
    badge: "برنزی",
    color: "orange"
  }
];

const StudentReports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const overallProgress = Math.round(
    monthlyProgress.reduce((sum, item) => sum + item.progress, 0) / monthlyProgress.length
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-2">
              گزارشات و تحلیل‌ها
            </h1>
            <p className="text-lg text-muted-foreground">
              آمار پیشرفت و تحلیل عملکرد
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-left">
              <div className="text-3xl font-bold text-emerald-600">
                {toPersianNumbers(overallProgress.toString())}%
              </div>
              <p className="text-sm text-muted-foreground">عملکرد کلی</p>
            </div>
            <Button 
              className="bg-gradient-to-l from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white"
            >
              <Download className="w-4 h-4 ml-2" />
              دانلود گزارش
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>پیشرفت کلی ماه جاری</span>
            <span>{toPersianNumbers(overallProgress.toString())}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center gap-4">
        <span className="font-medium">بازه زمانی:</span>
        <div className="flex gap-2">
          {[
            { id: 'week', label: 'هفته' },
            { id: 'month', label: 'ماه' },
            { id: 'quarter', label: 'فصل' }
          ].map(period => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.id)}
              className={selectedPeriod === period.id ? 'bg-gradient-to-l from-emerald-600 to-sky-600' : ''}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="overview">نمای کلی</TabsTrigger>
          <TabsTrigger value="progress">پیشرفت</TabsTrigger>
          <TabsTrigger value="achievements">دستاوردها</TabsTrigger>
          <TabsTrigger value="detailed">جزئیات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Monthly Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthlyProgress.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge className={`bg-${item.color}-100 text-${item.color}-700 dark:bg-${item.color}-900/30 dark:text-${item.color}-300`}>
                          {item.trend}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.category}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {toPersianNumbers(item.current.toString())} از {toPersianNumbers(item.target.toString())}
                            </span>
                            <span className="font-medium">
                              {toPersianNumbers(item.progress.toString())}%
                            </span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Weekly Chart */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                عملکرد هفتگی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyStats.map((stat, index) => (
                  <motion.div
                    key={stat.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium w-20">{stat.day}</span>
                      <div className="flex gap-6 text-xs">
                        <span>تمرین: {toPersianNumbers(stat.exercise.toString())}%</span>
                        <span>تغذیه: {toPersianNumbers(stat.diet.toString())}%</span>
                        <span>مکمل: {toPersianNumbers(stat.supplements.toString())}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Progress value={stat.exercise} className="h-2" />
                      <Progress value={stat.diet} className="h-2" />
                      <Progress value={stat.supplements} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                نمودار پیشرفت
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>نمودار پیشرفت تفصیلی در حال توسعه است...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
                دستاوردها و جوایز
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-l from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${achievement.color}-400 to-${achievement.color}-600 flex items-center justify-center shadow-lg`}>
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {toPersianNumbers(achievement.date)}
                        </span>
                      </div>
                    </div>
                    
                    <Badge 
                      className={`bg-${achievement.color}-100 text-${achievement.color}-700 dark:bg-${achievement.color}-900/30 dark:text-${achievement.color}-300`}
                    >
                      {achievement.badge}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                گزارش تفصیلی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>گزارش تفصیلی فردی در حال توسعه است...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StudentReports;
