
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export type StudentStatsColor = "emerald" | "sky" | "orange" | "purple" | "pink" | "indigo";

export interface StudentStatsCardProps {
  title: string;
  value: number;
  total: number;
  icon: LucideIcon;
  color: StudentStatsColor;
  progress: number;
}

const colorClasses = {
  emerald: {
    bg: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20",
    border: "border-emerald-200/50 dark:border-emerald-800/50",
    icon: "from-emerald-500 to-emerald-600",
    text: "text-emerald-600 dark:text-emerald-400",
    progress: "bg-emerald-500"
  },
  sky: {
    bg: "from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/20",
    border: "border-sky-200/50 dark:border-sky-800/50", 
    icon: "from-sky-500 to-sky-600",
    text: "text-sky-600 dark:text-sky-400",
    progress: "bg-sky-500"
  },
  orange: {
    bg: "from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20",
    border: "border-orange-200/50 dark:border-orange-800/50",
    icon: "from-orange-500 to-orange-600", 
    text: "text-orange-600 dark:text-orange-400",
    progress: "bg-orange-500"
  },
  purple: {
    bg: "from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20",
    border: "border-purple-200/50 dark:border-purple-800/50",
    icon: "from-purple-500 to-purple-600",
    text: "text-purple-600 dark:text-purple-400", 
    progress: "bg-purple-500"
  },
  pink: {
    bg: "from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20",
    border: "border-pink-200/50 dark:border-pink-800/50",
    icon: "from-pink-500 to-pink-600",
    text: "text-pink-600 dark:text-pink-400",
    progress: "bg-pink-500"
  },
  indigo: {
    bg: "from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20",
    border: "border-indigo-200/50 dark:border-indigo-800/50",
    icon: "from-indigo-500 to-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400",
    progress: "bg-indigo-500"
  }
};

export const StudentStatsCard = ({
  title,
  value,
  total,
  icon: Icon,
  color,
  progress
}: StudentStatsCardProps) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} p-6`}
      style={{ boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl -translate-y-12 translate-x-12" />
      
      <div className="relative z-10">
        <motion.div 
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.icon} flex items-center justify-center mb-4 shadow-lg`}
          whileHover={{ rotate: 8, scale: 1.05 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <span className={`text-sm font-medium ${colors.text}`}>
              {toPersianNumbers(progress.toString())}%
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {toPersianNumbers(value.toString())} از {toPersianNumbers(total.toString())}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div 
                className={`h-full ${colors.progress} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
