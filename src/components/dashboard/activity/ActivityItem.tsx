
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  TrendingUp, 
  ArrowUpRight
} from "lucide-react";

export type ActivityItemColor = "blue" | "purple" | "amber";

export interface ActivityItemProps { 
  icon: React.ElementType;
  title: string;
  value: number;
  unit: string;
  growth?: number;
  color: ActivityItemColor;
  showProgress?: boolean;
  completionRate?: number;
}

// Color mapping
const colorMap = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    bgLight: "bg-blue-50 dark:bg-blue-950",
    gradient: "from-blue-500 to-blue-400"
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
    bgLight: "bg-purple-50 dark:bg-purple-950",
    gradient: "from-purple-500 to-purple-400"
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800", 
    bgLight: "bg-amber-50 dark:bg-amber-950",
    gradient: "from-amber-500 to-amber-400"
  }
};

export const ActivityItem = ({ 
  icon: Icon, 
  title, 
  value, 
  unit, 
  growth = 0, 
  color = "blue",
  showProgress = false,
  completionRate = 0
}: ActivityItemProps) => {  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between group/item"
    >
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${colorMap[color].bg}`}>
          <Icon className={`w-4 h-4 ${colorMap[color].text}`} />
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      
      <div className="flex items-center">
        {showProgress ? (
          <div className="flex items-center">
            <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ml-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`h-full bg-gradient-to-r ${colorMap[color].gradient} rounded-full`}
              >
                {/* Animated shine effect */}
                <motion.div 
                  className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    left: ["-10%", "120%"],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
            <span className="text-xs font-medium">{toPersianNumbers(value)}٪</span>
          </div>
        ) : (
          <Badge 
            variant="outline" 
            className={`bg-${colorMap[color].bgLight} ${colorMap[color].text} border-${colorMap[color].border} flex items-center gap-1.5 group-hover/item:scale-105 transition-transform duration-300`}
          >
            <span>{toPersianNumbers(value)} {unit}</span>
            {growth !== 0 && (
              <motion.div 
                className="flex items-center"
                animate={growth > 0 ? {
                  translateY: [0, -1, 0]
                } : {
                  translateY: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                {growth > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <ArrowUpRight className="w-3 h-3 rotate-90" />
                )}
              </motion.div>
            )}
          </Badge>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityItem;
