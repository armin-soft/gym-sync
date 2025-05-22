
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrendingUp, Activity } from "lucide-react";

interface QuickStatsCardProps {
  title: string;
  value: number;
  growth: number;
  icon: LucideIcon;
  color: string;
  textColor: string;
  accentColor: string;
  index: number;
}

export const QuickStatsCard = ({
  title,
  value,
  growth,
  icon: Icon,
  color,
  textColor,
  accentColor,
  index
}: QuickStatsCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden flex flex-col gap-4 rounded-xl bg-gradient-to-br bg-white/10 p-4 backdrop-blur-sm border border-white/20 transition-all duration-300"
    >
      {/* Background decorative pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id={`grid-${index}`} width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#grid-${index})`} />
        </svg>
      </div>
      
      {/* Hover effect light beam */}
      <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full -rotate-45 transform bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${color} text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className={`text-xs font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
          growth >= 0 
            ? 'bg-green-500/20 text-green-300' 
            : 'bg-red-500/20 text-red-300'
        }`}>
          {growth >= 0 ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <Activity className="w-3.5 h-3.5" />
          )}
          {toPersianNumbers(Math.abs(growth))}٪
        </div>
      </div>
      
      <div className="flex-1 relative z-10">
        <p className="text-sm text-white/70">{title}</p>
        <p className={`mt-1 text-xl font-bold ${textColor}`}>
          {toPersianNumbers(value)}
        </p>
      </div>

      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div 
          className={`h-full rounded-full bg-gradient-to-r from-${accentColor}-500 to-${accentColor}-400`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((value / (value * 1.5)) * 100, 100)}%` }}
          transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
        />
      </div>
    </motion.div>
  );
};
