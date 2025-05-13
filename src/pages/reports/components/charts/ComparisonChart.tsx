
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useTheme } from "@/hooks/use-theme";

interface ComparisonChartProps {
  chartData: any[];
  chartConfig: any;
  chartHeight: number;
  customTooltip: (props: any) => JSX.Element | null;
  isMobile: boolean;
}

export const ComparisonChart = ({
  chartData,
  chartConfig,
  chartHeight,
  customTooltip,
  isMobile
}: ComparisonChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? ['#818cf8', '#4ade80', '#fbbf24', '#f472b6', '#a78bfa', '#22d3ee'] : 
                         ['#4f46e5', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
  
  return (
    <motion.div
      key="comparison-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">مقایسه فعالیت‌ها</h3>
        <p className="text-sm text-muted-foreground">مقایسه تعداد برنامه‌های مختلف در ماه‌های گذشته</p>
      </div>
      
      <div className="bg-card rounded-lg p-4">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
            <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
            <Tooltip content={customTooltip} />
            <Legend />
            <Bar dataKey="تمرین" fill={colors[2]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="مکمل" fill={colors[4]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="برنامه_غذایی" fill={colors[3]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
