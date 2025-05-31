
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ActivityOverviewProps {
  stats: DashboardStats;
}

export const ActivityOverview = ({ stats }: ActivityOverviewProps) => {
  // Calculate average completion rate
  const avgCompletionRate = Math.round((stats.mealCompletionRate + stats.supplementCompletionRate) / 2);
  const isHighPerforming = avgCompletionRate > 70;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="mt-6 p-3 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-800/50 dark:to-blue-900/10 border border-blue-100/50 dark:border-blue-800/30"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          خلاصه عملکرد
        </h4>
        
        <Badge variant="outline" className={`
          ${isHighPerforming ? 
            'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
            'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50'
          }
        `}>
          {isHighPerforming ? 'عالی' : 'متوسط'}
        </Badge>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between mb-1">
          <span>نرخ تکمیل برنامه‌ها</span>
          <span className="font-medium">{toPersianNumbers(avgCompletionRate)}٪</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${avgCompletionRate}%` }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`h-full rounded-full ${
              isHighPerforming ? 
                'bg-gradient-to-r from-emerald-500 to-green-400' : 
                'bg-gradient-to-r from-amber-500 to-yellow-400'
            }`}
          />
        </div>
      </div>
      
      {isHighPerforming && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400"
        >
          <Star className="w-3 h-3" fill="currentColor" />
          <span>عملکرد بسیار خوب! ادامه دهید</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActivityOverview;
