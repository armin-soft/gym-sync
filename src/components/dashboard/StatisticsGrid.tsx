
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Dumbbell, UtensilsCrossed, Pill, Calendar, Award,
  TrendingUp, TrendingDown, Star
} from 'lucide-react';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { DashboardStats } from '@/types/dashboard';

interface StatisticsGridProps {
  stats: DashboardStats;
}

export const StatisticsGrid = ({ stats }: StatisticsGridProps) => {
  // Define stats cards data
  const statCards = [
    {
      title: 'شاگردان فعال',
      value: stats.totalStudents,
      icon: Users,
      change: stats.studentGrowth,
      description: 'شاگرد در سیستم',
      color: 'blue',
      bgClassName: 'bg-blue-500/10 dark:bg-blue-500/20',
      textClassName: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'میانگین پیشرفت',
      value: stats.studentsProgress,
      suffix: '%',
      icon: TrendingUp,
      description: 'میانگین پیشرفت کلی',
      color: 'green',
      bgClassName: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      textClassName: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'برنامه‌های غذایی',
      value: stats.totalMeals,
      icon: UtensilsCrossed,
      change: stats.mealGrowth,
      description: `${toPersianNumbers(stats.mealCompletionRate)}٪ تکمیل شده`,
      color: 'orange',
      bgClassName: 'bg-amber-500/10 dark:bg-amber-500/20',
      textClassName: 'text-amber-600 dark:text-amber-400',
    },
    {
      title: 'مکمل‌ها و ویتامین‌ها',
      value: stats.totalSupplements,
      icon: Pill,
      change: stats.supplementGrowth,
      description: `${toPersianNumbers(stats.supplementCompletionRate)}٪ تکمیل شده`,
      color: 'purple',
      bgClassName: 'bg-purple-500/10 dark:bg-purple-500/20',
      textClassName: 'text-purple-600 dark:text-purple-400',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          suffix={stat.suffix || ''}
          icon={stat.icon}
          change={stat.change}
          description={stat.description}
          bgClassName={stat.bgClassName}
          textClassName={stat.textClassName}
          index={index}
        />
      ))}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  change?: number;
  description: string;
  bgClassName: string;
  textClassName: string;
  index: number;
}

const StatCard = ({ 
  title, 
  value, 
  suffix = '',
  icon: Icon,
  change,
  description,
  bgClassName,
  textClassName,
  index
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
    >
      <Card className="group relative overflow-hidden hover:shadow-lg dark:hover:shadow-slate-700/30 transition-all duration-300 hover:translate-y-[-2px]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className={`p-2 rounded-md ${bgClassName}`}>
              <Icon className={`h-5 w-5 ${textClassName}`} strokeWidth={2} />
            </div>
            
            {change !== undefined && (
              <Badge 
                variant="outline"
                className={`flex items-center gap-1 px-2 py-1 ${
                  change >= 0 
                    ? 'bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400 border-green-200 dark:border-green-900'
                    : 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border-red-200 dark:border-red-900'
                }`}
              >
                {change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-xs font-medium">{toPersianNumbers(Math.abs(change))}٪</span>
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-sm text-muted-foreground mb-1">
            {title}
          </CardTitle>
          
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">
              {toPersianNumbers(value)}{suffix}
            </span>
            {value > 50 && (
              <motion.span 
                className="ml-2"
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1,
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <Star className="h-4 w-4 text-amber-400" fill="currentColor" />
              </motion.span>
            )}
          </div>
          
          <p className="text-muted-foreground text-xs mt-2">
            {description}
          </p>
          
          {/* Progress bar */}
          <div className="mt-3 h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${bgClassName.replace('/10', '/80')}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((value / (value < 100 ? value * 1.5 : 100)) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
