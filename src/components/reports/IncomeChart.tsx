
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
}

export const IncomeChart = ({ data }: IncomeChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">روند درآمد ماهانه</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis 
              stroke="#888" 
              tickFormatter={(value) => toPersianNumbers(Math.floor(value / 1000))}
              label={{ 
                value: 'هزار تومان', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              formatter={(value: number) => [`${toPersianNumbers(value.toLocaleString())} تومان`, "درآمد"]}
              labelFormatter={(label) => `ماه: ${label}`}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="درآمد" 
              stroke="#22c55e" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIncome)"
              dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4, fill: '#fff' }}
              activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
              name="درآمد (تومان)" 
            />
            {data[0]?.رشد_درآمد !== undefined && (
              <Line 
                type="monotone" 
                dataKey="رشد_درآمد" 
                stroke="#ec4899" 
                strokeWidth={2}
                dot={{ stroke: '#ec4899', strokeWidth: 2, r: 4, fill: '#fff' }}
                activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2, fill: '#fff' }}
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
