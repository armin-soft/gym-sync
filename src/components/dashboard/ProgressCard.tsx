
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { BarChart3, Dumbbell, Users } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";

interface ProgressCardProps {
  stats: DashboardStats;
}

export const ProgressCard = ({ stats }: ProgressCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30">
            <BarChart3 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
          </div>
          پیشرفت کلی
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">میانگین پیشرفت شاگردان</span>
          <span className="text-xl font-bold">{toPersianNumbers(stats.studentsProgress)}٪</span>
        </div>
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${stats.studentsProgress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
          />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              <span>شاگردان فعال</span>
            </div>
            <p className="mt-1 text-xl font-bold">{toPersianNumbers(stats.totalStudents)}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Dumbbell className="w-4 h-4" />
              <span>پیشرفت</span>
            </div>
            <p className="mt-1 text-xl font-bold">{toPersianNumbers(stats.studentsProgress)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
