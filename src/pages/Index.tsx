
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Clock,
  User2,
  UtensilsCrossed,
  Pill,
  Crown,
  Users,
  ChartBar,
  Sun,
  ArrowRight,
  Dumbbell,
  Database,
  HelpCircle,
  TrendingUp,
  BarChart3,
  Sparkles,
  LineChart
} from "lucide-react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { motion } from "framer-motion";

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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const dashboardItems = [
    { 
      title: "پروفایل مربی", 
      icon: User2, 
      href: '/Coach-Profile', 
      color: "from-blue-600 to-blue-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    { 
      title: "شاگردان", 
      icon: Users, 
      href: '/Students', 
      color: "from-emerald-600 to-emerald-400",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
    },
    { 
      title: "حرکات تمرینی", 
      icon: Dumbbell, 
      href: '/Exercise-Movements', 
      color: "from-amber-600 to-amber-400",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20"
    },
    { 
      title: "برنامه های غذایی", 
      icon: UtensilsCrossed, 
      href: '/Diet-Plan', 
      color: "from-purple-600 to-purple-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
    },
    { 
      title: "مکمل و ویتامین", 
      icon: Pill, 
      href: '/Supplements-Vitamins', 
      color: "from-pink-600 to-pink-400",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
    },
    { 
      title: "گزارشات", 
      icon: ChartBar, 
      href: '/Reports', 
      color: "from-indigo-600 to-indigo-400",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
    },
    { 
      title: "پشتیبان‌گیری و بازیابی", 
      icon: Database, 
      href: '/Backup-Restore', 
      color: "from-cyan-600 to-cyan-400",
      bgColor: "bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20"
    },
    { 
      title: "درباره", 
      icon: HelpCircle, 
      href: '/About', 
      color: "from-gray-600 to-gray-400",
      bgColor: "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20"
    }
  ];

  const quickStats = [
    { 
      title: "شاگردان", 
      icon: Users, 
      value: stats.totalStudents, 
      growth: stats.studentGrowth,
      color: "bg-blue-500/20",
      textColor: "text-blue-400"
    },
    { 
      title: "برنامه‌های غذایی", 
      icon: UtensilsCrossed, 
      value: stats.totalMeals, 
      growth: stats.mealGrowth,
      color: "bg-emerald-500/20",
      textColor: "text-emerald-400"
    },
    { 
      title: "مکمل‌ها", 
      icon: Pill, 
      value: stats.totalSupplements, 
      growth: stats.supplementGrowth,
      color: "bg-purple-500/20",
      textColor: "text-purple-400"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      {/* Hero Section with Glass Effect */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 p-6 md:p-8 text-white shadow-lg">
        <div className="absolute inset-0 bg-[url(/pattern.svg)] opacity-10" />
        <div className="absolute -bottom-5 -left-5 w-40 h-40 blur-3xl rounded-full bg-pink-600/30" />
        <div className="absolute -top-10 -right-10 w-40 h-40 blur-3xl rounded-full bg-indigo-600/30" />
        
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 blur-sm opacity-70 animate-pulse" />
                    <Avatar className="h-16 w-16 border-2 border-white/30 relative shadow-lg">
                      <AvatarImage src={trainerProfile.image} alt="تصویر پروفایل" />
                      <AvatarFallback>
                        <Crown className="w-6 h-6 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        خوش آمدید <span className="inline-block ml-1">👋</span>
                      </h1>
                      <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                        {trainerProfile.name || "مربی حرفه ای"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-white/80">
                      به داشبورد مدیریت برنامه تمرینی خود خوش آمدید
                    </p>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-3"
                >
                  <Badge variant="outline" className="border-white/10 bg-white/10 text-white backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Sun className="w-3.5 h-3.5 ml-1.5 text-yellow-300" />
                    {currentTime.toLocaleDateString('fa-IR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace(/(\d+)\s+(\S+)\s+(\d+),\s+(\S+)/, '$4 $1 $2 $3')}
                  </Badge>
                  <Badge variant="outline" className="border-white/10 bg-white/10 text-white backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 ml-1.5 text-blue-300" />
                    {currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </Badge>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="hidden lg:flex items-center gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner"
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="p-2 rounded-lg bg-indigo-500/30 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/60">شاگردان فعال</span>
                    <span className="text-sm font-bold">{toPersianNumbers(stats.totalStudents)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="p-2 rounded-lg bg-emerald-500/30 text-white">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/60">پیشرفت</span>
                    <span className="text-sm font-bold">{toPersianNumbers(stats.studentsProgress)}٪</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid gap-4 grid-cols-1 sm:grid-cols-3"
            >
              {quickStats.map((stat, index) => (
                <motion.div 
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                  className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300 shadow-inner group"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/80">{stat.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold">{toPersianNumbers(stat.value)}</p>
                      <div className={`flex items-center text-xs ${stat.growth >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                        {stat.growth >= 0 ? <TrendingUp className="w-3 h-3 ml-1" /> : <Activity className="w-3 h-3 ml-1" />}
                        {toPersianNumbers(Math.abs(stat.growth))}٪
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Menu Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        {dashboardItems.map((dashItem) => (
          <motion.div key={dashItem.href} variants={item}>
            <Link 
              to={dashItem.href}
              className={`block group relative overflow-hidden ${dashItem.bgColor} rounded-xl border border-slate-200 dark:border-slate-800 p-3 md:p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${dashItem.color} transition-opacity duration-300`} />
              <div className="relative flex flex-col items-center text-center gap-2 md:gap-3">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${dashItem.color} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <dashItem.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm md:text-base text-gray-800 dark:text-white">
                  {dashItem.title}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats and Recent Students */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="md:col-span-2 space-y-6"
        >
          {/* Students Card */}
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30">
                    <Users className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  شاگردان
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20" asChild>
                  <Link to="/Students">
                    مشاهده همه
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y dark:divide-slate-800">
                {students.length > 0 ? (
                  students.slice(0, 5).map((student, index) => (
                    <motion.div 
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700 shadow-sm">
                          <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>
                            <User2 className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{student.name}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span dir="ltr">{toPersianNumbers(student.phone)}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                          {student.exercises?.length ? toPersianNumbers(student.exercises.length) : '۰'} تمرین
                        </Badge>
                        <Button variant="ghost" size="icon" className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full" asChild>
                          <Link to={`/Students`}>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 text-center text-muted-foreground"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Users className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <p>هیچ شاگردی یافت نشد</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white transition-colors duration-300"
                      asChild
                    >
                      <Link to="/Students">
                        افزودن شاگرد جدید
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
            {students.length > 0 && (
              <CardFooter className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-t border-slate-200 dark:border-slate-800">
                <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
                  <span>نمایش {toPersianNumbers(students.slice(0, 5).length)} از {toPersianNumbers(students.length)} شاگرد</span>
                  <Link to="/Students" className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline">
                    <span>مشاهده همه شاگردان</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </CardFooter>
            )}
          </Card>
          
          <StatsCards stats={stats} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="space-y-6"
        >
          {/* Progress Card */}
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                  <BarChart3 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                </div>
                پیشرفت کلی
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">میانگین پیشرفت شاگردان</span>
                <span className="text-xl font-bold">{toPersianNumbers(stats.studentsProgress)}٪</span>
              </div>
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.studentsProgress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Users className="w-4 h-4" />
                    <span>شاگردان فعال</span>
                  </div>
                  <p className="mt-1 text-xl font-bold">{toPersianNumbers(stats.totalStudents)}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Dumbbell className="w-4 h-4" />
                    <span>پیشرفت</span>
                  </div>
                  <p className="mt-1 text-xl font-bold">{toPersianNumbers(stats.studentsProgress)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary Card */}
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
                  <LineChart className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                </div>
                خلاصه فعالیت‌ها
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <UtensilsCrossed className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium">برنامه‌های غذایی</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                    {toPersianNumbers(stats.totalMeals)} برنامه
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <Pill className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    </div>
                    <span className="text-sm font-medium">مکمل‌های تجویز شده</span>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                    {toPersianNumbers(stats.totalSupplements)} مورد
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <Dumbbell className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    </div>
                    <span className="text-sm font-medium">نرخ تکمیل تمرین‌ها</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ml-2">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                        style={{ width: `${stats.studentsProgress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{toPersianNumbers(stats.studentsProgress)}٪</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t dark:border-slate-800">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white transition-colors duration-300" 
                  asChild
                >
                  <Link to="/Reports">
                    <span>مشاهده گزارش کامل</span>
                    <Sparkles className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
