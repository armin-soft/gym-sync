
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
import { motion } from "framer-motion";

interface MonthlyDataChartProps {
  data: any[];
  chartConfig: any;
  isMobile?: boolean;
}

export const MonthlyDataChart = ({ data, chartConfig, isMobile = false }: MonthlyDataChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${isMobile ? 'h-[300px]' : 'h-[350px] md:h-[400px]'} w-full`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
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
            tickLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            yAxisId="left"
            stroke="#888" 
            tickFormatter={(value) => toPersianNumbers(value)}
            tick={{ fontSize: isMobile ? 8 : 10 }}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${toPersianNumbers(value / 1000)} هزار`}
            tick={{ fontSize: isMobile ? 8 : 10 }}
            stroke="#22c55e"
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === 'درآمد') {
                return [`${toPersianNumbers(value.toLocaleString())} تومان`, chartConfig[name]?.label || name];
              }
              return [toPersianNumbers(value), chartConfig[name]?.label || name];
            }}
            labelFormatter={(label) => `${label}`}
            contentStyle={{ 
              fontSize: isMobile ? 10 : 12, 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
          />
          <Legend 
            iconType="circle"
            iconSize={isMobile ? 6 : 8}
            wrapperStyle={{ fontSize: isMobile ? 9 : 11, paddingTop: 10 }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="شاگردان" 
            stroke="#4f46e5" 
            strokeWidth={isMobile ? 1.5 : 2.5}
            dot={{ stroke: '#4f46e5', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
            activeDot={{ r: isMobile ? 5 : 7, stroke: '#4f46e5', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
            name="تعداد شاگردان" 
            fillOpacity={1}
            fill="url(#colorStudents)"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="درآمد" 
            stroke="#22c55e" 
            strokeWidth={isMobile ? 1.5 : 2.5}
            dot={{ stroke: '#22c55e', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
            activeDot={{ r: isMobile ? 5 : 7, stroke: '#22c55e', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
            name="درآمد (تومان)" 
            fillOpacity={1}
            fill="url(#colorIncome)"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
