
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, LineChart, UtensilsCrossed, Pill, Dumbbell } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";
import { ActivityItem } from "./ActivityItem";
import { ActivityOverview } from "./ActivityOverview";
import { ActivityCardFooter } from "./ActivityCardFooter";

interface ActivitySummaryCardProps {
  stats: DashboardStats;
}

export const ActivitySummaryCard = ({ stats }: ActivitySummaryCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200/50 dark:border-slate-800/50 group">
      <CardHeader className="bg-gradient-to-r from-gold-50/70 to-bronze-50/70 dark:from-gold-900/20 dark:to-bronze-900/20 py-4 border-b border-slate-200/70 dark:border-slate-800/70">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-gold-100 dark:bg-gold-900/50 ring-1 ring-gold-500/20 shadow-sm">
            <Activity className="w-5 h-5 text-gold-600 dark:text-gold-400" />
          </div>
          خلاصه فعالیت‌ها
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 opacity-5">
          <LineChart className="w-24 h-24" />
        </div>
        
        <div className="space-y-4 relative z-10">
          <ActivityItem
            icon={UtensilsCrossed}
            title="برنامه‌های غذایی"
            value={stats.totalMeals}
            unit="برنامه"
            growth={stats.mealGrowth}
            color="gold"
            completionRate={stats.mealCompletionRate}
          />
          
          <ActivityItem
            icon={Pill}
            title="مکمل‌های تجویز شده"
            value={stats.totalSupplements}
            unit="مورد"
            growth={stats.supplementGrowth}
            color="bronze"
            completionRate={stats.supplementCompletionRate}
          />
          
          <ActivityItem
            icon={Dumbbell}
            title="نرخ تکمیل تمرین‌ها"
            value={stats.studentsProgress}
            unit="%"
            showProgress
            color="masculine"
          />
          
          <ActivityOverview stats={stats} />
        </div>

        <ActivityCardFooter />
      </CardContent>
    </Card>
  );
};

export default ActivitySummaryCard;
