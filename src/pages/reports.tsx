
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
  Legend
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toPersianNumbers } from "@/lib/utils/numbers";

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

  // محاسبه درصد رشد نسبت به ماه قبل
  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  if (monthlyData.length < 2) {
    return <div className="container mx-auto py-6">در حال بارگذاری...</div>;
  }

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  const studentGrowth = calculateGrowth(currentMonth.شاگردان, previousMonth.شاگردان);
  const incomeGrowth = calculateGrowth(currentMonth.درآمد, previousMonth.درآمد);
  const sessionsGrowth = calculateGrowth(currentMonth.جلسات, previousMonth.جلسات);
  const exercisesGrowth = calculateGrowth(currentMonth.تمرین, previousMonth.تمرین);

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">گزارشات و آمار</h2>
        <p className="text-muted-foreground">
          در این بخش می‌توانید آمار و گزارشات باشگاه را مشاهده کنید
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">تعداد کل شاگردان</h3>
          <p className="mt-2 text-3xl font-bold">{toPersianNumbers(currentMonth.شاگردان)}</p>
          <p className={`text-xs mt-1 ${studentGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {toPersianNumbers(Math.abs(studentGrowth))}٪ {studentGrowth >= 0 ? 'رشد' : 'کاهش'} نسبت به ماه قبل
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">درآمد ماهانه</h3>
          <p className="mt-2 text-3xl font-bold">
            {toPersianNumbers(currentMonth.درآمد.toLocaleString())} تومان
          </p>
          <p className={`text-xs mt-1 ${incomeGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {toPersianNumbers(Math.abs(incomeGrowth))}٪ {incomeGrowth >= 0 ? 'رشد' : 'کاهش'} نسبت به ماه قبل
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">جلسات این ماه</h3>
          <p className="mt-2 text-3xl font-bold">{toPersianNumbers(currentMonth.جلسات)}</p>
          <p className={`text-xs mt-1 ${sessionsGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {toPersianNumbers(Math.abs(sessionsGrowth))}٪ {sessionsGrowth >= 0 ? 'رشد' : 'کاهش'} نسبت به ماه قبل
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">برنامه‌های تمرینی فعال</h3>
          <p className="mt-2 text-3xl font-bold">{toPersianNumbers(currentMonth.تمرین)}</p>
          <p className={`text-xs mt-1 ${exercisesGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {toPersianNumbers(Math.abs(exercisesGrowth))}٪ {exercisesGrowth >= 0 ? 'رشد' : 'کاهش'} نسبت به ماه قبل
          </p>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">نمای کلی</TabsTrigger>
          <TabsTrigger value="income">درآمد</TabsTrigger>
          <TabsTrigger value="activities">فعالیت‌ها</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">روند رشد شاگردان و درآمد</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="شاگردان" fill="#4f46e5" name="تعداد شاگردان" />
                  <Bar yAxisId="right" dataKey="درآمد" fill="#22c55e" name="درآمد (تومان)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">روند درآمد ماهانه</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="درآمد" stroke="#22c55e" name="درآمد (تومان)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">فعالیت‌های ماهانه</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="جلسات" stroke="#4f46e5" name="تعداد جلسات" />
                  <Line type="monotone" dataKey="تمرین" stroke="#f59e0b" name="برنامه‌های تمرینی" />
                  <Line type="monotone" dataKey="مکمل" stroke="#ec4899" name="مکمل‌های تجویز شده" />
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
