
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

        // ایجاد داده‌های تاریخی
        const { monthlyData, expandedData } = generateHistoricalData(
          students,
          prevMonthStudents,
          prevMonthSupplements,
          prevMonthMeals,
          exercises,
          supplements,
          meals
        );

        setMonthlyData(monthlyData);
        setExpandedData(expandedData);
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
          />
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
          <MonthlyDataChart 
            data={expandedData} 
            chartConfig={chartConfig} 
          />
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <IncomeChart data={expandedData} />
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <ActivitiesChart 
            data={expandedData} 
            chartConfig={chartConfig} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
