
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Clock, Users, MapPin, Phone, Mail } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Dumbbell,
      title: "تجهیزات مدرن",
      description: "مجهز به جدیدترین دستگاه‌های بدنسازی با کیفیت بالا",
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      description: "همه روزه از ساعت ۷ صبح تا ۱۲ شب",
    },
    {
      icon: Users,
      title: "مربیان مجرب",
      description: "تیم مربیگری با تجربه و دارای مدارک معتبر بین‌المللی",
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
          <CardTitle>امکانات باشگاه</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>فضای مجزا برای تمرینات قدرتی و هوازی</li>
            <li>سالن بدنسازی مجهز با متراژ ۵۰۰ متر</li>
            <li>دستگاه‌های پیشرفته و استاندارد</li>
            <li>رختکن و سرویس بهداشتی مجهز</li>
            <li>پارکینگ اختصاصی</li>
            <li>کافه با منوی غذایی سالم و مکمل‌های ورزشی</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>ارتباط با ما</CardTitle>
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
    </div>
  );
};

export default About;
