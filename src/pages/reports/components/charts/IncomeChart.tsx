
import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useTheme } from "@/hooks/use-theme";

interface IncomeChartProps {
  chartData: any[];
  chartConfig: any;
  chartHeight: number;
  customTooltip: (props: any) => JSX.Element | null;
  isMobile: boolean;
}

export const IncomeChart = ({
  chartData,
  chartConfig,
  chartHeight,
  customTooltip,
  isMobile
}: IncomeChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? ['#818cf8', '#4ade80', '#fbbf24', '#f472b6', '#a78bfa', '#22d3ee'] : 
                         ['#4f46e5', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
  
  return (
    <motion.div
      key="income-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">گزارش درآمد</h3>
        <p className="text-sm text-muted-foreground">روند درآمد و نرخ رشد در {toPersianNumbers(chartData.length)} ماه گذشته</p>
      </div>
      
      <div className="bg-card rounded-lg p-4 mb-6">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors[1]} stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
            <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
            <Tooltip content={customTooltip} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="درآمد" 
              stroke={colors[1]} 
              fillOpacity={1} 
              fill="url(#colorIncome)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">نرخ رشد درآمد</h3>
        <p className="text-sm text-muted-foreground">درصد تغییرات درآمد نسبت به ماه قبل</p>
      </div>
      
      <div className="bg-card rounded-lg p-4">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
            <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
            <Tooltip content={customTooltip} />
            <Bar dataKey="رشد" fill={colors[3]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
