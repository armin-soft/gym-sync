
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Clock, Users, MapPin, Phone, Mail, Shower, Utensils, Car } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Dumbbell,
      title: "بخش تمرینات قدرتی",
      description: "مجهز به انواع دستگاه‌های قدرتی و وزنه‌های آزاد",
    },
    {
      icon: Clock,
      title: "سالن هوازی",
      description: "تجهیزات کاردیو شامل تردمیل، دوچرخه و الپتیکال",
    },
    {
      icon: Users,
      title: "بخش کراس‌فیت",
      description: "فضای مخصوص تمرینات عملکردی و کراس‌فیت",
    },
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">باشگاه بدنسازی فیکس</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          باشگاه بدنسازی فیکس با بیش از ۱۰ سال سابقه درخشان در زمینه پرورش اندام و تناسب اندام، مفتخر است که محیطی حرفه‌ای و استاندارد را برای ورزشکاران عزیز فراهم کرده است.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="text-center">
            <CardHeader>
              <feature.icon className="w-12 h-12 mx-auto text-primary" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>امکانات رفاهی باشگاه</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Shower className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">رختکن و سرویس بهداشتی مجهز</h3>
                <p className="text-sm text-muted-foreground">کمدهای شخصی، دوش‌های مجزا و سرویس‌های بهداشتی تمیز</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Car className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">پارکینگ اختصاصی</h3>
                <p className="text-sm text-muted-foreground">پارکینگ سرپوشیده با ظرفیت ۵۰ خودرو</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Utensils className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">کافه تغذیه سالم</h3>
                <p className="text-sm text-muted-foreground">ارائه نوشیدنی‌های انرژی‌زا، اسموتی و میان‌وعده‌های سالم</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">مربیان متخصص</h3>
                <p className="text-sm text-muted-foreground">تیم مربیگری مجرب با مدارک معتبر بین‌المللی</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>ارتباط با باشگاه</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>تهران، خیابان ولیعصر، خیابان شهید بهشتی، پلاک ۱۲۳</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              <span className="persian-numbers">۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <span>info@fixgym.com</span>
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
    </div>
  );
};

export default About;
