
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Dumbbell, Apple, Pill, Target, Calendar, 
  TrendingUp, Award, Clock, Activity, Heart
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  progress?: number;
  badge?: string;
  gradient: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, value, subtitle, icon: Icon, progress, badge, gradient, index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
        
        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            {badge && (
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                {badge}
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
            
            {progress !== undefined && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">
                  {toPersianNumbers(progress.toString())}% تکمیل شده
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const StudentStatsGrid = () => {
  const stats = [
    {
      title: "تمرینات امروز",
      value: toPersianNumbers("8"),
      subtitle: "از ۱۰ تمرین برنامه‌ریزی شده",
      icon: Dumbbell,
      progress: 80,
      badge: "فعال",
      gradient: "from-emerald-500 to-green-600"
    },
    {
      title: "وعده‌های غذایی",
      value: toPersianNumbers("3"),
      subtitle: "از ۵ وعده امروز",
      icon: Apple,
      progress: 60,
      gradient: "from-sky-500 to-blue-600"
    },
    {
      title: "مکمل‌ها",
      value: toPersianNumbers("2"),
      subtitle: "از ۳ مکمل روزانه",
      icon: Pill,
      progress: 66,
      gradient: "from-purple-500 to-violet-600"
    },
    {
      title: "اهداف هفتگی",
      value: toPersianNumbers("85"),
      subtitle: "درصد تکمیل",
      icon: Target,
      progress: 85,
      badge: "عالی",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "روزهای فعالیت",
      value: toPersianNumbers("12"),
      subtitle: "روز متوالی",
      icon: Calendar,
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      title: "پیشرفت کلی",
      value: toPersianNumbers("92"),
      subtitle: "درصد بهبود",
      icon: TrendingUp,
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          {...stat}
          index={index}
        />
      ))}
    </div>
  );
};
