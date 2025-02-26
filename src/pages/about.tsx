
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Phone, Mail, Dumbbell, Clock, ListChecks, 
  Globe, MonitorSmartphone, Bot, Database, PenTool, 
  Brain, MessageCircle, BrainCircuit, Sparkles, Shield,
  BarChart, Zap, Award, Target, LineChart, UserCog
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/reports/StatCard";

const About = () => {
  const [activeTab, setActiveTab] = useState("features");

  const features = [
    {
      icon: Users,
      title: "مدیریت شاگردان",
      description: "ثبت و مدیریت اطلاعات شاگردان، پیگیری پیشرفت و ثبت اندازه گیری ها",
      bgLight: "bg-blue-50",
      color: "from-blue-400 to-blue-600",
      textColor: "text-blue-600"
    },
    {
      icon: Dumbbell,
      title: "برنامه های تمرینی",
      description: "ایجاد و مدیریت برنامه های تمرینی اختصاصی برای هر شاگرد",
      bgLight: "bg-purple-50",
      color: "from-purple-400 to-purple-600",
      textColor: "text-purple-600"
    },
    {
      icon: Clock,
      title: "مدیریت زمان",
      description: "برنامه ریزی جلسات تمرینی و پیگیری حضور و غیاب",
      bgLight: "bg-emerald-50",
      color: "from-emerald-400 to-emerald-600",
      textColor: "text-emerald-600"
    },
    {
      icon: ListChecks,
      title: "برنامه غذایی",
      description: "تنظیم رژیم غذایی و برنامه مکمل و ویتامین ورزشی",
      bgLight: "bg-amber-50",
      color: "from-amber-400 to-amber-600",
      textColor: "text-amber-600"
    }
  ];

  const stats = [
    {
      title: "شاگردان فعال",
      value: 120,
      growth: 18,
      icon: Users,
      color: "from-blue-400 to-blue-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "برنامه‌های تمرینی",
      value: 85,
      growth: 12,
      icon: Dumbbell,
      color: "from-purple-400 to-purple-600",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "جلسات هفتگی",
      value: 235,
      growth: -5,
      icon: Clock,
      color: "from-emerald-400 to-emerald-600",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "برنامه‌های غذایی",
      value: 72,
      growth: 28,
      icon: ListChecks,
      color: "from-amber-400 to-amber-600",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-4xl mx-auto"
      >
        <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          سیستم مدیریت برنامه تمرینی فیکس
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          نرم افزار جامع مدیریت باشگاه و برنامه های تمرینی، طراحی شده برای مربیان و مدیران باشگاه های ورزشی
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button size="lg" className="gap-2 rounded-full">
            <Zap className="w-4 h-4" />
            شروع رایگان
          </Button>
          <Button variant="outline" size="lg" className="gap-2 rounded-full">
            <Globe className="w-4 h-4" />
            مشاهده دمو
          </Button>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">امکانات سیستم</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            تمام ابزارهایی که برای مدیریت حرفه‌ای باشگاه و مربی‌گری نیاز دارید
          </p>
        </div>
        
        <Tabs defaultValue="features" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">امکانات اصلی</TabsTrigger>
            <TabsTrigger value="detailed">جزئیات کامل</TabsTrigger>
            <TabsTrigger value="technical">مشخصات فنی</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-4">
            <motion.div 
              variants={container}
              initial="hidden"
              animate={activeTab === "features" ? "show" : "hidden"}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {features.map((feature, index) => (
                <motion.div key={feature.title} variants={item} custom={index}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                         style={{ background: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}></div>
                    <CardHeader>
                      <div className={`p-3 rounded-xl ${feature.bgLight} w-fit mb-4`}>
                        <feature.icon className={`w-6 h-6 ${feature.textColor}`} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="detailed">
            <Card>
              <CardHeader>
                <CardTitle>امکانات تفصیلی سیستم</CardTitle>
                <CardDescription>مجموعه کاملی از ابزارهای مدیریتی برای باشگاه و مربیان</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-50 p-2 rounded-full">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-lg">مدیریت شاگردان</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                        <li>ثبت اطلاعات کامل شاگردان</li>
                        <li>پیگیری پیشرفت و تغییرات بدنی</li>
                        <li>مدیریت پرداخت ها و شهریه</li>
                        <li>گزارش گیری از عملکرد</li>
                        <li>تاریخچه تمرینات و اندازه گیری ها</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-emerald-50 p-2 rounded-full">
                          <Clock className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="font-semibold text-lg">مدیریت زمان</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                        <li>تقویم جلسات تمرینی</li>
                        <li>سیستم رزرو آنلاین</li>
                        <li>یادآوری اتوماتیک جلسات</li>
                        <li>ثبت حضور و غیاب</li>
                        <li>آنالیز زمان‌بندی جلسات</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-50 p-2 rounded-full">
                          <Dumbbell className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-lg">برنامه های تمرینی</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                        <li>طراحی برنامه های تمرینی اختصاصی</li>
                        <li>کتابخانه حرکات تمرینی</li>
                        <li>تنظیم ست و تکرار و شدت</li>
                        <li>الگوهای تمرینی آماده</li>
                        <li>پیگیری پیشرفت تمرینات</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-50 p-2 rounded-full">
                          <ListChecks className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="font-semibold text-lg">تغذیه و مکمل</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                        <li>تنظیم برنامه غذایی روزانه</li>
                        <li>محاسبه کالری و ماکروها</li>
                        <li>تجویز مکمل و ویتامین ورزشی</li>
                        <li>پیگیری وضعیت تغذیه</li>
                        <li>الگوهای غذایی متنوع</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>مشخصات فنی سیستم</CardTitle>
                <CardDescription>زیرساخت‌های فنی و تکنولوژی‌های استفاده شده</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">امنیت و حریم خصوصی</h4>
                        <p className="text-sm text-muted-foreground">رمزنگاری داده‌های حساس، احراز هویت دو مرحله‌ای و پشتیبان‌گیری خودکار از اطلاعات</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">عملکرد بهینه</h4>
                        <p className="text-sm text-muted-foreground">سرعت بالا در پردازش اطلاعات، بهینه‌سازی برای استفاده کم حافظه و باتری</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">گزارش‌گیری پیشرفته</h4>
                        <p className="text-sm text-muted-foreground">نمودارها و گزارش‌های تحلیلی، داشبوردهای قابل شخصی‌سازی و خروجی PDF</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">کیفیت تضمین شده</h4>
                        <p className="text-sm text-muted-foreground">تست‌های کامل نرم‌افزاری، پشتیبانی فنی ۲۴ ساعته و بروزرسانی‌های منظم</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <UserCog className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">تجربه کاربری</h4>
                        <p className="text-sm text-muted-foreground">رابط کاربری ساده و زیبا، بهینه‌سازی شده برای تلفن همراه و تبلت</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">دسترسی آنلاین</h4>
                        <p className="text-sm text-muted-foreground">همگام‌سازی خودکار اطلاعات، امکان کار آفلاین و دسترسی از هر دستگاه</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-6">
                <Button variant="outline" className="gap-2">
                  <Target className="w-4 h-4" />
                  <span>دریافت نسخه آزمایشی</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Developer section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-8"
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600/10 to-primary/10 p-8">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl">توسعه دهنده نرم افزار</CardTitle>
              <CardDescription>
                آرمین سافت - متخصص در طراحی و توسعه نرم افزارهای سفارشی
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pt-4">
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-xl mb-4">تخصص ها و خدمات</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3 bg-white/50 p-4 rounded-lg hover:bg-white/80 transition-colors">
                      <MonitorSmartphone className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">توسعه نرم افزارهای رایانه و موبایل</h4>
                        <p className="text-sm text-muted-foreground">ویندوز، مک، لینوکس، اندروید، iOS</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/50 p-4 rounded-lg hover:bg-white/80 transition-colors">
                      <Bot className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">توسعه ربات ها و هوش مصنوعی</h4>
                        <p className="text-sm text-muted-foreground">اسکریپت ها و ربات های تلگرام</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/50 p-4 rounded-lg hover:bg-white/80 transition-colors">
                      <Database className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">طراحی وب سرویس های اینترنتی</h4>
                        <p className="text-sm text-muted-foreground">سرویس نرم افزار و اپلیکیشن، دیتابیس و درگاه رابط</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/50 p-4 rounded-lg hover:bg-white/80 transition-colors">
                      <PenTool className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">طراحی وب سایت</h4>
                        <p className="text-sm text-muted-foreground">پنل سایت های دینامیک و استاتیک</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <BrainCircuit className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                    <p className="text-muted-foreground">
                      آرمین سافت با دیدگاهی خلاقانه و با تکیه بر دانش فنی خود، هر ایده ای را که در ذهن داشته باشید، طراحی و پیاده سازی می کند. او با تعهد به نوآوری و پیشرفت، در تلاش است تا با ارائه خدمات با کیفیت و حرفه ای، نیازهای مشتریان خود را به بهترین شکل ممکن برآورده سازد.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-0 pt-4 flex flex-wrap gap-4">
              <Button variant="outline" size="sm" className="gap-2 bg-white/80 hover:bg-white transition-colors">
                <MessageCircle className="w-4 h-4" />
                <a href="https://t.me/ARMIN_SOFT" className="hover:underline">تلگرام شخصی</a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-white/80 hover:bg-white transition-colors">
                <MessageCircle className="w-4 h-4" />
                <a href="https://t.me/Channel_ARMINSOFT" className="hover:underline">کانال تلگرام</a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-white/80 hover:bg-white transition-colors">
                <Phone className="w-4 h-4" />
                <a href="https://wa.me/989358983854" className="hover:underline persian-numbers" dir="ltr">واتساپ: ۰۹۳۵۸۹۸۳۸۵۴</a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-white/80 hover:bg-white transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@armin-soft.ir" className="hover:underline">info@armin-soft.ir</a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-white/80 hover:bg-white transition-colors">
                <Globe className="w-4 h-4" />
                <a href="https://armin-soft.ir" className="hover:underline">وب سایت رسمی</a>
              </Button>
            </CardFooter>
          </div>
        </Card>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="py-8"
      >
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary to-blue-600 text-white">
          <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-4 text-center md:text-right">
              <h2 className="text-2xl font-bold">آماده ارتقای باشگاه خود هستید؟</h2>
              <p>سیستم مدیریت برنامه تمرینی فیکس، همه آنچه برای موفقیت نیاز دارید را فراهم می‌کند.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
                <LineChart className="w-4 h-4" />
                درخواست دمو
              </Button>
              <Button size="lg" className="gap-2 bg-white/20 hover:bg-white/30 backdrop-blur">
                <Phone className="w-4 h-4" />
                تماس با ما
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default About;
