
import { Card } from "@/components/ui/card";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${isMobile ? 'h-[300px]' : 'h-[350px] md:h-[400px]'} w-full`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
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
            yAxisId="left"
            stroke="#22c55e" 
            tickFormatter={(value) => toPersianNumbers(Math.floor(value / 1000))}
            tick={{ fontSize: isMobile ? 8 : 10 }}
            label={!isMobile ? { 
              value: 'هزار تومان', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 10, fill: '#22c55e' }
            } : undefined}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#ec4899"
            tickFormatter={(value) => `${toPersianNumbers(value)}%`}
            tick={{ fontSize: isMobile ? 8 : 10 }}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === "درآمد") {
                return [`${toPersianNumbers(value.toLocaleString())} تومان`, "درآمد"];
              } else if (name === "رشد_درآمد") {
                return [`${toPersianNumbers(value)}%`, "رشد درآمد"];
              }
              return [value, name];
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
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="درآمد" 
            stroke="#22c55e" 
            strokeWidth={isMobile ? 1.5 : 2.5}
            fillOpacity={1}
            fill="url(#colorIncome)"
            dot={{ stroke: '#22c55e', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
            activeDot={{ r: isMobile ? 5 : 7, stroke: '#22c55e', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
            name="درآمد (تومان)" 
          />
          {data[0]?.رشد_درآمد !== undefined && (
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="رشد_درآمد" 
              stroke="#ec4899" 
              strokeWidth={isMobile ? 1.5 : 2.5}
              dot={{ stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
              activeDot={{ r: isMobile ? 5 : 7, stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
              name="رشد درآمد (%)" 
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
