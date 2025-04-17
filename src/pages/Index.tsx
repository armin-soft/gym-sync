
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { Link } from "react-router-dom";

// Import our components
import { HeroSection } from "@/components/dashboard/HeroSection";
import { MainMenuGrid } from "@/components/dashboard/MainMenuGrid";
import { RecentStudentsCard } from "@/components/dashboard/RecentStudentsCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { ActivitySummaryCard } from "@/components/dashboard/ActivitySummaryCard";
import { QuickAction } from "@/components/dashboard/QuickAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Calendar, Plus, Users, Dumbbell, UtensilsCrossed, Pill } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  
  const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{"name":"","image":"/placeholder.svg"}');

  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        if (Array.isArray(parsedStudents)) {
          setStudents(parsedStudents);
        } else {
          console.error('Parsed students is not an array:', parsedStudents);
          setStudents([]);
        }
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    }
  }, []);

  const quickActions = [
    { title: "افزودن شاگرد جدید", icon: Plus, color: "from-blue-600 to-indigo-600", href: "/Students", description: "ثبت اطلاعات شاگرد جدید" },
    { title: "ثبت تمرین", icon: Dumbbell, color: "from-amber-600 to-orange-600", href: "/Exercise-Movements", description: "افزودن تمرین جدید" },
    { title: "برنامه غذایی", icon: UtensilsCrossed, color: "from-emerald-600 to-green-600", href: "/Diet-Plan", description: "تنظیم برنامه غذایی" },
    { title: "تجویز مکمل", icon: Pill, color: "from-purple-600 to-pink-600", href: "/Supplements-Vitamins", description: "افزودن مکمل و ویتامین" }
  ];

  // تقویم رویدادهای نمونه
  const upcomingEvents = [
    { id: 1, title: "جلسه با شاگرد جدید", date: "۱۴۰۴/۰۲/۰۱", time: "۱۰:۰۰", type: "meeting" },
    { id: 2, title: "ارزیابی پیشرفت آرمان", date: "۱۴۰۴/۰۲/۰۲", time: "۱۶:۳۰", type: "assessment" },
    { id: 3, title: "آپدیت برنامه تمرینی سارا", date: "۱۴۰۴/۰۲/۰۳", time: "۱۴:۰۰", type: "update" }
  ];

  return (
    <ScrollArea className="w-full h-full overflow-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full space-y-6 px-1 md:px-4 pb-8"
      >
        {/* Hero Section with Glass Effect */}
        <HeroSection 
          stats={stats} 
          currentTime={currentTime} 
          trainerProfile={trainerProfile} 
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickAction
              key={action.title}
              title={action.title}
              icon={action.icon}
              gradient={action.color}
              href={action.href}
              description={action.description}
              index={index}
            />
          ))}
        </div>

        {/* Main Menu Grid */}
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold mb-4">منوی اصلی</h2>
          <MainMenuGrid />
        </div>

        {/* Stats and Recent Students */}
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Students Card */}
            <RecentStudentsCard students={students} />
            
            <StatsCards stats={stats} />

            {/* Upcoming Events */}
            <Card className="overflow-hidden shadow-md">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-amber-100 dark:bg-amber-900/30">
                      <Calendar className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                    </div>
                    رویدادهای پیش رو
                  </CardTitle>
                  <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                    {toPersianNumbers(upcomingEvents.length)} رویداد
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y dark:divide-slate-800">
                  {upcomingEvents.map((event, index) => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full 
                          ${event.type === 'meeting' ? 'bg-blue-100 text-blue-600' : 
                            event.type === 'assessment' ? 'bg-purple-100 text-purple-600' : 
                            'bg-emerald-100 text-emerald-600'}`}>
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {event.date} - {event.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Link to="/Calendar" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                          <span className="hidden sm:inline">مشاهده</span>
                          <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="space-y-6"
          >
            {/* Progress Card */}
            <ProgressCard stats={stats} />

            {/* Activity Summary Card */}
            <ActivitySummaryCard stats={stats} />

            {/* Student Capacity Card */}
            <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
                    <Users className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  </div>
                  ظرفیت شاگردان
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">تعداد شاگردان فعلی</span>
                  <span className="text-lg font-bold">{toPersianNumbers(stats.totalStudents)}/{toPersianNumbers(stats.maxCapacity)}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stats.totalStudents / stats.maxCapacity) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className={`h-full rounded-full ${
                      stats.totalStudents / stats.maxCapacity > 0.8 
                        ? 'bg-gradient-to-r from-red-500 to-orange-400'
                        : stats.totalStudents / stats.maxCapacity > 0.5
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                          : 'bg-gradient-to-r from-green-500 to-emerald-400'
                    }`}
                  />
                </div>
                <div className="mt-4 text-sm">
                  {stats.totalStudents / stats.maxCapacity > 0.8 ? (
                    <p className="text-red-600 dark:text-red-400">ظرفیت شما تقریباً تکمیل شده است.</p>
                  ) : stats.totalStudents / stats.maxCapacity > 0.5 ? (
                    <p className="text-amber-600 dark:text-amber-400">بیش از نیمی از ظرفیت شما پر شده است.</p>
                  ) : (
                    <p className="text-green-600 dark:text-green-400">هنوز ظرفیت کافی برای شاگردان جدید دارید.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </ScrollArea>
  );
};

export default Index;
