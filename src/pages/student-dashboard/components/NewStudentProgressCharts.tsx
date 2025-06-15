
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NewStudentProgressChartsProps {
  data: any;
}

export const NewStudentProgressCharts: React.FC<NewStudentProgressChartsProps> = React.memo(({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-lg h-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            نمودار پیشرفت
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* پیشرفت هفتگی */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                پیشرفت هفتگی
              </span>
              <Badge variant="outline" className="text-xs">
                {toPersianNumbers(data.weeklyProgress.toString())}%
              </Badge>
            </div>
            <Progress value={data.weeklyProgress} className="h-3" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {toPersianNumbers(data.completedDays.toString())} از ۷ روز تکمیل شده
            </p>
          </div>

          {/* پیشرفت وزن */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                پیشرفت وزن
              </span>
              <Badge variant="outline" className="text-xs">
                {toPersianNumbers(data.weightProgress.toString())}%
              </Badge>
            </div>
            <Progress value={data.weightProgress} className="h-3" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              هدف: {toPersianNumbers(data.targetWeight.toString())} کیلو
            </p>
          </div>

          {/* نرخ تکمیل وعده‌ها */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                تکمیل وعده‌های غذایی
              </span>
              <Badge variant="outline" className="text-xs">
                {toPersianNumbers(data.mealCompletionRate.toString())}%
              </Badge>
            </div>
            <Progress value={data.mealCompletionRate} className="h-3" />
          </div>

          {/* نرخ مصرف مکمل‌ها */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                مصرف مکمل‌ها
              </span>
              <Badge variant="outline" className="text-xs">
                {toPersianNumbers(data.supplementCompletionRate.toString())}%
              </Badge>
            </div>
            <Progress value={data.supplementCompletionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

NewStudentProgressCharts.displayName = "NewStudentProgressCharts";
