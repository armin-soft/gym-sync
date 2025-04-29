
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  ComposedChart, 
  Area, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell,
  ResponsiveContainer 
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { StatsSummary } from "./StatsSummary";

interface MonthlyDataChartProps {
  data: any[];
  chartConfig: any;
  isMobile?: boolean;
}

export const MonthlyDataChart = ({ data, chartConfig, isMobile = false }: MonthlyDataChartProps) => {
  return (
    <Card className={`${isMobile ? 'p-3' : 'p-4 md:p-6'}`}>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} font-semibold`}>روند رشد شاگردان و درآمد</h3>
        <div className="flex items-center gap-1 sm:gap-2 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 sm:py-1 rounded-md">
          <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-[10px] sm:text-xs">نمایش {toPersianNumbers(data.length)} ماه اخیر</span>
        </div>
      </div>
      <div className={`${isMobile ? 'h-[300px]' : 'h-[350px] md:h-[450px]'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={data}
            margin={{ 
              top: isMobile ? 10 : 20, 
              right: isMobile ? 15 : 30, 
              left: isMobile ? 10 : 20, 
              bottom: isMobile ? 0 : 5 
            }}
          >
            <defs>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#888" 
              tick={{ 
                fill: '#888',
                fontSize: isMobile ? 8 : 10
              }}
              tickFormatter={(value) => value}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              yAxisId="left" 
              stroke="#4f46e5" 
              tickFormatter={(value) => toPersianNumbers(value)}
              tick={{ fontSize: isMobile ? 8 : 10 }}
              label={!isMobile ? { 
                value: 'تعداد شاگردان', 
                angle: 90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#4f46e5', fontSize: 10 },
                offset: 0
              } : undefined}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#22c55e"
              tickFormatter={(value) => toPersianNumbers(Math.floor(value / 1000))}
              tick={{ fontSize: isMobile ? 8 : 10 }}
              label={!isMobile ? { 
                value: 'درآمد (هزار تومان)', 
                angle: -90, 
                position: 'insideRight',
                style: { textAnchor: 'middle', fill: '#22c55e', fontSize: 10 },
                offset: 0
              } : undefined}
            />
            <YAxis 
              yAxisId="growth" 
              orientation="right" 
              stroke="#f59e0b"
              tickFormatter={(value) => `${toPersianNumbers(value)}%`}
              hide
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 sm:p-4 border rounded-lg shadow-lg text-xs sm:text-sm">
                      <p className="font-bold mb-1 sm:mb-2">{payload[0].payload.name}</p>
                      {payload.map((entry, index) => {
                        let value = entry.value;
                        let formattedValue;
                        
                        if (entry.dataKey === 'شاگردان') {
                          formattedValue = toPersianNumbers(value as number);
                        } else if (entry.dataKey === 'درآمد') {
                          formattedValue = `${toPersianNumbers((value as number).toLocaleString())} تومان`;
                        } else if (entry.dataKey === 'رشد_شاگردان' || entry.dataKey === 'رشد_درآمد') {
                          formattedValue = `${toPersianNumbers(value as number)}%`;
                        }
                        
                        return (
                          <div key={index} className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                            <div 
                              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-[10px] sm:text-xs text-gray-700">
                              {chartConfig[entry.dataKey as keyof typeof chartConfig]?.label}: {formattedValue}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              formatter={(value) => <span className="text-[10px] sm:text-xs">{value}</span>}
              iconType="circle"
              iconSize={isMobile ? 6 : 8}
            />
            <Area 
              yAxisId="left" 
              type="monotone" 
              dataKey="شاگردان" 
              fill="url(#colorStudents)" 
              stroke="#4f46e5" 
              strokeWidth={isMobile ? 1 : 2}
              name="تعداد شاگردان"
              activeDot={{ r: isMobile ? 4 : 6, strokeWidth: 0, fill: '#4f46e5' }}
            />
            <Bar 
              yAxisId="right" 
              dataKey="درآمد" 
              barSize={isMobile ? 10 : 20}
              name="درآمد"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#16a34a' : '#22c55e'} />
              ))}
            </Bar>
            <Line 
              yAxisId="growth" 
              type="monotone" 
              dataKey="رشد_شاگردان" 
              stroke="#f59e0b" 
              strokeWidth={isMobile ? 1 : 2}
              dot={{ stroke: '#f59e0b', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
              activeDot={{ r: isMobile ? 4 : 6, stroke: '#f59e0b', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
              name="رشد شاگردان (%)"
            />
            <Line 
              yAxisId="growth" 
              type="monotone" 
              dataKey="رشد_درآمد" 
              stroke="#ec4899" 
              strokeWidth={isMobile ? 1 : 2}
              strokeDasharray="5 5"
              dot={{ stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
              activeDot={{ r: isMobile ? 4 : 6, stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
              name="رشد درآمد (%)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <StatsSummary 
        data={data} 
        growthData={data[data.length - 1]} 
        isMobile={isMobile}
      />
    </Card>
  );
};
