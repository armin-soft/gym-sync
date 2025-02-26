
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
  CartesianGrid
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
  Pill
} from "lucide-react";
import { motion } from "framer-motion";

interface MonthlyData {
  name: string;
  شاگردان: number;
  درآمد: number;
  جلسات: number;
  تمرین: number;
  مکمل: number;
  برنامه_غذایی: number;
}

const Reports = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

        setMonthlyData([previousData, currentData]);
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

      <Tabs defaultValue="overview" className="space-y-6">
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
            <h3 className="text-lg font-semibold mb-6">روند رشد شاگردان و درآمد</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis yAxisId="left" stroke="#888" />
                  <YAxis yAxisId="right" orientation="right" stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    yAxisId="left" 
                    dataKey="شاگردان" 
                    fill="#4f46e5" 
                    name="تعداد شاگردان"
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    yAxisId="right" 
                    dataKey="درآمد" 
                    fill="#22c55e" 
                    name="درآمد (تومان)"
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">روند درآمد ماهانه</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="درآمد" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4, fill: '#fff' }}
                    activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
                    name="درآمد (تومان)" 
                  />
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
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
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
