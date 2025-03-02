
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
}

export const ActivitiesChart = ({ data, chartConfig }: ActivitiesChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">فعالیت‌های ماهانه</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis 
              stroke="#888" 
              tickFormatter={(value) => toPersianNumbers(value)}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                toPersianNumbers(value), 
                chartConfig[name as keyof typeof chartConfig]?.label || name
              ]}
              labelFormatter={(label) => `ماه: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="تمرین" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={{ stroke: '#f59e0b', strokeWidth: 2, r: 4, fill: '#fff' }}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
              name="برنامه‌های تمرینی" 
            />
            <Line 
              type="monotone" 
              dataKey="برنامه_غذایی" 
              stroke="#ec4899" 
              strokeWidth={2}
              dot={{ stroke: '#ec4899', strokeWidth: 2, r: 4, fill: '#fff' }}
              activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2, fill: '#fff' }}
              name="برنامه‌های غذایی" 
            />
            <Line 
              type="monotone" 
              dataKey="مکمل" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4, fill: '#fff' }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
              name="مکمل‌های تجویز شده" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
