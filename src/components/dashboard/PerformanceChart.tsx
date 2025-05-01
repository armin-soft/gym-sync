
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { PieChart, LineChart, MoreVertical, Layers, Calendar, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardStats } from "@/types/dashboard";
import {
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell,
} from "recharts";

interface PerformanceChartProps {
  stats: DashboardStats;
}

export const PerformanceChart = ({ stats }: PerformanceChartProps) => {
  const [chartType, setChartType] = useState("line");
  const [timeRange, setTimeRange] = useState("month");
  
  // Sample data for charts - would be replaced with real data from API
  const lineData = [
    { name: "فروردین", students: 20, progress: 30 },
    { name: "اردیبهشت", students: 25, progress: 35 },
    { name: "خرداد", students: 30, progress: 40 },
    { name: "تیر", students: 35, progress: 45 },
    { name: "مرداد", students: 40, progress: 50 },
    { name: "شهریور", students: 45, progress: 55 },
  ];
  
  const pieData = [
    { name: "برنامه غذایی", value: stats.totalMeals, color: "#10b981" },
    { name: "برنامه تمرینی", value: stats.totalStudents * 2, color: "#f59e0b" },
    { name: "مکمل و ویتامین", value: stats.totalSupplements, color: "#8b5cf6" },
  ];
  
  // Range options for filtering
  const timeRangeOptions = {
    week: "هفته",
    month: "ماه",
    year: "سال",
  };

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 pb-4 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
              <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-lg font-bold">آمار عملکرد</CardTitle>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Chart type selector */}
            <Tabs
              value={chartType}
              onValueChange={setChartType}
              className="w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="line" className="text-xs flex items-center gap-1">
                  <LineChart className="h-3.5 w-3.5" />
                  نمودار خطی
                </TabsTrigger>
                <TabsTrigger value="pie" className="text-xs flex items-center gap-1">
                  <PieChart className="h-3.5 w-3.5" />
                  نمودار دایره‌ای
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Time range dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 flex items-center gap-1 text-xs"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  {timeRangeOptions[timeRange as keyof typeof timeRangeOptions]}
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>بازه زمانی</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTimeRange("week")}>هفته اخیر</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("month")}>ماه اخیر</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("year")}>سال اخیر</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Actions dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>دانلود گزارش</DropdownMenuItem>
                <DropdownMenuItem>اشتراک‌گذاری</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>تنظیمات نمودار</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <motion.div
          key={chartType} // Re-render animation when chart type changes
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[300px]"
        >
          {chartType === "line" ? (
            <LineChartComponent data={lineData} />
          ) : (
            <PieChartComponent data={pieData} />
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

// Line Chart Component
const LineChartComponent = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 10 }}
          tickFormatter={(value) => value}
        />
        <YAxis 
          tickFormatter={(value) => toPersianNumbers(value)}
          tick={{ fontSize: 10 }}
        />
        <Tooltip
          formatter={(value) => toPersianNumbers(value as number)}
          labelFormatter={(value) => `${value}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="students"
          name="تعداد شاگردان"
          stroke="#4f46e5"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="progress"
          name="درصد پیشرفت"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartLineChart>
    </ResponsiveContainer>
  );
};

// Pie Chart Component
const PieChartComponent = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${toPersianNumbers((percent * 100).toFixed(0))}%`}
          strokeWidth={1}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => toPersianNumbers(value as number)}
          labelFormatter={(_, payload) => payload?.[0]?.name || ""}
        />
        <Legend />
      </RechartPieChart>
    </ResponsiveContainer>
  );
};
