
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  LineChart, 
  UtensilsCrossed, 
  Pill, 
  Dumbbell, 
  Sparkles 
} from "lucide-react";
import { DashboardStats } from "@/types/dashboard";

interface ActivitySummaryCardProps {
  stats: DashboardStats;
}

export const ActivitySummaryCard = ({ stats }: ActivitySummaryCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
            <LineChart className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </div>
          خلاصه فعالیت‌ها
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <UtensilsCrossed className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">برنامه‌های غذایی</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
              {toPersianNumbers(stats.totalMeals)} برنامه
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Pill className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium">مکمل‌های تجویز شده</span>
            </div>
            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800">
              {toPersianNumbers(stats.totalSupplements)} مورد
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Dumbbell className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
              <span className="text-sm font-medium">نرخ تکمیل تمرین‌ها</span>
            </div>
            <div className="flex items-center">
              <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ml-2">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                  style={{ width: `${stats.studentsProgress}%` }}
                />
              </div>
              <span className="text-xs font-medium">{toPersianNumbers(stats.studentsProgress)}٪</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t dark:border-slate-800">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white transition-colors duration-300" 
            asChild
          >
            <Link to="/Reports">
              <span>مشاهده گزارش کامل</span>
              <Sparkles className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
