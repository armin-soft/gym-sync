
import { Card } from "@/components/ui/card";
import {
  Users,
  Activity,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  ChartBar,
  Calendar,
  Timer,
  BarChart,
  Settings,
  UserPlus,
  ClipboardList
} from "lucide-react";
import { motion } from "framer-motion";

const AboutPage = () => {
  const features = [
    {
      title: "مدیریت شاگردان",
      description: "ثبت و مدیریت اطلاعات شاگردان به همراه جزئیات کامل و پیگیری پیشرفت",
      icon: Users,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "برنامه های تمرینی",
      description: "طراحی برنامه های تمرینی اختصاصی با جزئیات حرکات و ست ها",
      icon: Dumbbell,
      color: "bg-emerald-500/10 text-emerald-500"
    },
    {
      title: "برنامه های غذایی",
      description: "تنظیم برنامه های غذایی هفتگی با وعده های مشخص و جزئیات کامل",
      icon: UtensilsCrossed,
      color: "bg-amber-500/10 text-amber-500"
    },
    {
      title: "مدیریت مکمل ها",
      description: "ثبت و پیگیری مکمل های تجویز شده برای هر شاگرد",
      icon: Pill,
      color: "bg-purple-500/10 text-purple-500"
    }
  ];

  const additionalFeatures = [
    {
      title: "گزارشات پیشرفته",
      description: "تحلیل و نمایش گزارشات آماری از عملکرد و پیشرفت شاگردان",
      icon: ChartBar,
      color: "bg-pink-500/10 text-pink-500"
    },
    {
      title: "زمان بندی جلسات",
      description: "مدیریت زمان جلسات تمرینی و برنامه ریزی هفتگی",
      icon: Calendar,
      color: "bg-indigo-500/10 text-indigo-500"
    },
    {
      title: "پیگیری زمان",
      description: "ثبت و پیگیری زمان تمرینات و جلسات به صورت دقیق",
      icon: Timer,
      color: "bg-cyan-500/10 text-cyan-500"
    },
    {
      title: "نمودار های پیشرفت",
      description: "نمایش نمودار های پیشرفت و تحلیل عملکرد شاگردان",
      icon: BarChart,
      color: "bg-rose-500/10 text-rose-500"
    },
    {
      title: "تنظیمات پیشرفته",
      description: "امکان شخصی سازی و تنظیم پارامتر های مختلف سیستم",
      icon: Settings,
      color: "bg-slate-500/10 text-slate-500"
    },
    {
      title: "ثبت نام آسان",
      description: "فرآیند ساده و سریع برای ثبت نام شاگردان جدید",
      icon: UserPlus,
      color: "bg-teal-500/10 text-teal-500"
    },
    {
      title: "ثبت گزارشات",
      description: "امکان ثبت گزارشات روزانه و هفتگی از پیشرفت شاگردان",
      icon: ClipboardList,
      color: "bg-orange-500/10 text-orange-500"
    },
    {
      title: "پایش عملکرد",
      description: "بررسی و پایش مستمر عملکرد و فعالیت های شاگردان",
      icon: Activity,
      color: "bg-green-500/10 text-green-500"
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            امکانات اصلی سیستم
          </span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          سیستم مدیریت باشگاه با امکانات پیشرفته و کاربردی برای مدیریت بهتر شاگردان و برنامه های تمرینی
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={item}>
            <Card className="relative overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300 group">
              <div className={`p-3 rounded-xl ${feature.color} w-fit mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            جزئیات بیشتر
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          امکانات پیشرفته و کاربردی بیشتر برای مدیریت بهتر باشگاه
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {additionalFeatures.map((feature) => (
          <motion.div key={feature.title} variants={item}>
            <Card className="relative group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className={`p-3 rounded-xl ${feature.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AboutPage;
