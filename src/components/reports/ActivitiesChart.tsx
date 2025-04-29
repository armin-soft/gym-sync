
import { Card } from "@/components/ui/card";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface ActivitiesChartProps {
  data: any[];
  chartConfig: any;
  isMobile?: boolean;
}

export const ActivitiesChart = ({ data, chartConfig, isMobile = false }: ActivitiesChartProps) => {
  return (
    <Card className={`${isMobile ? 'p-3' : 'p-4 md:p-6'}`}>
      <h3 className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} font-semibold mb-4 md:mb-6`}>فعالیت‌های ماهانه</h3>
      <div className={`${isMobile ? 'h-[300px]' : 'h-[350px] md:h-[400px]'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#888"
              tick={{ 
                fill: '#888',
                fontSize: isMobile ? 8 : 10
              }} 
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              stroke="#888" 
              tickFormatter={(value) => toPersianNumbers(value)}
              tick={{ fontSize: isMobile ? 8 : 10 }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                toPersianNumbers(value), 
                chartConfig[name as keyof typeof chartConfig]?.label || name
              ]}
              labelFormatter={(label) => `ماه: ${label}`}
              contentStyle={{ fontSize: isMobile ? 10 : 12 }}
            />
            <Legend 
              iconType="circle"
              iconSize={isMobile ? 6 : 8}
              wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
            />
            <Line 
              type="monotone" 
              dataKey="تمرین" 
              stroke="#f59e0b" 
              strokeWidth={isMobile ? 1 : 2}
              dot={{ stroke: '#f59e0b', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
              activeDot={{ r: isMobile ? 4 : 6, stroke: '#f59e0b', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
              name="برنامه‌های تمرینی" 
            />
            <Line 
              type="monotone" 
              dataKey="برنامه_غذایی" 
              stroke="#ec4899" 
              strokeWidth={isMobile ? 1 : 2}
              dot={{ stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
              activeDot={{ r: isMobile ? 4 : 6, stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
              name="برنامه‌های غذایی" 
            />
            <Line 
              type="monotone" 
              dataKey="مکمل" 
              stroke="#8b5cf6" 
              strokeWidth={isMobile ? 1 : 2}
              dot={{ stroke: '#8b5cf6', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
              activeDot={{ r: isMobile ? 4 : 6, stroke: '#8b5cf6', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
              name="مکمل‌های تجویز شده" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
