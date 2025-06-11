
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChartContainer } from "./ChartContainer";
import { CustomTooltip } from "./CustomTooltip";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface GenderData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface GenderDistributionChartProps {
  data: GenderData[];
}

export const GenderDistributionChart: React.FC<GenderDistributionChartProps> = ({ data }) => {
  if (!data.length) return null;

  return (
    <ChartContainer
      title="توزیع جنسیتی شاگردان"
      description="آمار تفکیکی بر اساس جنسیت"
      delay={0.5}
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {item.name}
              </span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {toPersianNumbers(item.value.toString())} نفر
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {toPersianNumbers(item.percentage.toString())}%
            </div>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
};
