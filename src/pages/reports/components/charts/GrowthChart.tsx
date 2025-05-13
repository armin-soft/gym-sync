
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from "@/hooks/use-theme";

interface GrowthChartProps {
  chartData: any[];
  chartConfig: any;
  chartHeight: number;
  customTooltip: (props: any) => JSX.Element | null;
  isMobile: boolean;
}

export const GrowthChart = ({
  chartData,
  chartConfig,
  chartHeight,
  customTooltip,
  isMobile
}: GrowthChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? ['#818cf8', '#4ade80', '#fbbf24', '#f472b6', '#a78bfa', '#22d3ee'] : 
                         ['#4f46e5', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
  
  return (
    <motion.div
      key="growth-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">نرخ رشد</h3>
        <p className="text-sm text-muted-foreground">مقایسه نرخ رشد شاگردان و درآمد</p>
      </div>
      
      <div className="bg-card rounded-lg p-4">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
            <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
            <Tooltip content={customTooltip} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="رشد_شاگردان" 
              stroke={colors[0]} 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="رشد_درآمد" 
              stroke={colors[3]} 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
