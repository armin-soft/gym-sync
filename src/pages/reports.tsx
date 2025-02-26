
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
  ArrowTrendingUp,
  ArrowTrendingDown,
  Users,
  Dumbbell,
  Wallet,
  Calendar,
  ChartBarIcon,
  ChartPieIcon,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MonthlyData {
  name: string;
  شاگردان: number;
  درآمد: number;
  جلسات: number;
  تمرین: number;
  مکمل: number;
}

const Reports = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    // خواندن داده‌های واقعی از localStorage
    const loadData = () => {
      // خواندن تعداد شاگردان
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      
      // ساخت داده‌های ماهانه بر اساس اطلاعات واقعی
      const currentData: MonthlyData = {
        name: "ماه جاری",
        شاگردان: students.length,
        درآمد: students.length * 200000, // درآمد تخمینی برای هر شاگرد
        جلسات: students.length * 4, // تخمین 4 جلسه در ماه برای هر شاگرد
        تمرین: students.length, // فرض می‌کنیم هر شاگرد یک برنامه تمرینی دارد
        مکمل: Math.floor(students.length * 0.5), // فرض می‌کنیم 50٪ شاگردان مکمل مصرف می‌کنند
      };

      const previousData: MonthlyData = {
        name: "ماه قبل",
        شاگردان: Math.floor(students.length * 0.8), // فرض 20٪ رشد
        درآمد: Math.floor(students.length * 0.8) * 200000,
        جلسات: Math.floor(students.length * 0.8) * 4,
        تمرین: Math.floor(students.length * 0.8),
        مکمل: Math.floor(students.length * 0.8 * 0.5),
      };

      setMonthlyData([previousData, currentData]);
    };

    loadData();
  }, []);

  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  if (monthlyData.length < 2) {
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

  const studentGrowth = calculateGrowth(currentMonth.شاگردان, previousMonth.شاگردان);
  const incomeGrowth = calculateGrowth(currentMonth.درآمد, previousMonth.درآمد);
  const sessionsGrowth = calculateGrowth(currentMonth.جلسات, previousMonth.جلسات);
  const exercisesGrowth = calculateGrowth(currentMonth.تمرین, previousMonth.تمرین);

  const stats = [
    {
      title: "تعداد کل شاگردان",
      value: currentMonth.شاگردان,
      growth: studentGrowth,
      icon: Users,
      color: "from-blue-600 to-blue-400",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "درآمد ماهانه",
      value: currentMonth.درآمد,
      growth: incomeGrowth,
      icon: Wallet,
      color: "from-green-600 to-green-400",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
      format: (value: number) => `${toPersianNumbers(value.toLocaleString())} تومان`
    },
    {
      title: "جلسات این ماه",
      value: currentMonth.جلسات,
      growth: sessionsGrowth,
      icon: Calendar,
      color: "from-purple-600 to-purple-400",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "برنامه‌های تمرینی فعال",
      value: currentMonth.تمرین,
      growth: exercisesGrowth,
      icon: Dumbbell,
      color: "from-orange-600 to-orange-400",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">گزارشات و آمار</h2>
          <p className="text-muted-foreground">
            در این بخش می‌توانید آمار و گزارشات باشگاه را مشاهده کنید
          </p>
        </div>
        <Button className="self-start md:self-center bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
          <Download className="w-4 h-4 ml-2" />
          دانلود گزارش
        </Button>
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
                    <ArrowTrendingUp className="w-3 h-3" />
                  ) : (
                    <ArrowTrendingDown className="w-3 h-3" />
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
                    dataKey="مکمل" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    dot={{ stroke: '#ec4899', strokeWidth: 2, r: 4, fill: '#fff' }}
                    activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2, fill: '#fff' }}
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
