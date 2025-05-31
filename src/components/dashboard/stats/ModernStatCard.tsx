
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Star, LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

// Component to display growth badge
export const ModernGrowthBadge = ({ growth }: { growth: number }) => (
  <Badge 
    variant="secondary" 
    className={`rounded-xl px-3 py-1 ${
      growth >= 0 
        ? 'text-green-600 bg-green-100/80 dark:bg-green-900/30 dark:text-green-400 border-green-200/50' 
        : 'text-red-600 bg-red-100/80 dark:bg-red-900/30 dark:text-red-400 border-red-200/50'
    } flex items-center gap-1.5 font-semibold shadow-sm`}
  >
    {growth >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
    {toPersianNumbers(Math.abs(growth))}٪
  </Badge>
);

// Interface for ModernStatCard props
export interface ModernStatCardProps {
  title: string;
  icon: LucideIcon;
  value: number;
  growth: number;
  maxValue: number;
  percentage?: number;
  color: "black" | "blue" | "gold";
  description: string;
  gradient: string;
  bgGradient: string;
  textColor: string;
  iconBg: string;
  variants?: any;
}

// Main ModernStatCard component
export const ModernStatCard = ({ 
  title, 
  icon: Icon, 
  value, 
  growth, 
  maxValue,
  percentage,
  description,
  gradient,
  bgGradient,
  textColor,
  iconBg,
  variants
}: ModernStatCardProps) => {
  // Calculate the progress percentage
  const progressPercentage = percentage !== undefined 
    ? percentage 
    : Math.min((value / maxValue) * 100, 100);
    
  // Determine if the stat is outstanding (high value or growth)
  const isOutstanding = growth > 25 || progressPercentage > 80;
  
  return (
    <motion.div variants={variants}>
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-800/40 backdrop-blur-sm">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
          <div className={`absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br ${bgGradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
        </div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-3 space-y-0">
          <CardTitle className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </CardTitle>
          <div className={`p-3 rounded-2xl ${iconBg} backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-5 h-5 ${textColor}`} />
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-6">
          {/* Value and Growth */}
          <div className="flex items-center justify-between">
            <div className={`text-3xl font-bold ${textColor} flex items-center gap-2`}>
              {toPersianNumbers(value)}
              {isOutstanding && (
                <motion.div 
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Star className="w-5 h-5 text-yellow-500" fill="#EAB308" />
                </motion.div>
              )}
            </div>
            <ModernGrowthBadge growth={growth} />
          </div>
          
          {/* Description */}
          <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>پیشرفت</span>
              <span>{toPersianNumbers(Math.round(progressPercentage))}٪</span>
            </div>
            
            <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${gradient} relative shadow-sm`}
              >
                {/* Animated glowing dot */}
                <motion.div 
                  className="absolute top-0 left-0 w-3 h-3 -mt-0.5 -ml-1.5 rounded-full bg-white shadow-lg"
                  style={{ left: `${progressPercentage}%` }}
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(255,255,255,0.8)', '0 0 12px rgba(255,255,255,0.8)', '0 0 0px rgba(255,255,255,0.8)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Inner shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
              </motion.div>
              
              {/* Progress markers */}
              <div className="absolute inset-0 flex justify-between px-1 opacity-40">
                {[25, 50, 75].map((mark) => (
                  <div key={mark} className="h-full flex items-center">
                    <div className="h-3 w-0.5 bg-gray-400 dark:bg-gray-500 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModernStatCard;
