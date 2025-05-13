
import { motion } from "framer-motion";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useTheme } from "@/hooks/use-theme";
import { useMemo } from "react";

interface ActivitiesChartProps {
  chartData: any[];
  chartConfig: any;
  customTooltip: (props: any) => JSX.Element | null;
  isMobile: boolean;
}

export const ActivitiesChart = ({
  chartData,
  chartConfig,
  customTooltip,
  isMobile
}: ActivitiesChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? ['#818cf8', '#4ade80', '#fbbf24', '#f472b6', '#a78bfa', '#22d3ee'] : 
                         ['#4f46e5', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

  // Create pie chart data
  const pieData = useMemo(() => {
    if (chartData.length > 0) {
      return [
        { name: 'تمرین', value: chartData[chartData.length - 1]?.تمرین || 0 },
        { name: 'مکمل', value: chartData[chartData.length - 1]?.مکمل || 0 },
        { name: 'برنامه_غذایی', value: chartData[chartData.length - 1]?.برنامه_غذایی || 0 }
      ];
    }
    return [];
  }, [chartData]);
  
  return (
    <motion.div
      key="activities-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <div>
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium">توزیع فعالیت‌ها</h3>
          <p className="text-sm text-muted-foreground">نسبت فعالیت‌های مختلف در ماه جاری</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${chartConfig[name]?.label || name}: ${toPersianNumbers((percent * 100).toFixed(0))}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium">روند فعالیت‌ها</h3>
          <p className="text-sm text-muted-foreground">تغییرات فعالیت‌ها در طول زمان</p>
        </div>
        
        <div className="bg-card rounded-lg p-4">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorExercise" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[2]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[2]} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorSupplement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[4]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[4]} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorDiet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[3]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[3]} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Tooltip content={customTooltip} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="تمرین" 
                stroke={colors[2]} 
                fillOpacity={0.3} 
                fill="url(#colorExercise)"
              />
              <Area 
                type="monotone" 
                dataKey="مکمل" 
                stroke={colors[4]} 
                fillOpacity={0.3} 
                fill="url(#colorSupplement)"
              />
              <Area 
                type="monotone" 
                dataKey="برنامه_غذایی" 
                stroke={colors[3]} 
                fillOpacity={0.3} 
                fill="url(#colorDiet)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
