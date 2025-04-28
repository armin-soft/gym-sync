
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
      className="group relative flex flex-col gap-4 rounded-xl bg-gradient-to-br bg-white/10 p-4 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${color} text-white group-hover:scale-110 transition-transform duration-300`}>
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
      
      <div className="flex-1">
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
