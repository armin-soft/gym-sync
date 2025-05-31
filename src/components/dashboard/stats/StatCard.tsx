
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
  variants?: any;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  className = "",
  delay = 0,
  variants,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      variants={variants}
      className={`responsive-card-brand hover:shadow-brand-orange transition-all duration-300 
                 bg-gradient-to-br from-white to-orange-50/30 
                 dark:from-slate-900 dark:to-orange-950/20 
                 border-orange-200/50 dark:border-orange-800/30 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <p className="text-2xl font-bold brand-text-primary">
            {toPersianNumbers(value)}
          </p>
          {trend && (
            <div className={`flex items-center text-xs ${
              trend.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              <span>{trend.isPositive ? '↗' : '↘'}</span>
              <span className="mr-1">{toPersianNumbers(Math.abs(trend.value))}%</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center shadow-brand-orange">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
