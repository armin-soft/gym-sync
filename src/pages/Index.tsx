
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";
import { 
  Sparkles, 
  ArrowUpRight, 
  Users, 
  Calendar, 
  Dumbbell, 
  LineChart, 
  BarChart3, 
  ChevronRight,
  Star,
  Trophy,
  Activity,
  Zap,
  TrendingUp,
  Timer
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

// Import components
import { HeroSection } from "@/components/dashboard/HeroSection";
import { MainMenuGrid } from "@/components/dashboard/MainMenuGrid";
import { RecentStudentsCard } from "@/components/dashboard/RecentStudentsCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { ActivitySummaryCard } from "@/components/dashboard/ActivitySummaryCard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toPersianNumbers } from "@/lib/utils/numbers";

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  const deviceInfo = useDeviceInfo();
  const [activeTab, setActiveTab] = useState<string>("overview");
  
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
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Dashboard tabs
  const dashboardTabs = [
    { id: "overview", label: "نمای کلی", icon: LineChart },
    { id: "students", label: "شاگردان", icon: Users },
    { id: "progress", label: "پیشرفت", icon: Activity },
    { id: "activities", label: "فعالیت‌ها", icon: Zap },
  ];

  return (
    <PageContainer fullWidth>
      <div className="w-full h-full overflow-auto space-y-6 p-6 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/5 blur-3xl rounded-full" />
          <div className="absolute bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-amber-500/10 to-pink-500/5 blur-3xl rounded-full" />
          
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <Sparkles className="w-4 h-4 text-purple-400/40" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10">
          {/* Welcome Hero Section - Modern and compact */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-3/4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white p-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0H12V12H0V0Z" fill="%23ffffff09"/%3E%3C/svg%3E')`, backgroundSize: '24px', opacity: 0.2 }}></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-white/30 shadow-xl">
                      <AvatarImage src={trainerProfile.image} alt={trainerProfile.name || "تصویر پروفایل"} />
                      <AvatarFallback className="bg-purple-800">
                        <Trophy className="w-6 h-6 text-amber-300" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold">
                          سلام{trainerProfile.name ? ` ${trainerProfile.name}` : ''} <span className="inline-block animate-wave">👋</span>
                        </h1>
                        <Badge variant="outline" className="bg-white/20 text-white border-0 font-medium">
                          مربی حرفه‌ای
                        </Badge>
                      </div>
                      <p className="text-white/80 text-sm">
                        به داشبورد مدیریت برنامه تمرینی خود خوش آمدید
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="px-3 py-1.5 bg-white/10 border-white/20 text-white flex items-center gap-2 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{currentTime.toLocaleDateString('fa-IR')}</span>
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1.5 bg-white/10 border-white/20 text-white flex items-center gap-2 text-xs">
                      <Timer className="w-3.5 h-3.5" />
                      <span>{currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <QuickStatCard 
                    title="شاگردان فعال" 
                    value={stats.totalStudents} 
                    change={stats.studentGrowth} 
                    icon={Users}
                    index={0}
                  />
                  
                  <QuickStatCard 
                    title="میانگین پیشرفت" 
                    value={`${stats.studentsProgress}٪`}
                    change={0}
                    icon={Activity}
                    index={1}
                  />
                  
                  <QuickStatCard 
                    title="برنامه‌های غذایی" 
                    value={stats.totalMeals} 
                    change={stats.mealGrowth} 
                    icon={BarChart3}
                    index={2}
                  />
                  
                  <QuickStatCard 
                    title="مکمل‌ها" 
                    value={stats.totalSupplements} 
                    change={stats.supplementGrowth} 
                    icon={Dumbbell}
                    index={3}
                  />
                </div>
              </motion.div>
            </div>
            
            <div className="w-full md:w-1/4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm h-full"
              >
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    وظایف امروز
                  </h3>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    <TaskItem 
                      title="ثبت اطلاعات شاگردان جدید" 
                      completed={false} 
                      priority="high"
                    />
                    <TaskItem 
                      title="بروزرسانی برنامه‌های غذایی" 
                      completed={true} 
                      priority="medium"
                    />
                    <TaskItem 
                      title="ایجاد تمرین جدید" 
                      completed={false} 
                      priority="low"
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20">
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    افزودن وظیفه
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Dashboard Tab Navigation */}
          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
                {dashboardTabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <AnimatePresence mode="wait">
                {/* Overview Tab Content */}
                <TabsContent value="overview" className="mt-6">
                  <motion.div {...fadeIn} className="space-y-6">
                    {/* Main Menu Grid */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-500" />
                        دسترسی سریع
                      </h2>
                      <MainMenuGrid />
                    </div>
                    
                    {/* Stats Cards and Recent Activity */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <StatsCards stats={stats} />
                      </div>
                      <div>
                        <ActivitySummaryCard stats={stats} />
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* Students Tab Content */}
                <TabsContent value="students" className="mt-6">
                  <motion.div {...fadeIn} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        شاگردان
                      </h2>
                      <Button asChild size="sm" variant="outline">
                        <Link to="/Students" className="flex items-center gap-1">
                          <span>مشاهده همه</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                    
                    <RecentStudentsCard students={students} />
                  </motion.div>
                </TabsContent>
                
                {/* Progress Tab Content */}
                <TabsContent value="progress" className="mt-6">
                  <motion.div {...fadeIn} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Activity className="h-5 w-5 text-purple-500" />
                        نمودار پیشرفت
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ProgressCard stats={stats} />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="p-1"
                      >
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Star className="h-5 w-5 text-amber-500" />
                              <span>عملکرد شاگردان برتر</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {students.slice(0, 3).map((student, index) => (
                                <div key={student.id} className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="relative">
                                      <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
                                        <AvatarImage src={student.image || "/placeholder.svg"} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white border border-white dark:border-slate-700">
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-slate-400' : 'bg-amber-700'}`}>
                                          {index + 1}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">{student.name}</p>
                                      <p className="text-xs text-muted-foreground">{toPersianNumbers(student.phone)}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                                      {toPersianNumbers(85 - index * 7)}٪
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                              
                              {students.length === 0 && (
                                <div className="text-center py-4 text-muted-foreground">
                                  <p>هیچ شاگردی یافت نشد</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="ghost" size="sm" className="w-full">
                              مشاهده همه
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* Activities Tab Content */}
                <TabsContent value="activities" className="mt-6">
                  <motion.div {...fadeIn} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-500" />
                        فعالیت‌های اخیر
                      </h2>
                    </div>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          <ActivityTimelineItem 
                            title="مکمل جدید اضافه شد"
                            description="مکمل پروتئین وی ایزوله به لیست مکمل‌ها اضافه شد"
                            time="۱۰ دقیقه پیش"
                            icon={Pill}
                            iconColor="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                          />
                          
                          <ActivityTimelineItem 
                            title="برنامه تمرینی بروزرسانی شد"
                            description="برنامه تمرینی علی محمدی بروزرسانی شد"
                            time="۱ ساعت پیش"
                            icon={Dumbbell}
                            iconColor="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          />
                          
                          <ActivityTimelineItem 
                            title="شاگرد جدید اضافه شد"
                            description="رضا احمدی به لیست شاگردان اضافه شد"
                            time="۳ ساعت پیش"
                            icon={Users}
                            iconColor="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          />
                          
                          <ActivityTimelineItem 
                            title="برنامه غذایی ویرایش شد"
                            description="برنامه غذایی مهدی کریمی ویرایش شد"
                            time="دیروز"
                            icon={BarChart3}
                            iconColor="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            isLast={true}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// Quick Stat Card Component
const QuickStatCard = ({ title, value, change, icon: Icon, index }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
      className="group bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-white/10 text-white">
          <Icon className="w-5 h-5" />
        </div>
        
        {typeof change === 'number' && change !== 0 && (
          <div className={`px-1.5 py-0.5 rounded-md text-xs flex items-center gap-1 ${
            change >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}>
            <TrendingUp className={`w-3 h-3 ${change < 0 ? 'transform rotate-180' : ''}`} />
            <span>{toPersianNumbers(Math.abs(change))}٪</span>
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <p className="text-sm text-white/80">{title}</p>
        <p className="mt-1 text-2xl font-bold text-white">
          {typeof value === 'number' ? toPersianNumbers(value) : value}
        </p>
      </div>
      
      <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full bg-white/30"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(70 + Math.random() * 30, 100)}%` }}
          transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
        />
      </div>
    </motion.div>
  );
};

// Task Item Component
const TaskItem = ({ title, completed, priority }: { title: string; completed: boolean; priority: 'high' | 'medium' | 'low' }) => {
  const priorityColors = {
    high: "bg-red-100 border-red-300 dark:bg-red-900/20 dark:border-red-800",
    medium: "bg-amber-100 border-amber-300 dark:bg-amber-900/20 dark:border-amber-800",
    low: "bg-blue-100 border-blue-300 dark:bg-blue-900/20 dark:border-blue-800",
  };
  
  const priorityDot = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-blue-500",
  };
  
  return (
    <div className={`p-2.5 rounded-lg border flex items-start gap-3 ${completed ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50' : priorityColors[priority]}`}>
      <div className="flex items-center justify-center pt-0.5">
        <div className={`w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center ${completed ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-400 dark:border-purple-700' : 'bg-white dark:bg-slate-800'}`}>
          {completed && <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <p className={`text-sm ${completed ? 'text-slate-500 dark:text-slate-400 line-through' : 'font-medium'}`}>
            {title}
          </p>
          {!completed && (
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${priorityDot[priority]}`}></div>
            </div>
          )}
        </div>
        
        {!completed && (
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>امروز</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Activity Timeline Item Component
const ActivityTimelineItem = ({ 
  title, 
  description, 
  time, 
  icon: Icon, 
  iconColor,
  isLast = false
}: { 
  title: string; 
  description: string; 
  time: string;
  icon: React.ElementType;
  iconColor: string;
  isLast?: boolean;
}) => {
  return (
    <div className="relative flex items-start gap-4">
      {!isLast && (
        <div className="absolute top-8 bottom-0 left-3.5 w-px bg-slate-200 dark:bg-slate-800"></div>
      )}
      
      <div className={`mt-1.5 rounded-full p-1.5 ${iconColor}`}>
        <Icon className="w-4 h-4" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
};

// Helper components
const Check = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default Index;
