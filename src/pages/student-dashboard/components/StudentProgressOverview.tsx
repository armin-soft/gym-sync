
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Calendar, Award } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

const progressData = [
  {
    title: "تمرینات هفتگی",
    current: 12,
    target: 15,
    unit: "تمرین",
    progress: 80,
    trend: "+15%",
    color: "emerald"
  },
  {
    title: "تغذیه و رژیم",
    current: 85,
    target: 100,
    unit: "درصد",
    progress: 85,
    trend: "+8%",
    color: "sky"
  },
  {
    title: "مصرف مکمل",
    current: 18,
    target: 21,
    unit: "روز",
    progress: 86,
    trend: "+12%",
    color: "purple"
  },
  {
    title: "اهداف ماهانه",
    current: 3,
    target: 4,
    unit: "هدف",
    progress: 75,
    trend: "+25%",
    color: "orange"
  }
];

export const StudentProgressOverview = () => {
  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            نمای کلی پیشرفت
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            هفته جاری
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {progressData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`bg-${item.color}-50 text-${item.color}-700 border-${item.color}-200`}>
                  {item.trend}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {toPersianNumbers(item.current.toString())} از {toPersianNumbers(item.target.toString())} {item.unit}
                </span>
                <span className="font-medium">
                  {toPersianNumbers(item.progress.toString())}%
                </span>
              </div>
              <Progress value={item.progress} className="h-3" />
            </div>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20 border border-emerald-200/50 dark:border-emerald-800/30"
        >
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h4 className="font-semibold text-emerald-900 dark:text-emerald-100">
                عملکرد فوق‌العاده!
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                شما در این هفته عملکرد بسیار خوبی داشته‌اید. ادامه دهید!
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
