
import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "فروردین",
    شاگردان: 10,
    درآمد: 2000000,
  },
  {
    name: "اردیبهشت",
    شاگردان: 15,
    درآمد: 3000000,
  },
  {
    name: "خرداد",
    شاگردان: 20,
    درآمد: 4000000,
  },
  {
    name: "تیر",
    شاگردان: 25,
    درآمد: 5000000,
  },
];

const Reports = () => {
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
          <p className="mt-2 text-3xl font-bold">۲۵</p>
          <p className="text-xs text-green-500 mt-1">۲۰٪ رشد نسبت به ماه قبل</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">درآمد ماهانه</h3>
          <p className="mt-2 text-3xl font-bold">۵,۰۰۰,۰۰۰ تومان</p>
          <p className="text-xs text-green-500 mt-1">۱۵٪ رشد نسبت به ماه قبل</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">شاگردان فعال</h3>
          <p className="mt-2 text-3xl font-bold">۲۰</p>
          <p className="text-xs text-muted-foreground mt-1">۸۰٪ از کل شاگردان</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">جلسات این ماه</h3>
          <p className="mt-2 text-3xl font-bold">۱۲۰</p>
          <p className="text-xs text-green-500 mt-1">۱۰٪ رشد نسبت به ماه قبل</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">روند رشد شاگردان و درآمد</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="شاگردان" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="درآمد" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
