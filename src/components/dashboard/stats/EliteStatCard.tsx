
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Star, LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

export interface EliteStatCardProps {
  title: string;
  icon: LucideIcon;
  value: number;
  growth: number;
  maxValue: number;
  percentage?: number;
  color: "slate" | "violet" | "emerald";
  description: string;
  gradient: string;
  bgGradient: string;
  delay?: number;
}

export const EliteStatCard = ({ 
  title, 
  icon: Icon, 
  value, 
  growth, 
  maxValue,
  percentage,
  description,
  gradient,
  bgGradient,
  color,
  delay = 0
}: EliteStatCardProps) => {
  const progressPercentage = percentage !== undefined 
    ? percentage 
    : Math.min((value / maxValue) * 100, 100);
    
  const isOutstanding = growth > 25 || progressPercentage > 80;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${bgGradient} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`} />
        </div>
        
        {/* Hover shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-3 space-y-0">
          <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {title}
          </CardTitle>
          <div className={`p-3 rounded-2xl bg-gradient-to-r ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
            <Icon className="w-5 h-5" />
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-6">
          {/* Value and Growth */}
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              {toPersianNumbers(value)}
              {isOutstanding && (
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Star className="w-5 h-5 text-amber-500" fill="#F59E0B" />
                </motion.div>
              )}
            </div>
            <Badge 
              className={`rounded-xl px-3 py-1 ${
                growth >= 0 
                  ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' 
                  : 'text-rose-600 bg-rose-100 dark:bg-rose-900/30'
              } flex items-center gap-1.5 font-semibold`}
            >
              {growth >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {toPersianNumbers(Math.abs(growth))}٪
            </Badge>
          </div>
          
          {/* Description */}
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {description}
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>پیشرفت</span>
              <span>{toPersianNumbers(Math.round(progressPercentage))}٪</span>
            </div>
            
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: delay + 0.3 }}
                className={`h-full rounded-full bg-gradient-to-r ${gradient} relative`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EliteStatCard;
