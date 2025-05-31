
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatisticCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "orange" | "pink";
  delay?: number;
}

const colorVariants = {
  blue: {
    gradient: "from-blue-500/10 via-indigo-500/5 to-blue-500/10",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    valueColor: "text-blue-700 dark:text-blue-300",
    ring: "ring-blue-500/20"
  },
  green: {
    gradient: "from-emerald-500/10 via-teal-500/5 to-emerald-500/10",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    valueColor: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-500/20"
  },
  purple: {
    gradient: "from-purple-500/10 via-violet-500/5 to-purple-500/10",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
    valueColor: "text-purple-700 dark:text-purple-300",
    ring: "ring-purple-500/20"
  },
  orange: {
    gradient: "from-orange-500/10 via-amber-500/5 to-orange-500/10",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600 dark:text-orange-400",
    valueColor: "text-orange-700 dark:text-orange-300",
    ring: "ring-orange-500/20"
  },
  pink: {
    gradient: "from-pink-500/10 via-rose-500/5 to-pink-500/10",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-600 dark:text-pink-400",
    valueColor: "text-pink-700 dark:text-pink-300",
    ring: "ring-pink-500/20"
  }
};

export const StatisticCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color,
  delay = 0 
}: StatisticCardProps) => {
  const variant = colorVariants[color];
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative"
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${variant.gradient} border border-white/20 dark:border-slate-800/20 p-6 shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Shine effect */}
        <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-xl ${variant.iconBg} ${variant.ring} ring-1 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`w-6 h-6 ${variant.iconColor}`} />
            </div>
            
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              isPositive 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {toPersianNumbers(Math.abs(change))}٪
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              {title}
            </p>
            <p className={`text-2xl font-bold ${variant.valueColor}`}>
              {toPersianNumbers(value)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
