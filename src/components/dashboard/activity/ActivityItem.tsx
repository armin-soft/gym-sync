
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  TrendingUp, 
  ArrowUpRight
} from "lucide-react";

export type ActivityItemColor = "gold" | "bronze" | "masculine";

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
  gold: {
    bg: "bg-gold-100 dark:bg-gold-900/30",
    text: "text-gold-600 dark:text-gold-400",
    border: "border-gold-200 dark:border-gold-800",
    bgLight: "bg-gold-50 dark:bg-gold-950",
    gradient: "from-gold-500 to-gold-400"
  },
  bronze: {
    bg: "bg-bronze-100 dark:bg-bronze-900/30",
    text: "text-bronze-600 dark:text-bronze-400",
    border: "border-bronze-200 dark:border-bronze-800",
    bgLight: "bg-bronze-50 dark:bg-bronze-950",
    gradient: "from-bronze-500 to-bronze-400"
  },
  masculine: {
    bg: "bg-masculine-100 dark:bg-masculine-900/30",
    text: "text-masculine-600 dark:text-masculine-400",
    border: "border-masculine-200 dark:border-masculine-800", 
    bgLight: "bg-masculine-50 dark:bg-masculine-950",
    gradient: "from-masculine-500 to-masculine-400"
  }
};

export const ActivityItem = ({ 
  icon: Icon, 
  title, 
  value, 
  unit, 
  growth = 0, 
  color = "gold",
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
            className={`${colorMap[color].bgLight} ${colorMap[color].text} ${colorMap[color].border} flex items-center gap-1.5 group-hover/item:scale-105 transition-transform duration-300`}
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
