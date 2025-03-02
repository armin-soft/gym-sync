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
  Calendar,
  ChartBar,
  Sun,
  ArrowRight,
  Dumbbell,
  Database,
  HelpCircle,
  TrendingUp,
  BarChart3
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 md:p-8 text-white shadow-lg shadow-indigo-500/20">
        <div className="absolute inset-0 bg-[url(/pattern.svg)] opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-white/10 via-white/30 to-white/10" />
        <div className="absolute -bottom-2 right-0 w-28 h-28 md:w-40 md:h-40 blur-3xl rounded-full bg-pink-500/30" />
        <div className="absolute -top-5 -left-5 w-24 h-24 blur-3xl rounded-full bg-indigo-500/30" />
        
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
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 blur-sm opacity-50 animate-pulse" />
                    <Avatar className="h-14 w-14 border-2 border-white/20 relative">
                      <AvatarImage src={trainerProfile.image} alt="تصویر پروفایل" />
                      <AvatarFallback>
                        <Crown className="w-6 h-6 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                        خوش آمدید 👋
                      </h1>
                      <Badge variant="secondary" className="bg-white/10 text-white border-0 backdrop-blur-sm">
                        {trainerProfile.name || "مربی حرفه ای"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-white/80 text-sm">
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
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-white backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Sun className="w-3.5 h-3.5 ml-1.5 text-yellow-400" />
                    {currentTime.toLocaleDateString('fa-IR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace(/(\d+)\s+(\S+)\s+(\d+),\s+(\S+)/, '$4 $1 $2 $3')}
                  </Badge>
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-white backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 ml-1.5 text-blue-300" />
                    {currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </Badge>
                  {/* نشانگر وضعیت فعالیت حذف شد */}
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="hidden lg:block p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-white/60">شاگردان فعال</span>
                      <span className="text-sm font-bold">{toPersianNumbers(stats.totalStudents)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            >
              {quickStats.map((stat, index) => (
                <motion.div 
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-inner group"
                >
                  <div className={`p-2 rounded-lg ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/80">{stat.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold">{toPersianNumbers(stat.value)}</p>
                      <div className={`flex items-center text-xs ${stat.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.growth >= 0 ? <TrendingUp className="w-3 h-3 ml-1" /> : <Activity className="w-3 h-3 ml-1" />}
                        {toPersianNumbers(Math.abs(stat.growth))}٪
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3"
            >
              {dashboardItems.map((item) => (
                <motion.div key={item.href} variants={item}>
                  <Link 
                    to={item.href}
                    className={`block group relative overflow-hidden ${item.bgColor} rounded-xl border border-white/10 p-3 md:p-4 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full`}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r ${item.color} transition-opacity duration-300`} />
                    <div className="relative flex flex-col items-center text-center gap-2 md:gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-sm md:text-base text-gray-800 dark:text-white">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="md:col-span-2 space-y-6"
        >
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
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  style={{ width: `${stats.studentsProgress}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Users className="w-4 h-4" />
                    <span>تعداد شاگردان فعال</span>
                  </div>
                  <p className="mt-1 text-xl font-bold">{toPersianNumbers(stats.totalStudents)}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>جلسات در ماه</span>
                  </div>
                  <p className="mt-1 text-xl font-bold">{toPersianNumbers(stats.totalSessions)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
