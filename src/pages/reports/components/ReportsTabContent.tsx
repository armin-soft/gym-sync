
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, TrendingUp, Filter } from "lucide-react";
import { MonthlyDataChart } from "@/components/reports/MonthlyDataChart";
import { IncomeChart } from "@/components/reports/IncomeChart";
import { ActivitiesChart } from "@/components/reports/ActivitiesChart";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { calculateGrowth } from "@/lib/utils/reports";

interface ReportsTabContentProps {
  activeTab: string;
  monthlyData: any[];
  expandedData: any[];
  chartConfig: any;
  isMobile: boolean;
}

export const ReportsTabContent = ({
  activeTab,
  monthlyData,
  expandedData,
  chartConfig,
  isMobile
}: ReportsTabContentProps) => {
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {activeTab === "overview" && (
        <Card className="border-border/60 backdrop-blur-sm bg-card/95 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold">روند کلی عملکرد</h3>
                <p className="text-xs text-muted-foreground">مقایسه شاخص‌های کلیدی در طول زمان</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <Calendar className="w-3.5 h-3.5 ml-1" />
                  انتخاب بازه زمانی
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs px-2">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <MonthlyDataChart 
              data={expandedData} 
              chartConfig={chartConfig}
              isMobile={isMobile}
            />
          </div>
        </Card>
      )}

      {activeTab === "income" && (
        <Card className="border-border/60 backdrop-blur-sm bg-card/95 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold">تحلیل درآمد</h3>
                <p className="text-xs text-muted-foreground">روند درآمد و رشد مالی در طول زمان</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">
                    {toPersianNumbers(calculateGrowth(currentMonth.درآمد, previousMonth.درآمد))}٪ رشد
                  </span>
                </div>
              </div>
            </div>
            <IncomeChart 
              data={expandedData}
              isMobile={isMobile}
            />
          </div>
        </Card>
      )}

      {activeTab === "activities" && (
        <Card className="border-border/60 backdrop-blur-sm bg-card/95 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold">تحلیل فعالیت‌ها</h3>
                <p className="text-xs text-muted-foreground">مقایسه انواع فعالیت‌های انجام شده</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <Filter className="w-3.5 h-3.5 ml-1" />
                  نمایش بر اساس
                </Button>
              </div>
            </div>
            <ActivitiesChart 
              data={expandedData} 
              chartConfig={chartConfig}
              isMobile={isMobile}
            />
          </div>
        </Card>
      )}
    </motion.div>
  );
};
