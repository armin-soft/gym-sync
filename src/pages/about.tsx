
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Dumbbell, Clock, ListChecks, 
  UtensilsCrossed, LineChart, Pill, User2,
  ArrowRight, InfoIcon, Sparkles
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  const [activeTab, setActiveTab] = useState("features");

  const mainFeatures = [
    {
      icon: User2,
      title: "پروفایل مربی",
      description: "مدیریت اطلاعات شخصی و حرفه‌ای مربی ورزشی",
      route: "/Coach-Profile",
      bgLight: "bg-blue-50",
      color: "from-blue-400 to-blue-600",
      textColor: "text-blue-600"
    },
    {
      icon: Users,
      title: "مدیریت شاگردان",
      description: "ثبت و مدیریت اطلاعات شاگردان و هنرجویان",
      route: "/Students",
      bgLight: "bg-purple-50",
      color: "from-purple-400 to-purple-600",
      textColor: "text-purple-600"
    },
    {
      icon: Dumbbell,
      title: "حرکات تمرینی",
      description: "مدیریت انواع، دسته‌بندی‌ها و حرکات تمرینی",
      route: "/Exercise-Movements",
      bgLight: "bg-emerald-50",
      color: "from-emerald-400 to-emerald-600",
      textColor: "text-emerald-600"
    },
    {
      icon: UtensilsCrossed,
      title: "برنامه‌های غذایی",
      description: "تنظیم و مدیریت برنامه‌های غذایی روزانه هفتگی",
      route: "/Diet-Plan",
      bgLight: "bg-amber-50",
      color: "from-amber-400 to-amber-600",
      textColor: "text-amber-600"
    },
    {
      icon: Pill,
      title: "مکمل و ویتامین",
      description: "مدیریت مکمل‌ها و ویتامین‌های تجویز شده",
      route: "/Supplements-Vitamins",
      bgLight: "bg-red-50",
      color: "from-red-400 to-red-600",
      textColor: "text-red-600"
    },
    {
      icon: LineChart,
      title: "گزارشات",
      description: "مشاهده و تحلیل گزارش‌های عملکرد و پیشرفت",
      route: "/Reports",
      bgLight: "bg-indigo-50",
      color: "from-indigo-400 to-indigo-600",
      textColor: "text-indigo-600"
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
    <div className="container mx-auto py-12 px-4 space-y-12 text-right" dir="rtl">
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
      </motion.div>

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
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="features">امکانات اصلی</TabsTrigger>
            <TabsTrigger value="detailed">جزئیات بیشتر</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-4">
            <motion.div 
              variants={container}
              initial="hidden"
              animate={activeTab === "features" ? "show" : "hidden"}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {mainFeatures.map((feature, index) => (
                <motion.div key={feature.title} variants={item} custom={index}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                         style={{ background: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className={`p-3 rounded-xl ${feature.bgLight} w-fit mb-4`}>
                          <feature.icon className={`w-6 h-6 ${feature.textColor}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground mb-4">{feature.description}</p>
                        <div className="mt-auto pt-4">
                          <Button 
                            variant="ghost" 
                            className={`${feature.textColor} hover:bg-${feature.bgLight}`}
                            asChild
                          >
                            <a href={feature.route} className="flex items-center gap-2">
                              مشاهده بخش
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="detailed">
            <Card>
              <CardContent className="p-6 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-50 p-2 rounded-full">
                        <User2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-lg">پروفایل مربی</h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                      <li>ثبت و ویرایش اطلاعات شخصی مربی</li>
                      <li>بارگذاری و مدیریت عکس پروفایل</li>
                      <li>ثبت سوابق و تخصص‌های حرفه‌ای</li>
                      <li>ثبت اطلاعات تماس و شبکه‌های اجتماعی</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-50 p-2 rounded-full">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-lg">مدیریت شاگردان</h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                      <li>ثبت اطلاعات کامل شاگردان</li>
                      <li>مدیریت وضعیت عضویت و فعال/غیرفعال</li>
                      <li>ثبت اطلاعات تماس و مشخصات فردی</li>
                      <li>ثبت شاخص‌های بدنی و سلامتی</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-50 p-2 rounded-full">
                        <Dumbbell className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="font-semibold text-lg">حرکات تمرینی</h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                      <li>مدیریت انواع حرکات ورزشی</li>
                      <li>دسته‌بندی حرکات بر اساس گروه عضلانی</li>
                      <li>ثبت و ویرایش حرکات تمرینی</li>
                      <li>مدیریت گروه‌بندی و سازماندهی حرکات</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-50 p-2 rounded-full">
                        <UtensilsCrossed className="w-5 h-5 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-lg">برنامه‌های غذایی</h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                      <li>تنظیم برنامه غذایی روزانه و هفتگی</li>
                      <li>مدیریت وعده‌های اصلی و میان وعده‌ها</li>
                      <li>جستجو و فیلتر کردن برنامه‌ها</li>
                      <li>سازماندهی برنامه‌ها بر اساس روزهای هفته</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-red-50 p-2 rounded-full">
                        <Pill className="w-5 h-5 text-red-600" />
                      </div>
                      <h3 className="font-semibold text-lg">مکمل و ویتامین</h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                      <li>مدیریت انواع مکمل‌ها و ویتامین‌ها</li>
                      <li>دسته‌بندی مکمل‌ها بر اساس نوع و کاربرد</li>
                      <li>ثبت و مدیریت اطلاعات مکمل‌ها</li>
                      <li>توضیحات و دستورالعمل‌های مصرف</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-50 p-2 rounded-full">
                        <LineChart className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-lg">گزارشات</h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-8">
                      <li>نمودارهای آماری و گزارش‌های تحلیلی</li>
                      <li>نمایش روند فعالیت‌های ماهانه</li>
                      <li>نمودارهای درآمد و عملکرد</li>
                      <li>خلاصه وضعیت کلی باشگاه و شاگردان</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default About;
