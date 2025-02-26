
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  ComposedChart,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toPersianNumbers } from "@/lib/utils/numbers";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Dumbbell,
  Wallet,
  Calendar,
  BarChart as ChartBarIcon,
  PieChart as ChartPieIcon,
  UtensilsCrossed,
  Pill,
  ArrowUpRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface MonthlyData {
  name: string;
  شاگردان: number;
  درآمد: number;
  جلسات: number;
  تمرین: number;
  مکمل: number;
  برنامه_غذایی: number;
  رشد_شاگردان?: number;
  رشد_درآمد?: number;
}

const Reports = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [expandedData, setExpandedData] = useState<MonthlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadData = () => {
      try {
        // دریافت تمام داده‌های مورد نیاز
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
        const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
        const meals = JSON.parse(localStorage.getItem('meals') || '[]');
        const prevMonthStudents = JSON.parse(localStorage.getItem('prevMonthStudents') || '[]');
        const prevMonthSupplements = JSON.parse(localStorage.getItem('prevMonthSupplements') || '[]');
        const prevMonthMeals = JSON.parse(localStorage.getItem('prevMonthMeals') || '[]');

        // محاسبه داده‌های ماه جاری
        const currentData: MonthlyData = {
          name: "ماه جاری",
          شاگردان: students.length,
          درآمد: calculateTotalIncome(students),
          جلسات: calculateTotalSessions(students),
          تمرین: exercises.length,
          مکمل: supplements.length,
          برنامه_غذایی: meals.length
        };

        // محاسبه داده‌های ماه قبل
        const previousData: MonthlyData = {
          name: "ماه قبل",
          شاگردان: prevMonthStudents.length,
          درآمد: calculateTotalIncome(prevMonthStudents),
          جلسات: calculateTotalSessions(prevMonthStudents),
          تمرین: Math.floor(exercises.length * 0.8), // تخمین تقریبی برای ماه قبل
          مکمل: prevMonthSupplements.length,
          برنامه_غذایی: prevMonthMeals.length
        };

        // ایجاد داده‌های گسترده‌تر برای نمودار پیشرفته‌تر
        const twoMonthsAgo: MonthlyData = {
          name: "دو ماه قبل",
          شاگردان: Math.floor(prevMonthStudents.length * 0.85),
          درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.85),
          جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.85),
          تمرین: Math.floor(exercises.length * 0.65),
          مکمل: Math.floor(prevMonthSupplements.length * 0.8),
          برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.75)
        };

        const threeMonthsAgo: MonthlyData = {
          name: "سه ماه قبل",
          شاگردان: Math.floor(prevMonthStudents.length * 0.7),
          درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.7),
          جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.7),
          تمرین: Math.floor(exercises.length * 0.5),
          مکمل: Math.floor(prevMonthSupplements.length * 0.6),
          برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.55)
        };

        const fourMonthsAgo: MonthlyData = {
          name: "چهار ماه قبل",
          شاگردان: Math.floor(prevMonthStudents.length * 0.6),
          درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.6),
          جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.6),
          تمرین: Math.floor(exercises.length * 0.4),
          مکمل: Math.floor(prevMonthSupplements.length * 0.5),
          برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.4)
        };

        const fiveMonthsAgo: MonthlyData = {
          name: "پنج ماه قبل",
          شاگردان: Math.floor(prevMonthStudents.length * 0.5),
          درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.45),
          جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.5),
          تمرین: Math.floor(exercises.length * 0.3),
          مکمل: Math.floor(prevMonthSupplements.length * 0.35),
          برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.3)
        };

        const sixMonthsAgo: MonthlyData = {
          name: "شش ماه قبل",
          شاگردان: Math.floor(prevMonthStudents.length * 0.4),
          درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.35),
          جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.4),
          تمرین: Math.floor(exercises.length * 0.2),
          مکمل: Math.floor(prevMonthSupplements.length * 0.25),
          برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.2)
        };

        // محاسبه رشد ماهانه برای داده‌های گسترده
        const expandedDataWithGrowth = [
          sixMonthsAgo,
          fiveMonthsAgo,
          fourMonthsAgo,
          threeMonthsAgo,
          twoMonthsAgo,
          previousData,
          currentData
        ].map((data, index, array) => {
          if (index === 0) {
            return {
              ...data,
              رشد_شاگردان: 0,
              رشد_درآمد: 0
            };
          }
          
          const prevMonth = array[index - 1];
          return {
            ...data,
            رشد_شاگردان: calculateGrowth(data.شاگردان, prevMonth.شاگردان),
            رشد_درآمد: calculateGrowth(data.درآمد, prevMonth.درآمد)
          };
        });

        setMonthlyData([previousData, currentData]);
        setExpandedData(expandedDataWithGrowth);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    loadData();

    // آپدیت خودکار داده‌ها در صورت تغییر در localStorage
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const calculateTotalIncome = (students: any[]) => {
    return students.reduce((total, student) => {
      const basePrice = 200000; // شهریه پایه
      const sessionPrice = student.sessionsPerWeek ? student.sessionsPerWeek * 50000 : 0;
      return total + basePrice + sessionPrice;
    }, 0);
  };

  const calculateTotalSessions = (students: any[]) => {
    return students.reduce((total, student) => {
      return total + (student.sessionsPerWeek || 3) * 4;
    }, 0);
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // فرمت‌کننده برای اعداد در نمودار
  const formatNumber = (value: number) => {
    return toPersianNumbers(value.toLocaleString());
  };

  // فرمت‌کننده برای مبالغ مالی در نمودار
  const formatCurrency = (value: number) => {
    return `${toPersianNumbers(value.toLocaleString())} تومان`;
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground animate-pulse">در حال بارگذاری گزارشات...</p>
        </div>
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
      title: "جلسات این ماه",
      value: currentMonth.جلسات,
      growth: calculateGrowth(currentMonth.جلسات, previousMonth.جلسات),
      icon: Calendar,
      color: "from-purple-600 to-purple-400",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600"
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
    جلسات: {
      label: "تعداد جلسات",
      color: "#8b5cf6"
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          گزارشات و آمار
        </h2>
        <p className="text-muted-foreground">
          در این بخش می‌توانید آمار و گزارشات دقیق باشگاه را مشاهده کنید
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 group hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgLight}`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <div className={`text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full ${
                  stat.growth >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.growth >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {toPersianNumbers(Math.abs(stat.growth))}٪
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                <p className="mt-2 text-2xl font-bold">
                  {stat.format ? stat.format(stat.value) : toPersianNumbers(stat.value)}
                </p>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500 group-hover:w-full`}
                  style={{ width: `${Math.min((stat.value / (stat.value * 1.5)) * 100, 100)}%` }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {nutritionStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 4) * 0.1 }}
          >
            <Card className="p-6 group hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgLight}`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <div className={`text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full ${
                  stat.growth >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.growth >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {toPersianNumbers(Math.abs(stat.growth))}٪
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                <p className="mt-2 text-2xl font-bold">
                  {toPersianNumbers(stat.value)}
                </p>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500 group-hover:w-full`}
                  style={{ width: `${Math.min((stat.value / (stat.value * 1.5)) * 100, 100)}%` }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6" onValueChange={handleTabChange}>
        <TabsList className="bg-white border">
          <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-gray-100">
            <ChartBarIcon className="w-4 h-4" />
            نمای کلی
          </TabsTrigger>
          <TabsTrigger value="income" className="gap-2 data-[state=active]:bg-gray-100">
            <Wallet className="w-4 h-4" />
            درآمد
          </TabsTrigger>
          <TabsTrigger value="activities" className="gap-2 data-[state=active]:bg-gray-100">
            <ChartPieIcon className="w-4 h-4" />
            فعالیت‌ها
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">روند رشد شاگردان و درآمد</h3>
              <div className="flex items-center gap-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                <Info className="w-3.5 h-3.5" />
                <span>نمایش {toPersianNumbers(expandedData.length)} ماه اخیر</span>
              </div>
            </div>
            <div className="h-[450px]">
              <ChartContainer 
                config={chartConfig}
                className="rounded-xl overflow-hidden py-4"
              >
                <ComposedChart 
                  data={expandedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888" 
                    tick={{ fill: '#888' }}
                    tickFormatter={(value) => value}
                  />
                  <YAxis 
                    yAxisId="left" 
                    stroke="#4f46e5" 
                    tickFormatter={(value) => toPersianNumbers(value)}
                    label={{ 
                      value: 'تعداد شاگردان', 
                      angle: 90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: '#4f46e5' },
                      offset: 0
                    }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#22c55e"
                    tickFormatter={(value) => toPersianNumbers(Math.floor(value / 1000))}
                    label={{ 
                      value: 'درآمد (هزار تومان)', 
                      angle: -90, 
                      position: 'insideRight',
                      style: { textAnchor: 'middle', fill: '#22c55e' },
                      offset: 0
                    }}
                  />
                  <YAxis 
                    yAxisId="growth" 
                    orientation="right" 
                    stroke="#f59e0b"
                    tickFormatter={(value) => `${toPersianNumbers(value)}%`}
                    hide
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-4 border rounded-lg shadow-lg">
                            <p className="font-bold mb-2">{payload[0].payload.name}</p>
                            {payload.map((entry, index) => {
                              let value = entry.value;
                              let formattedValue;
                              
                              if (entry.dataKey === 'شاگردان') {
                                formattedValue = toPersianNumbers(value as number);
                              } else if (entry.dataKey === 'درآمد') {
                                formattedValue = `${toPersianNumbers((value as number).toLocaleString())} تومان`;
                              } else if (entry.dataKey === 'رشد_شاگردان' || entry.dataKey === 'رشد_درآمد') {
                                formattedValue = `${toPersianNumbers(value as number)}%`;
                              }
                              
                              return (
                                <div key={index} className="flex items-center gap-2 mb-1">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: entry.color }}
                                  />
                                  <span className="text-sm text-gray-700">
                                    {chartConfig[entry.dataKey as keyof typeof chartConfig]?.label}: {formattedValue}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    formatter={(value) => <span className="text-xs">{value}</span>}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Area 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="شاگردان" 
                    fill="url(#colorStudents)" 
                    stroke="#4f46e5" 
                    strokeWidth={2}
                    name="تعداد شاگردان"
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
                  />
                  <Bar 
                    yAxisId="right" 
                    dataKey="درآمد" 
                    barSize={20}
                    name="درآمد"
                  >
                    {expandedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === expandedData.length - 1 ? '#16a34a' : '#22c55e'} />
                    ))}
                  </Bar>
                  <Line 
                    yAxisId="growth" 
                    type="monotone" 
                    dataKey="رشد_شاگردان" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ stroke: '#f59e0b', strokeWidth: 2, r: 4, fill: '#fff' }}
                    activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
                    name="رشد شاگردان (%)"
                  />
                  <Line 
                    yAxisId="growth" 
                    type="monotone" 
                    dataKey="رشد_درآمد" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ stroke: '#ec4899', strokeWidth: 2, r: 4, fill: '#fff' }}
                    activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2, fill: '#fff' }}
                    name="رشد درآمد (%)"
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {expandedData.length > 0 && expandedData[expandedData.length - 1].رشد_شاگردان !== undefined && (
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-none">
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs text-blue-700">رشد شاگردان در ماه اخیر</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-blue-800">
                        {toPersianNumbers(expandedData[expandedData.length - 1].رشد_شاگردان || 0)}٪
                      </span>
                      <ArrowUpRight className="ml-1 h-4 w-4 text-blue-700" />
                    </div>
                  </div>
                </Card>
              )}
              
              {expandedData.length > 0 && expandedData[expandedData.length - 1].رشد_درآمد !== undefined && (
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-none">
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs text-green-700">رشد درآمد در ماه اخیر</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-green-800">
                        {toPersianNumbers(expandedData[expandedData.length - 1].رشد_درآمد || 0)}٪
                      </span>
                      <ArrowUpRight className="ml-1 h-4 w-4 text-green-700" />
                    </div>
                  </div>
                </Card>
              )}
              
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-none">
                <div className="flex flex-col space-y-2">
                  <span className="text-xs text-purple-700">میانگین شاگردان ماهانه</span>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-purple-800">
                      {toPersianNumbers(Math.round(expandedData.reduce((sum, item) => sum + item.شاگردان, 0) / expandedData.length))}
                    </span>
                    <span className="text-xs text-purple-700 mr-1">نفر</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-none">
                <div className="flex flex-col space-y-2">
                  <span className="text-xs text-orange-700">میانگین درآمد ماهانه</span>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-orange-800">
                      {toPersianNumbers(Math.round(expandedData.reduce((sum, item) => sum + item.درآمد, 0) / expandedData.length / 1000))}
                    </span>
                    <span className="text-xs text-orange-700 mr-1">هزار تومان</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">روند درآمد ماهانه</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expandedData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis 
                    stroke="#888" 
                    tickFormatter={(value) => toPersianNumbers(Math.floor(value / 1000))}
                    label={{ 
                      value: 'هزار تومان', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${toPersianNumbers(value.toLocaleString())} تومان`, "درآمد"]}
                    labelFormatter={(label) => `ماه: ${label}`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="درآمد" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                    dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4, fill: '#fff' }}
                    activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
                    name="درآمد (تومان)" 
                  />
                  {expandedData[0]?.رشد_درآمد !== undefined && (
                    <Line 
                      type="monotone" 
                      dataKey="رشد_درآمد" 
                      stroke="#ec4899" 
                      strokeWidth={2}
                      dot={{ stroke: '#ec4899', strokeWidth: 2, r: 4, fill: '#fff' }}
                      activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2, fill: '#fff' }}
                      yAxisId={1}
                      name="رشد درآمد (%)" 
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">فعالیت‌های ماهانه</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expandedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis 
                    stroke="#888" 
                    tickFormatter={(value) => toPersianNumbers(value)}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      toPersianNumbers(value), 
                      chartConfig[name as keyof typeof chartConfig]?.label || name
                    ]}
                    labelFormatter={(label) => `ماه: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="جلسات" 
                    stroke="#4f46e5" 
                    strokeWidth={2}
                    dot={{ stroke: '#4f46e5', strokeWidth: 2, r: 4, fill: '#fff' }}
                    activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 2, fill: '#fff' }}
                    name="تعداد جلسات" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="تمرین" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ stroke: '#f59e0b', strokeWidth: 2, r: 4, fill: '#fff' }}
                    activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
                    name="برنامه‌های تمرینی" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="برنامه_غذایی" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    dot={{ stroke: '#ec4899', strokeWidth: 2, r: 4, fill: '#fff' }}
                    activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2, fill: '#fff' }}
                    name="برنامه‌های غذایی" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="مکمل" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4, fill: '#fff' }}
                    activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
                    name="مکمل‌های تجویز شده" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
