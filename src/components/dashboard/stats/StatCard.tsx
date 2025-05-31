
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Stars, LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useBrandTheme } from "@/hooks/use-brand-theme";

// Color configurations for different card types using brand colors
const colorMap = {
  dark: {
    bg: "from-brand-dark to-slate-700",
    bgLight: "bg-brand-dark/10 dark:bg-brand-dark/20",
    text: "text-brand-dark dark:text-slate-100",
    progressBg: "bg-slate-100 dark:bg-slate-800/30",
    iconColor: "text-brand-dark dark:text-slate-300"
  },
  primary: {
    bg: "from-brand-primary to-orange-400",
    bgLight: "bg-brand-primary/10 dark:bg-brand-primary/20",
    text: "text-brand-primary dark:text-brand-primary",
    progressBg: "bg-orange-100 dark:bg-orange-800/30",
    iconColor: "text-brand-primary"
  },
  secondary: {
    bg: "from-brand-secondary to-yellow-400",
    bgLight: "bg-brand-secondary/10 dark:bg-brand-secondary/20",
    text: "text-brand-secondary dark:text-brand-secondary",
    progressBg: "bg-yellow-100 dark:bg-yellow-800/30",
    iconColor: "text-brand-secondary"
  }
};

// Component to display growth badge
export const GrowthBadge = ({ growth }: { growth: number }) => (
  <Badge 
    variant="secondary" 
    className={`rounded-lg ${growth >= 0 ? 'text-green-600 bg-green-100/70 dark:bg-green-900/30 dark:text-green-400' : 'text-red-600 bg-red-100/70 dark:bg-red-900/30 dark:text-red-400'} flex items-center gap-1`}
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
  color: "dark" | "primary" | "secondary";
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
  const { colors } = useBrandTheme();
  
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
          <div className={`p-1.5 rounded-md ${colorMap[color].bgLight} ring-1 ring-${color === 'primary' ? 'brand-primary' : color === 'secondary' ? 'brand-secondary' : 'brand-dark'}/20`}>
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
                  <Stars className="w-4 h-4 text-yellow-400" fill="#fbbf24" />
                </motion.div>
              )}
            </div>
            <GrowthBadge growth={growth} />
          </div>
          
          <div className="text-xs text-muted-foreground mt-1">
            {description}
          </div>
          
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full relative" style={{background: `var(--${color === 'primary' ? 'brand-primary' : color === 'secondary' ? 'brand-secondary' : 'brand-dark'}-100)`}}>
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
