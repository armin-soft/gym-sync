
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toPersianNumbers } from "@/lib/utils/numbers";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Dumbbell,
  Wallet,
  BarChart as ChartBarIcon,
  PieChart as ChartPieIcon,
  UtensilsCrossed,
  Pill,
  ChevronRight,
  Calendar,
  ArrowDown,
  ArrowUp,
  Filter,
  RefreshCw
} from "lucide-react";

import { 
  calculateTotalIncome, 
  calculateGrowth, 
  generateHistoricalData 
} from "@/lib/utils/reports";
import { StatCard } from "@/components/reports/StatCard";
import { MonthlyDataChart } from "@/components/reports/MonthlyDataChart";
import { IncomeChart } from "@/components/reports/IncomeChart";
import { ActivitiesChart } from "@/components/reports/ActivitiesChart";
import { StatsSummary } from "@/components/reports/StatsSummary";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MonthlyData {
  name: string;
  شاگردان: number;
  درآمد: number;
  تمرین: number;
  مکمل: number;
  برنامه_غذایی: number;
  رشد_شاگردان?: number;
  رشد_درآمد?: number;
}

const Reports = () => {
  const { toast } = useToast();
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [expandedData, setExpandedData] = useState<MonthlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("6months");
  const deviceInfo = useDeviceInfo();

  // Load data effect
  useEffect(() => {
    loadData();
    
    // Update on localStorage changes
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [timeRange]);

  const loadData = () => {
    setIsRefreshing(true);
    try {
      // Data fetching logic
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
      const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
      const meals = JSON.parse(localStorage.getItem('meals') || '[]');
      const prevMonthStudents = JSON.parse(localStorage.getItem('prevMonthStudents') || '[]');
      const prevMonthSupplements = JSON.parse(localStorage.getItem('prevMonthSupplements') || '[]');
      const prevMonthMeals = JSON.parse(localStorage.getItem('prevMonthMeals') || '[]');

      // Generate historical data based on time range
      const { monthlyData, expandedData } = generateHistoricalData(
        students,
        prevMonthStudents,
        prevMonthSupplements,
        prevMonthMeals,
        exercises,
        supplements,
        meals,
        timeRange // Pass time range to filter data
      );

      setMonthlyData(monthlyData);
      setExpandedData(expandedData);
      setIsLoading(false);
      setIsRefreshing(false);
      
      toast({
        title: "اطلاعات با موفقیت بارگذاری شد",
        description: `${toPersianNumbers(monthlyData.length)} دوره زمانی بارگذاری شد`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoading(false);
      setIsRefreshing(false);
      
      toast({
        title: "خطا در بارگذاری اطلاعات",
        description: "لطفا مجددا تلاش کنید",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Format currency for chart tooltips
  const formatCurrency = (value: number) => {
    return `${toPersianNumbers(value.toLocaleString())} تومان`;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-background/95 via-background to-background/90 flex items-center justify-center z-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 p-8 max-w-md mx-auto"
        >
          <div className="relative mx-auto">
            <motion.div 
              animate={{ 
                rotate: 360,
                borderRadius: ["50% 50% 50% 50%", "30% 70% 70% 30%", "50% 50% 50% 50%"]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full mx-auto"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ChartBarIcon className="w-10 h-10 text-primary" />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-xl font-bold text-foreground">در حال بارگذاری گزارشات</h3>
            <p className="text-muted-foreground">لطفاً کمی صبر کنید...</p>
            
            <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-6">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  const stats = [
    {
      title: "تعداد کل شاگردان",
      value: currentMonth.شاگردان,
      growth: calculateGrowth(currentMonth.شاگردان, previousMonth.شاگردان),
      icon: Users,
      color: "from-blue-600 to-blue-400",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "درآمد ماهانه",
      value: currentMonth.درآمد,
      growth: calculateGrowth(currentMonth.درآمد, previousMonth.درآمد),
      icon: Wallet,
      color: "from-green-600 to-green-400",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
      format: (value: number) => `${toPersianNumbers(value.toLocaleString())} تومان`
    },
    {
      title: "برنامه‌های تمرینی",
      value: currentMonth.تمرین,
      growth: calculateGrowth(currentMonth.تمرین, previousMonth.تمرین),
      icon: Dumbbell,
      color: "from-orange-600 to-orange-400",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  const nutritionStats = [
    {
      title: "برنامه‌های غذایی",
      value: currentMonth.برنامه_غذایی,
      growth: calculateGrowth(currentMonth.برنامه_غذایی, previousMonth.برنامه_غذایی),
      icon: UtensilsCrossed,
      color: "from-pink-600 to-pink-400",
      bgLight: "bg-pink-50",
      textColor: "text-pink-600"
    },
    {
      title: "مکمل‌های تجویز شده",
      value: currentMonth.مکمل,
      growth: calculateGrowth(currentMonth.مکمل, previousMonth.مکمل),
      icon: Pill,
      color: "from-indigo-600 to-indigo-400",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-600"
    }
  ];

  const chartConfig = {
    شاگردان: {
      label: "تعداد شاگردان",
      color: "#4f46e5"
    },
    درآمد: {
      label: "درآمد (تومان)",
      color: "#22c55e"
    },
    رشد_شاگردان: {
      label: "رشد شاگردان (%)",
      color: "#f59e0b"
    },
    رشد_درآمد: {
      label: "رشد درآمد (%)",
      color: "#ec4899"
    },
    تمرین: {
      label: "برنامه‌های تمرینی",
      color: "#f59e0b"
    },
    مکمل: {
      label: "مکمل‌های تجویز شده",
      color: "#8b5cf6"
    },
    برنامه_غذایی: {
      label: "برنامه‌های غذایی",
      color: "#ec4899"
    }
  };

  const getResponsiveGridCols = () => {
    if (deviceInfo.isMobile) {
      return "grid-cols-1";
    } else if (deviceInfo.isTablet || deviceInfo.isSmallLaptop) {
      return "grid-cols-3";
    } else {
      return "grid-cols-3";
    }
  };

  const getResponsiveNutritionGridCols = () => {
    if (deviceInfo.isMobile) {
      return "grid-cols-1";
    } else {
      return "grid-cols-2";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -ml-40 -mb-40" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
      
      <ScrollArea className="h-screen w-full">
        <div className="w-full h-full py-4 sm:py-6 md:py-8 space-y-5 sm:space-y-6 md:space-y-8 px-3 sm:px-6 md:px-8 lg:px-10 pb-24">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={`p-1.5 rounded-md bg-primary/10 text-primary`}>
                  <ChartBarIcon className="w-5 h-5" />
                </div>
                <h2 className={`${deviceInfo.isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent`}>
                  گزارشات و آمار
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
                نمای کلی عملکرد و آمار باشگاه شما در بازه‌های زمانی مختلف به همراه تحلیل روند رشد
              </p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "px-3 flex gap-2 items-center border border-border/60 bg-card/80 hover:bg-card",
                    isRefreshing && "opacity-70 pointer-events-none"
                  )}
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")} />
                  <span className="text-xs">بروزرسانی</span>
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="px-3 flex gap-2 items-center border border-border/60 bg-card/80 hover:bg-card"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span className="text-xs">فیلترها</span>
                  {filtersOpen ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                </Button>
              </div>

              <div className="flex flex-row gap-1 sm:gap-2 items-center">
                <div className="rounded-full w-3 h-3 bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">بروزرسانی: همین الان</span>
              </div>
            </div>
          </motion.div>

          {/* Filters Section */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/60">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">بازه زمانی</label>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant={timeRange === "3months" ? "default" : "outline"} 
                          className="h-8 text-xs"
                          onClick={() => setTimeRange("3months")}
                        >
                          ۳ ماه
                        </Button>
                        <Button 
                          size="sm" 
                          variant={timeRange === "6months" ? "default" : "outline"} 
                          className="h-8 text-xs"
                          onClick={() => setTimeRange("6months")}
                        >
                          ۶ ماه
                        </Button>
                        <Button 
                          size="sm" 
                          variant={timeRange === "1year" ? "default" : "outline"} 
                          className="h-8 text-xs"
                          onClick={() => setTimeRange("1year")}
                        >
                          ۱ سال
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-auto">
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => setFiltersOpen(false)}
                        className="text-xs"
                      >
                        بستن
                      </Button>
                      
                      <Button 
                        size="sm"
                        className="text-xs"
                        onClick={handleRefresh}
                      >
                        اعمال فیلترها
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary Cards */}
          <div className="space-y-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className={`grid gap-3 sm:gap-4 ${getResponsiveGridCols()} relative z-10`}>
                {stats.map((stat, index) => (
                  <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    growth={stat.growth}
                    icon={stat.icon}
                    color={stat.color}
                    bgLight={stat.bgLight}
                    textColor={stat.textColor}
                    format={stat.format}
                    index={index}
                    isMobile={deviceInfo.isMobile}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className={`grid gap-3 sm:gap-4 ${getResponsiveNutritionGridCols()} relative z-10`}>
                {nutritionStats.map((stat, index) => (
                  <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    growth={stat.growth}
                    icon={stat.icon}
                    color={stat.color}
                    bgLight={stat.bgLight}
                    textColor={stat.textColor}
                    index={index + 3}
                    isMobile={deviceInfo.isMobile}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <StatsSummary 
                data={expandedData} 
                growthData={currentMonth} 
                isMobile={deviceInfo.isMobile} 
              />
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative z-10"
          >
            <Tabs defaultValue="overview" className="space-y-4 md:space-y-6" onValueChange={handleTabChange}>
              <Card className="p-1 backdrop-blur-sm bg-card/95 border-border/60">
                <TabsList className="w-full justify-start sm:justify-center grid grid-cols-3 h-12">
                  <TabsTrigger 
                    value="overview" 
                    className="gap-1 sm:gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg"
                  >
                    <ChartBarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">نمای کلی</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="income" 
                    className="gap-1 sm:gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg"
                  >
                    <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">درآمد</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="activities" 
                    className="gap-1 sm:gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg"
                  >
                    <ChartPieIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">فعالیت‌ها</span>
                  </TabsTrigger>
                </TabsList>
              </Card>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="overview" className="space-y-4 md:space-y-6 h-full m-0">
                    <Card className="border-border/60 backdrop-blur-sm bg-card/95 overflow-hidden">
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">روند کلی عملکرد</h3>
                            <p className="text-xs text-muted-foreground">مقایسه شاخص‌های کلیدی در طول زمان</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 text-xs">
                              <Calendar className="w-3.5 h-3.5 ml-1" />
                              انتخاب بازه زمانی
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs px-2">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <MonthlyDataChart 
                          data={expandedData} 
                          chartConfig={chartConfig}
                          isMobile={deviceInfo.isMobile}
                        />
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="income" className="space-y-4 md:space-y-6 h-full m-0">
                    <Card className="border-border/60 backdrop-blur-sm bg-card/95 overflow-hidden">
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">تحلیل درآمد</h3>
                            <p className="text-xs text-muted-foreground">روند درآمد و رشد مالی در طول زمان</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700">
                              <TrendingUp className="w-3.5 h-3.5" />
                              <span className="text-xs font-medium">
                                {toPersianNumbers(calculateGrowth(currentMonth.درآمد, previousMonth.درآمد))}٪ رشد
                              </span>
                            </div>
                          </div>
                        </div>
                        <IncomeChart 
                          data={expandedData}
                          isMobile={deviceInfo.isMobile}
                        />
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="activities" className="space-y-4 md:space-y-6 h-full m-0">
                    <Card className="border-border/60 backdrop-blur-sm bg-card/95 overflow-hidden">
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">تحلیل فعالیت‌ها</h3>
                            <p className="text-xs text-muted-foreground">مقایسه انواع فعالیت‌های انجام شده</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 text-xs">
                              <Filter className="w-3.5 h-3.5 ml-1" />
                              نمایش بر اساس
                            </Button>
                          </div>
                        </div>
                        <ActivitiesChart 
                          data={expandedData} 
                          chartConfig={chartConfig}
                          isMobile={deviceInfo.isMobile}
                        />
                      </div>
                    </Card>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default Reports;
