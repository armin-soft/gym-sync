
import React from "react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentCardStatsProps {
  height: string | number;
  weight: string | number;
}

export const StudentCardStats: React.FC<StudentCardStatsProps> = ({ height, weight }) => {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <StatItem 
        label="قد" 
        value={toPersianNumbers(height)} 
        unit="سانتی‌متر" 
        className="from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-400"
      />
      
      <StatItem 
        label="وزن" 
        value={toPersianNumbers(weight)} 
        unit="کیلوگرم" 
        className="from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-700 dark:text-purple-400" 
      />
    </div>
  );
};

interface StatItemProps {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, unit, className }) => {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`flex-1 backdrop-blur-sm bg-gradient-to-br ${className} rounded-xl px-3 py-2 text-center shadow-sm border border-white/10 dark:border-white/5`}
    >
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1 opacity-80">{label}</p>
      <div className="font-bold text-base">
        {value} {unit && <span className="text-xs font-normal opacity-70">{unit}</span>}
      </div>
    </motion.div>
  );
};
