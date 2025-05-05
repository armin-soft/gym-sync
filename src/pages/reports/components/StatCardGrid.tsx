
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ArrowDownIcon, ArrowUpIcon, Users, CreditCard, BarChartBig, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardGridProps {
  currentMonth: any;
  previousMonth: any;
  deviceInfo: any;
}

export const StatCardGrid = ({ currentMonth, previousMonth, deviceInfo }: StatCardGridProps) => {
  // The order and config of stats cards to display
  const statsConfig = [
    {
      title: 'شاگردان فعال',
      value: currentMonth?.شاگردان || 0,
      change: currentMonth?.رشد_شاگردان || 0,
      color: 'blue',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'درآمد ماهانه',
      value: currentMonth?.درآمد || 0,
      change: currentMonth?.رشد_درآمد || 0,
      color: 'green',
      format: (val: number) => `${toPersianNumbers(val.toLocaleString())} تومان`,
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      title: 'برنامه‌های تمرینی',
      value: currentMonth?.تمرین || 0,
      change: ((currentMonth?.تمرین || 0) - (previousMonth?.تمرین || 0)) / (previousMonth?.تمرین || 1) * 100,
      color: 'amber',
      icon: <BarChartBig className="h-5 w-5" />
    },
    {
      title: 'برنامه‌های غذایی',
      value: currentMonth?.برنامه_غذایی || 0,
      change: ((currentMonth?.برنامه_غذایی || 0) - (previousMonth?.برنامه_غذایی || 0)) / (previousMonth?.برنامه_غذایی || 1) * 100,
      color: 'pink',
      icon: <Calendar className="h-5 w-5" />
    }
  ];
  
  const getChangeColorClass = (change: number) => {
    if (change > 0) return 'text-emerald-500';
    if (change < 0) return 'text-rose-500';
    return 'text-gray-500';
  };
  
  const getBackgroundClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'blue': 'from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/5',
      'green': 'from-emerald-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/5',
      'amber': 'from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/5',
      'pink': 'from-pink-500/10 to-pink-500/5 dark:from-pink-500/20 dark:to-pink-500/5',
      'purple': 'from-purple-500/10 to-purple-500/5 dark:from-purple-500/20 dark:to-purple-500/5',
    };
    
    return colorMap[color] || colorMap.blue;
  };
  
  const getIconClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'blue': 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/20 dark:text-blue-400',
      'green': 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/20 dark:text-emerald-400',
      'amber': 'bg-amber-500/10 text-amber-500 dark:bg-amber-400/20 dark:text-amber-400',
      'pink': 'bg-pink-500/10 text-pink-500 dark:bg-pink-400/20 dark:text-pink-400',
      'purple': 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/20 dark:text-purple-400',
    };
    
    return colorMap[color] || colorMap.blue;
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statsConfig.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
          className={cn(
            "rounded-xl shadow-lg overflow-hidden border border-white/10 backdrop-blur-sm",
            "relative bg-gradient-to-br",
            getBackgroundClass(stat.color)
          )}
        >
          <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-b from-white/5 to-transparent dark:from-white/10 rounded-full -mt-10 -mr-10 blur-2xl"></div>
          
          <div className="p-5 sm:p-6 flex flex-col h-full justify-between relative z-10">
            <div className="flex items-center justify-between">
              <div className={cn(
                "p-2 rounded-lg",
                getIconClass(stat.color)
              )}>
                {stat.icon}
              </div>
              
              <div className={cn(
                "flex items-center text-xs gap-1 px-2 py-1 rounded-full",
                stat.change >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              )}>
                <span>
                  {stat.change >= 0 ? (
                    <ArrowUpIcon className="h-3 w-3" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3" />
                  )}
                </span>
                <span>{toPersianNumbers(Math.abs(stat.change).toFixed(1))}%</span>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold mt-1">
                {stat.format ? stat.format(stat.value) : toPersianNumbers(stat.value)}
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
