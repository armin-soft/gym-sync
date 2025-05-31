
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Users, TrendingUp, Award } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";

interface StatsDisplayProps {
  stats: DashboardStats;
}

export const StatsDisplay = ({ stats }: StatsDisplayProps) => {
  return (
    <motion.div 
      className="flex items-center gap-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Total Students */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Users className="h-4 w-4 text-white/80" />
          <span className="text-xs text-white/60">شاگردان</span>
        </div>
        <div className="text-lg font-bold text-white">
          {toPersianNumbers(stats.totalStudents)}
        </div>
      </div>
      
      {/* Separator */}
      <div className="h-8 w-px bg-white/20" />
      
      {/* Progress */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <TrendingUp className="h-4 w-4 text-white/80" />
          <span className="text-xs text-white/60">پیشرفت</span>
        </div>
        <div className="text-lg font-bold text-white flex items-center gap-1">
          <span>{toPersianNumbers(stats.studentsProgress)}</span>
          <span className="text-sm">%</span>
        </div>
      </div>
      
      {/* Separator */}
      <div className="h-8 w-px bg-white/20" />
      
      {/* Rating */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Award className="h-4 w-4 text-white/80" />
          <span className="text-xs text-white/60">امتیاز</span>
        </div>
        <div className="text-lg font-bold text-white">
          ۴.۹
        </div>
      </div>
    </motion.div>
  );
};
