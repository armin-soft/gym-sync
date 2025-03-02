
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Clock,
  User2,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  Crown,
  Users,
  Calendar,
  ChartBar,
  Sun,
  TrendingUp,
  CalendarCheck,
  ArrowUpRight,
  CalendarDays,
  ArrowRight
} from "lucide-react";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Achievements } from "@/components/dashboard/Achievements";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Fake training sessions data
const trainingSessions = [
  { 
    id: 1, 
    student: "علی محمدی", 
    type: "تمرین بدنسازی", 
    date: "1402/10/12", 
    time: "16:30", 
    duration: "90 دقیقه",
    status: "completed"
  },
  { 
    id: 2, 
    student: "رضا کریمی", 
    type: "تمرین کاردیو", 
    date: "1402/10/12", 
    time: "18:00", 
    duration: "60 دقیقه",
    status: "completed"
  },
  { 
    id: 3, 
    student: "مریم علوی", 
    type: "تمرین قدرتی", 
    date: "1402/10/13", 
    time: "10:00", 
    duration: "75 دقیقه",
    status: "upcoming"
  },
  { 
    id: 4, 
    student: "سعید رضایی", 
    type: "تمرین استقامتی", 
    date: "1402/10/13", 
    time: "14:30", 
    duration: "60 دقیقه",
    status: "upcoming"
  },
  { 
    id: 5, 
    student: "نیما صادقی", 
    type: "تمرین انعطاف پذیری", 
    date: "1402/10/14", 
    time: "09:00", 
    duration: "45 دقیقه",
    status: "upcoming"
  }
];

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  
  // بازیابی اطلاعات مربی از localStorage
  const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{"name":"","image":"/placeholder.svg"}');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-[url(/pattern.svg)] opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-white/10 via-white/30 to-white/10" />
        
        <div className="relative">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarImage src={trainerProfile.image} alt="تصویر پروفایل" />
                    <AvatarFallback>
                      <Crown className="w-6 h-6 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
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
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-white backdrop-blur-sm px-3 py-1">
                    <Sun className="w-3.5 h-3.5 ml-1.5 text-yellow-400" />
                    {currentTime.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </Badge>
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-white backdrop-blur-sm px-3 py-1">
                    <Clock className="w-3.5 h-3.5 ml-1.5 text-blue-300" />
                    {currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`border-white/10 backdrop-blur-sm px-3 py-1 text-white ${
                      stats.totalStudents > 0 ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 ml-1.5" />
                    {stats.totalStudents > 0 ? 'در حال فعالیت' : 'در انتظار'}
                  </Badge>
                </div>
              </div>
              
              {/* اطلاعات سریع */}
              <div className="hidden lg:block p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 border-l border-white/20">
                    <Users className="w-4 h-4 text-blue-300" />
                    <div className="flex flex-col">
                      <span className="text-xs text-white/60">شاگردان فعال</span>
                      <span className="text-sm font-semibold">{toPersianNumbers(stats.totalStudents)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3">
                    <Calendar className="w-4 h-4 text-emerald-300" />
                    <div className="flex flex-col">
                      <span className="text-xs text-white/60">جلسات امروز</span>
                      <span className="text-sm font-semibold">{toPersianNumbers(stats.totalSessions)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* کارت های آمار سریع */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Users className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80">تعداد شاگردان</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalStudents)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Calendar className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80">جلسات تمرینی</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalSessions)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <UtensilsCrossed className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80">برنامه های غذایی</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalMeals)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Pill className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80">مکمل های تجویز شده</p>
                  <p className="text-lg font-semibold">{toPersianNumbers(stats.totalSupplements)}</p>
                </div>
              </div>
            </div>

            {/* دکمه های اصلی */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { title: "مدیریت شاگردان", icon: User2, href: '/Students', color: "from-blue-600 to-blue-400" },
                { title: "مدیریت تمرین ها", icon: Dumbbell, href: '/Exercise-Movements', color: "from-emerald-600 to-emerald-400" },
                { title: "برنامه های غذایی", icon: UtensilsCrossed, href: '/Diet-Plan', color: "from-amber-600 to-amber-400" },
                { title: "مکمل ها", icon: Pill, href: '/Supplements-Vitamins', color: "from-purple-600 to-purple-400" },
                { title: "گزارشات", icon: ChartBar, href: '/Reports', color: "from-pink-600 to-pink-400" }
              ].map((item) => (
                <Button 
                  key={item.href}
                  variant="secondary" 
                  className="group relative overflow-hidden text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm border-white/10"
                  asChild
                >
                  <Link to={item.href}>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r ${item.color} transition-opacity`} />
                    <span className="relative flex items-center gap-2">
                      <item.icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      {item.title}
                    </span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* جلسات تمرینی */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* جلسات تمرینی */}
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-indigo-500" />
                  جلسات تمرینی
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20">
                  مشاهده همه
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="upcoming" className="w-full">
                <div className="px-4 pt-2 pb-0 border-b">
                  <TabsList className="w-full justify-start gap-2 bg-transparent h-auto p-0">
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-indigo-900/30 dark:data-[state=active]:text-indigo-400 rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-indigo-500 px-4 py-2">
                      آینده
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-indigo-900/30 dark:data-[state=active]:text-indigo-400 rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-indigo-500 px-4 py-2">
                      انجام شده
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="upcoming" className="mt-0">
                  <div className="divide-y">
                    {trainingSessions.filter(session => session.status === "upcoming").map(session => (
                      <div key={session.id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 p-2 rounded-full">
                            <CalendarDays className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{session.student}</h4>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <span>{session.type}</span>
                              <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
                              <span dir="ltr">{session.time}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">
                            {session.duration}
                          </Badge>
                          <Button variant="ghost" size="icon" className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="completed" className="mt-0">
                  <div className="divide-y">
                    {trainingSessions.filter(session => session.status === "completed").map(session => (
                      <div key={session.id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-2 rounded-full">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{session.student}</h4>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <span>{session.type}</span>
                              <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
                              <span dir="ltr">{session.time}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                            تکمیل شده
                          </Badge>
                          <Button variant="ghost" size="icon" className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* کارت‌های آمار */}
          <StatsCards stats={stats} />
        </div>
        
        <div className="space-y-6">
          {/* دسترسی سریع */}
          <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Activity className="w-5 h-5" />
                دسترسی سریع
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-2 gap-2">
              {[
                { title: "شاگردان", icon: Users, href: "/Students", color: "bg-blue-500" },
                { title: "تمرین‌ها", icon: Dumbbell, href: "/Exercise-Movements", color: "bg-emerald-500" },
                { title: "برنامه غذایی", icon: UtensilsCrossed, href: "/Diet-Plan", color: "bg-amber-500" },
                { title: "مکمل‌ها", icon: Pill, href: "/Supplements-Vitamins", color: "bg-purple-500" },
                { title: "گزارشات", icon: ChartBar, href: "/Reports", color: "bg-pink-500" },
                { title: "پروفایل", icon: User2, href: "/Coach-Profile", color: "bg-indigo-500" },
              ].map((item) => (
                <Button
                  key={item.href}
                  variant="outline"
                  className="h-20 w-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:shadow-md"
                  asChild
                >
                  <Link to={item.href}>
                    <div className={`p-2 rounded-full ${item.color} text-white mb-1`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium">{item.title}</span>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
          
          {/* دستاوردها و موفقیت‌ها */}
          <Achievements stats={stats} />
        </div>
      </div>
      
      {/* منوی دسترسی سریع */}
      <QuickActions />
    </div>
  );
};

export default Index;
