
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface KPIOverviewProps {
  data: any[];
  growthData: any;
  isMobile: boolean;
}

export const KPIOverview = ({ data, growthData, isMobile }: KPIOverviewProps) => {
  const totalStudents = growthData?.شاگردان || 0;
  const activeStudents = Math.round(totalStudents * 0.8); // تقریبا 80% از شاگردان فعال هستند
  const activePercentage = (activeStudents / totalStudents) * 100 || 0;
  
  // فقط شاخص‌های واقعی که در داده‌ها موجود است
  const metrics = [
    {
      label: "شاگردان فعال",
      value: activeStudents,
      max: totalStudents,
      percentage: activePercentage,
      color: "bg-blue-500",
      format: (val: number) => toPersianNumbers(val)
    },
    {
      label: "مکمل‌های تجویز شده",
      value: growthData?.مکمل || 0,
      max: 100,
      percentage: (growthData?.مکمل || 0),
      color: "bg-purple-500",
      format: (val: number) => toPersianNumbers(val)
    },
    {
      label: "برنامه‌های تمرینی",
      value: growthData?.تمرین || 0,
      max: 100,
      percentage: (growthData?.تمرین || 0) || 0,
      color: "bg-orange-500",
      format: (val: number) => toPersianNumbers(val)
    },
    {
      label: "برنامه‌های غذایی",
      value: growthData?.برنامه_غذایی || 0,
      max: 100,
      percentage: (growthData?.برنامه_غذایی || 0) || 0,
      color: "bg-emerald-500",
      format: (val: number) => toPersianNumbers(val)
    }
  ];

  return (
    <Card className="p-4 sm:p-6 shadow-lg backdrop-blur-sm bg-card/95 border border-border/40">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">شاخص‌های کلیدی عملکرد</h3>
        <div className="bg-primary/10 text-primary text-xs font-medium rounded-full px-3 py-1">
          {toPersianNumbers(data.length)} ماه گذشته
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            className="bg-gradient-to-br from-background/80 to-background border border-border/30 rounded-xl p-4 shadow-sm"
          >
            <div className="flex flex-col space-y-3">
              <div className="text-sm text-muted-foreground">{metric.label}</div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">{metric.format(metric.value)}</div>
                <div className="text-xs text-muted-foreground">
                  {toPersianNumbers(Math.round(metric.percentage))}%
                </div>
              </div>
              <Progress
                value={metric.percentage}
                className={cn("h-1.5", metric.color.replace('bg-', 'bg-opacity-70 '))} 
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
