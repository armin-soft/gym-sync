
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UtensilsCrossed, Pill, TrendingUp, TrendingDown, BarChart3, Stars } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import type { DashboardStats } from "@/types/dashboard";

const renderGrowthBadge = (growth: number) => (
  <Badge 
    variant="secondary" 
    className={`rounded-lg ${growth >= 0 ? 'text-green-600 bg-green-100/70 dark:bg-green-900/30 dark:text-green-400' : 'text-red-600 bg-red-100/70 dark:bg-red-900/30 dark:text-red-400'} flex items-center gap-1`}
  >
    {growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
    {toPersianNumbers(Math.abs(growth))}٪
  </Badge>
);

export const StatsCards = ({ stats }: { stats: DashboardStats }) => {
  // Container variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Item variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <StatCard 
        title="تعداد شاگردان"
        icon={Users}
        value={stats.totalStudents}
        growth={stats.studentGrowth}
        maxValue={stats.maxCapacity}
        color="blue"
        description="شاگرد فعال در سیستم"
        variants={item}
      />

      <StatCard 
        title="برنامه های غذایی"
        icon={UtensilsCrossed}
        value={stats.totalMeals}
        growth={stats.mealGrowth}
        maxValue={100}
        percentage={stats.mealCompletionRate}
        color="green"
        description={`${toPersianNumbers(Math.round(stats.mealCompletionRate))}٪ شاگردان دارای برنامه غذایی`}
        variants={item}
      />

      <StatCard 
        title="مکمل و ویتامین تجویز شده"
        icon={Pill}
        value={stats.totalSupplements}
        growth={stats.supplementGrowth}
        maxValue={100}
        percentage={stats.supplementCompletionRate}
        color="orange"
        description={`${toPersianNumbers(Math.round(stats.supplementCompletionRate))}٪ شاگردان دارای مکمل و ویتامین`}
        variants={item}
      />
    </motion.div>
  );
};

// Enhanced stat card component
interface StatCardProps {
  title: string;
  icon: React.ElementType;
  value: number;
  growth: number;
  maxValue: number;
  percentage?: number;
  color: "blue" | "green" | "orange";
  description: string;
  variants: any;
}

const StatCard = ({ 
  title, 
  icon: Icon, 
  value, 
  growth, 
  maxValue,
  percentage,
  color, 
  description,
  variants
}: StatCardProps) => {
  // Color configurations
  const colorMap = {
    blue: {
      bg: "from-blue-600 to-blue-400",
      bgLight: "bg-blue-100/50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      progressBg: "bg-blue-100 dark:bg-blue-800/30",
      iconColor: "text-blue-500"
    },
    green: {
      bg: "from-green-600 to-green-400",
      bgLight: "bg-green-100/50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      progressBg: "bg-green-100 dark:bg-green-800/30",
      iconColor: "text-green-500"
    },
    orange: {
      bg: "from-orange-600 to-orange-400",
      bgLight: "bg-orange-100/50 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400",
      progressBg: "bg-orange-100 dark:bg-orange-800/30",
      iconColor: "text-orange-500"
    }
  };
  
  // Calculate the progress percentage
  const progressPercentage = percentage !== undefined 
    ? percentage 
    : Math.min((value / maxValue) * 100, 100);
    
  // Determine if the stat is outstanding (high value or growth)
  const isOutstanding = growth > 25 || progressPercentage > 80;
  
  return (
    <motion.div variants={variants}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-slate-200/50 dark:border-slate-800/50 relative">
        {/* Background pattern - only shows on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`p-1.5 rounded-md ${colorMap[color].bgLight} ring-1 ring-${color}-500/20`}>
            <Icon className={`w-4 h-4 ${colorMap[color].iconColor}`} />
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mt-4 flex items-center gap-2">
            <div className={`text-2xl font-bold ${colorMap[color].text} flex items-center`}>
              {toPersianNumbers(value)}
              {isOutstanding && (
                <motion.div 
                  className="ml-2"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                >
                  <Stars className="w-4 h-4 text-yellow-400" fill="#fbbf24" />
                </motion.div>
              )}
            </div>
            {renderGrowthBadge(growth)}
          </div>
          
          <div className="text-xs text-muted-foreground mt-1">
            {description}
          </div>
          
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full relative" style={{background: `var(--${color}-100)`}}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`h-full rounded-full bg-gradient-to-r ${colorMap[color].bg} transition-all duration-300 relative`}
            >
              {/* Animated glowing dot that travels along progress bar */}
              <motion.div 
                className="absolute top-0 right-0 w-2 h-2 -mr-1 -mt-0.5 rounded-full bg-white shadow-md shadow-white/30"
                animate={{ 
                  boxShadow: ['0 0 0px white', '0 0 8px white', '0 0 0px white']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
            
            {/* Animated pulse at end of progress bar if high value */}
            {isOutstanding && (
              <motion.div
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${colorMap[color].text} opacity-20`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{ right: `${100 - progressPercentage}%` }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
