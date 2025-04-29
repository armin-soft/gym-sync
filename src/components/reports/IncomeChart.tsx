
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
  Area, 
  ResponsiveContainer 
} from "recharts";

interface IncomeChartProps {
  data: any[];
  isMobile?: boolean;
}

export const IncomeChart = ({ data, isMobile = false }: IncomeChartProps) => {
  return (
    <Card className={`${isMobile ? 'p-3' : 'p-4 md:p-6'}`}>
      <h3 className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} font-semibold mb-4 md:mb-6`}>روند درآمد ماهانه</h3>
      <div className={`${isMobile ? 'h-[300px]' : 'h-[350px] md:h-[400px]'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
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
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              stroke="#888" 
              tickFormatter={(value) => toPersianNumbers(Math.floor(value / 1000))}
              tick={{ fontSize: isMobile ? 8 : 10 }}
              label={!isMobile ? { 
                value: 'هزار تومان', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fontSize: 10 }
              } : undefined}
            />
            <Tooltip 
              formatter={(value: number) => [`${toPersianNumbers(value.toLocaleString())} تومان`, "درآمد"]}
              labelFormatter={(label) => `ماه: ${label}`}
              contentStyle={{ fontSize: isMobile ? 10 : 12 }}
            />
            <Legend 
              iconType="circle"
              iconSize={isMobile ? 6 : 8}
              wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
            />
            <Area 
              type="monotone" 
              dataKey="درآمد" 
              stroke="#22c55e" 
              strokeWidth={isMobile ? 1 : 2}
              fillOpacity={1}
              fill="url(#colorIncome)"
              dot={{ stroke: '#22c55e', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
              activeDot={{ r: isMobile ? 4 : 6, stroke: '#22c55e', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
              name="درآمد (تومان)" 
            />
            {data[0]?.رشد_درآمد !== undefined && (
              <Line 
                type="monotone" 
                dataKey="رشد_درآمد" 
                stroke="#ec4899" 
                strokeWidth={isMobile ? 1 : 2}
                dot={{ stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
                activeDot={{ r: isMobile ? 4 : 6, stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
                yAxisId={1}
                name="رشد درآمد (%)" 
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
