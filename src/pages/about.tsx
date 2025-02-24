
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Phone, Mail, Dumbbell, Clock, ListChecks } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "مدیریت شاگردان",
      description: "ثبت و مدیریت اطلاعات شاگردان، پیگیری پیشرفت و ثبت اندازه‌گیری‌ها",
    },
    {
      icon: Dumbbell,
      title: "برنامه‌های تمرینی",
      description: "ایجاد و مدیریت برنامه‌های تمرینی اختصاصی برای هر شاگرد",
    },
    {
      icon: Clock,
      title: "مدیریت زمان",
      description: "برنامه‌ریزی جلسات تمرینی و پیگیری حضور و غیاب",
    },
    {
      icon: ListChecks,
      title: "برنامه غذایی",
      description: "تنظیم رژیم غذایی و برنامه مکمل‌های ورزشی",
    }
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">سیستم مدیریت برنامه تمرینی</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          نرم‌افزار جامع مدیریت باشگاه و برنامه‌های تمرینی، طراحی شده برای مربیان و مدیران باشگاه‌های ورزشی
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="text-center">
            <CardHeader>
              <feature.icon className="w-12 h-12 mx-auto text-primary" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>قابلیت‌های سیستم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">مدیریت شاگردان</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>ثبت اطلاعات کامل شاگردان</li>
                <li>پیگیری پیشرفت و تغییرات بدنی</li>
                <li>مدیریت پرداخت‌ها و شهریه</li>
                <li>گزارش‌گیری از عملکرد</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">برنامه‌های تمرینی</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>طراحی برنامه‌های تمرینی اختصاصی</li>
                <li>ثبت حرکات و تمرینات</li>
                <li>تنظیم ست و تکرار</li>
                <li>پیگیری پیشرفت تمرینات</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">تغذیه و مکمل</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>تنظیم برنامه غذایی روزانه</li>
                <li>محاسبه کالری و ماکروها</li>
                <li>تجویز مکمل‌های ورزشی</li>
                <li>پیگیری وضعیت تغذیه</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">گزارشات و آمار</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>گزارش عملکرد شاگردان</li>
                <li>نمودارهای پیشرفت</li>
                <li>آمار حضور و غیاب</li>
                <li>گزارش‌های مالی</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>توسعه‌دهنده نرم‌افزار</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">آرمین سافت</h3>
            <p className="text-sm text-muted-foreground mt-1">
              متخصص در توسعه نرم‌افزارهای مدیریت باشگاه و برنامه‌های تمرینی
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            <span className="persian-numbers" dir="ltr">۰۹۱۲۳۴۵۶۷۸۹</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <span>info@arminsoft.ir</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
