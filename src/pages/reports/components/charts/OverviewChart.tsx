
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useTheme } from "@/hooks/use-theme";

interface OverviewChartProps {
  chartData: any[];
  chartConfig: any;
  chartHeight: number;
  customTooltip: (props: any) => JSX.Element | null;
  isMobile: boolean;
}

export const OverviewChart = ({
  chartData,
  chartConfig,
  chartHeight,
  customTooltip,
  isMobile
}: OverviewChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      key="overview-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">نمای کلی</h3>
        <p className="text-sm text-muted-foreground">روند شاگردان و درآمد در {toPersianNumbers(chartData.length)} ماه گذشته</p>
      </div>
      
      <div className="bg-card rounded-lg p-4">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
            <YAxis yAxisId="left" stroke={isDark ? '#94a3b8' : '#64748b'} />
            <YAxis yAxisId="right" orientation="right" stroke={isDark ? '#94a3b8' : '#64748b'} />
            <Tooltip content={customTooltip} />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="شاگردان" 
              stroke={isDark ? '#818cf8' : '#4f46e5'} 
              strokeWidth={2} 
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="درآمد" 
              stroke={isDark ? '#4ade80' : '#22c55e'} 
              strokeWidth={2} 
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-4">
          <div className="text-center mb-4">
            <h3 className="text-base font-medium">روند تعداد شاگردان</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? '#818cf8' : '#4f46e5'} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={isDark ? '#818cf8' : '#4f46e5'} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Tooltip content={customTooltip} />
              <Area 
                type="monotone" 
                dataKey="شاگردان" 
                stroke={isDark ? '#818cf8' : '#4f46e5'} 
                fillOpacity={1} 
                fill="url(#colorStudents)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-card rounded-lg p-4">
          <div className="text-center mb-4">
            <h3 className="text-base font-medium">روند درآمد (میلیون تومان)</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? '#4ade80' : '#22c55e'} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={isDark ? '#4ade80' : '#22c55e'} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Tooltip content={customTooltip} />
              <Area 
                type="monotone" 
                dataKey="درآمد" 
                stroke={isDark ? '#4ade80' : '#22c55e'} 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
