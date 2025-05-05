
import { motion } from "framer-motion";
import { Users, Wallet, Dumbbell, UtensilsCrossed, Pill } from "lucide-react";
import { StatCard } from "@/components/reports/StatCard";
import { calculateGrowth } from "@/lib/utils/reports";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatCardsSectionProps {
  currentMonth: any;
  previousMonth: any;
  deviceInfo: any;
}

export const StatCardsSection = ({
  currentMonth,
  previousMonth,
  deviceInfo
}: StatCardsSectionProps) => {
  const getResponsiveGridCols = () => {
    if (deviceInfo.isMobile) {
      return "grid-cols-1";
    } else if (deviceInfo.isTablet || deviceInfo.isSmallLaptop) {
      return "grid-cols-3";
    } else {
      return "grid-cols-3";
    }
  };

  const getResponsiveNutritionGridCols = () => {
    if (deviceInfo.isMobile) {
      return "grid-cols-1";
    } else {
      return "grid-cols-2";
    }
  };

  const stats = [
    {
      title: "تعداد کل شاگردان",
      value: currentMonth.شاگردان,
      growth: calculateGrowth(currentMonth.شاگردان, previousMonth.شاگردان),
      icon: Users,
      color: "from-blue-600 to-blue-400",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "درآمد ماهانه",
      value: currentMonth.درآمد,
      growth: calculateGrowth(currentMonth.درآمد, previousMonth.درآمد),
      icon: Wallet,
      color: "from-green-600 to-green-400",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
      format: (value: number) => `${toPersianNumbers(value.toLocaleString())} تومان`
    },
    {
      title: "برنامه‌های تمرینی",
      value: currentMonth.تمرین,
      growth: calculateGrowth(currentMonth.تمرین, previousMonth.تمرین),
      icon: Dumbbell,
      color: "from-orange-600 to-orange-400",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  const nutritionStats = [
    {
      title: "برنامه‌های غذایی",
      value: currentMonth.برنامه_غذایی,
      growth: calculateGrowth(currentMonth.برنامه_غذایی, previousMonth.برنامه_غذایی),
      icon: UtensilsCrossed,
      color: "from-pink-600 to-pink-400",
      bgLight: "bg-pink-50",
      textColor: "text-pink-600"
    },
    {
      title: "مکمل‌های تجویز شده",
      value: currentMonth.مکمل,
      growth: calculateGrowth(currentMonth.مکمل, previousMonth.مکمل),
      icon: Pill,
      color: "from-indigo-600 to-indigo-400",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-600"
    }
  ];

  return (
    <div className="space-y-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className={`grid gap-3 sm:gap-4 ${getResponsiveGridCols()} relative z-10`}>
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
              format={stat.format}
              index={index}
              isMobile={deviceInfo.isMobile}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className={`grid gap-3 sm:gap-4 ${getResponsiveNutritionGridCols()} relative z-10`}>
          {nutritionStats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              growth={stat.growth}
              icon={stat.icon}
              color={stat.color}
              bgLight={stat.bgLight}
              textColor={stat.textColor}
              index={index + 3}
              isMobile={deviceInfo.isMobile}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
