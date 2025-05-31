
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Stars, LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

// Color configurations for different card types
const colorMap = {
  black: {
    bg: "from-gray-900 to-gray-700",
    bgLight: "bg-gray-100/50 dark:bg-gray-900/20",
    text: "text-gray-900 dark:text-gray-100",
    progressBg: "bg-gray-100 dark:bg-gray-800/30",
    iconColor: "text-gray-700 dark:text-gray-300"
  },
  gold: {
    bg: "from-gold-600 to-gold-400",
    bgLight: "bg-gold-100/50 dark:bg-gold-900/20",
    text: "text-gold-600 dark:text-gold-400",
    progressBg: "bg-gold-100 dark:bg-gold-800/30",
    iconColor: "text-gold-500"
  },
  bronze: {
    bg: "from-bronze-600 to-bronze-400",
    bgLight: "bg-bronze-100/50 dark:bg-bronze-900/20",
    text: "text-bronze-600 dark:text-bronze-400",
    progressBg: "bg-bronze-100 dark:bg-bronze-800/30",
    iconColor: "text-bronze-500"
  }
};

// Component to display growth badge
export const GrowthBadge = ({ growth }: { growth: number }) => (
  <Badge 
    variant="secondary" 
    className={`rounded-lg ${growth >= 0 ? 'text-gold-600 bg-gold-100/70 dark:bg-gold-900/30 dark:text-gold-400' : 'text-red-600 bg-red-100/70 dark:bg-red-900/30 dark:text-red-400'} flex items-center gap-1`}
  >
    {growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
    {toPersianNumbers(Math.abs(growth))}٪
  </Badge>
);

// Interface for StatCard props
export interface StatCardProps {
  title: string;
  icon: LucideIcon;
  value: number;
  growth: number;
  maxValue: number;
  percentage?: number;
  color: "black" | "gold" | "bronze";
  description: string;
  variants?: any;
}

// Main StatCard component
export const StatCard = ({ 
  title, 
  icon: Icon, 
  value, 
  growth, 
  maxValue,
  percentage,
  color, 
  description,
  variants
}: StatCardProps) => {
  // Calculate the progress percentage
  const progressPercentage = percentage !== undefined 
    ? percentage 
    : Math.min((value / maxValue) * 100, 100);
    
  // Determine if the stat is outstanding (high value or growth)
  const isOutstanding = growth > 25 || progressPercentage > 80;
  
  return (
    <motion.div variants={variants}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-slate-200/50 dark:border-slate-800/50 relative">
        {/* Background pattern - only shows on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`p-1.5 rounded-md ${colorMap[color].bgLight} ring-1 ring-${color}-500/20`}>
            <Icon className={`w-4 h-4 ${colorMap[color].iconColor}`} />
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mt-4 flex items-center gap-2">
            <div className={`text-2xl font-bold ${colorMap[color].text} flex items-center`}>
              {toPersianNumbers(value)}
              {isOutstanding && (
                <motion.div 
                  className="ml-2"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                >
                  <Stars className="w-4 h-4 text-gold-400" fill="#f59e0b" />
                </motion.div>
              )}
            </div>
            <GrowthBadge growth={growth} />
          </div>
          
          <div className="text-xs text-muted-foreground mt-1">
            {description}
          </div>
          
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full relative" style={{background: `var(--${color}-100)`}}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`h-full rounded-full bg-gradient-to-r ${colorMap[color].bg} transition-all duration-300 relative`}
            >
              {/* Animated glowing dot that travels along progress bar */}
              <motion.div 
                className="absolute top-0 right-0 w-2 h-2 -mr-1 -mt-0.5 rounded-full bg-white shadow-md shadow-white/30"
                animate={{ 
                  boxShadow: ['0 0 0px white', '0 0 8px white', '0 0 0px white']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
            
            {/* Animated pulse at end of progress bar if high value */}
            {isOutstanding && (
              <motion.div
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${colorMap[color].text} opacity-20`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{ right: `${100 - progressPercentage}%` }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
