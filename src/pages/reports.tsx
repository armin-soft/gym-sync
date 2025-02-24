
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

// داده‌های نمونه - در نسخه واقعی باید از دیتابیس خوانده شود
const monthlyData = [
  {
    name: "فروردین",
    شاگردان: 10,
    درآمد: 2000000,
    جلسات: 40,
    تمرین: 30,
    مکمل: 5,
  },
  {
    name: "اردیبهشت",
    شاگردان: 15,
    درآمد: 3000000,
    جلسات: 60,
    تمرین: 45,
    مکمل: 8,
  },
  {
    name: "خرداد",
    شاگردان: 20,
    درآمد: 4000000,
    جلسات: 80,
    تمرین: 60,
    مکمل: 12,
  },
  {
    name: "تیر",
    شاگردان: 25,
    درآمد: 5000000,
    جلسات: 100,
    تمرین: 75,
    مکمل: 15,
  },
];

const Reports = () => {
  // محاسبه درصد رشد نسبت به ماه قبل
  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

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
