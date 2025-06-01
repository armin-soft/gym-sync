
import { motion } from "framer-motion";
import { Clock, Calendar, Users, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { DashboardStats } from "@/types/dashboard";

interface TimeSectionProps {
  currentTime: Date;
  stats: DashboardStats;
  formatTime: (date: Date) => string;
  formatDate: (date: Date) => string;
}

export const TimeSection = ({ currentTime, stats, formatTime, formatDate }: TimeSectionProps) => {
  return (
    <motion.div 
      className="flex flex-col items-end space-y-6"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      {/* Current time */}
      <motion.div 
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="flex items-center gap-4 text-right">
          <div>
            <div className="text-2xl font-bold text-white mb-1">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-white/60 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              زمان فعلی
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current date */}
      <motion.div 
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="flex items-center gap-4 text-right">
          <div>
            <div className="text-lg font-semibold text-white mb-1">
              {formatDate(currentTime)}
            </div>
            <div className="text-sm text-white/60 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              تاریخ امروز
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overall stats */}
      <motion.div 
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white mb-2">
              {toPersianNumbers(stats.totalStudents)}
            </div>
            <div className="text-sm text-white/60 flex items-center justify-center gap-1">
              <Users className="h-4 w-4" />
              شاگردان
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-1">
              <span>{toPersianNumbers(stats.studentsProgress)}</span>
              <span className="text-lg">٪</span>
            </div>
            <div className="text-sm text-white/60 flex items-center justify-center gap-1">
              <TrendingUp className="h-4 w-4" />
              پیشرفت
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
