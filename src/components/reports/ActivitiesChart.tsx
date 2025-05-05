
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
  ResponsiveContainer,
  AreaChart, 
  Area,
  PieChart, 
  Pie, 
  Cell
} from "recharts";

interface ActivitiesChartProps {
  data: any[];
  chartConfig: any;
  isMobile?: boolean;
}

export const ActivitiesChart = ({ data, chartConfig, isMobile = false }: ActivitiesChartProps) => {
  // آخرین داده‌ها برای نمودار دایره‌ای
  const latestData = data[data.length - 1];
  
  const pieData = [
    { name: 'برنامه‌های تمرینی', value: latestData.تمرین },
    { name: 'برنامه‌های غذایی', value: latestData.برنامه_غذایی },
    { name: 'مکمل‌های تجویز شده', value: latestData.مکمل },
  ];
  
  const COLORS = ['#f59e0b', '#ec4899', '#8b5cf6'];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-card/90 backdrop-blur-sm rounded-lg border border-border/50 p-4`}
        >
          <h4 className="text-sm font-medium mb-4">روند فعالیت‌ها در طول زمان</h4>
          <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'} w-full`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTraining" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDiet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSupplement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
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
                  tickFormatter={(value) => toPersianNumbers(value)}
                  tick={{ fontSize: isMobile ? 8 : 10 }}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    toPersianNumbers(value), 
                    chartConfig[name as keyof typeof chartConfig]?.label || name
                  ]}
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
                  type="monotone" 
                  dataKey="تمرین" 
                  stroke="#f59e0b" 
                  strokeWidth={isMobile ? 1.5 : 2}
                  fillOpacity={1}
                  fill="url(#colorTraining)"
                  dot={{ stroke: '#f59e0b', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
                  activeDot={{ r: isMobile ? 5 : 7, stroke: '#f59e0b', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
                  name="برنامه‌های تمرینی" 
                />
                <Area 
                  type="monotone" 
                  dataKey="برنامه_غذایی" 
                  stroke="#ec4899" 
                  strokeWidth={isMobile ? 1.5 : 2}
                  fillOpacity={1}
                  fill="url(#colorDiet)"
                  dot={{ stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
                  activeDot={{ r: isMobile ? 5 : 7, stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
                  name="برنامه‌های غذایی" 
                />
                <Area 
                  type="monotone" 
                  dataKey="مکمل" 
                  stroke="#8b5cf6" 
                  strokeWidth={isMobile ? 1.5 : 2}
                  fillOpacity={1}
                  fill="url(#colorSupplement)"
                  dot={{ stroke: '#8b5cf6', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
                  activeDot={{ r: isMobile ? 5 : 7, stroke: '#8b5cf6', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
                  name="مکمل‌های تجویز شده" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`bg-card/90 backdrop-blur-sm rounded-lg border border-border/50 p-4`}
        >
          <h4 className="text-sm font-medium mb-4">توزیع فعالیت‌های ماه جاری</h4>
          <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'} w-full`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${toPersianNumbers((percent * 100).toFixed(0))}%`}
                  outerRadius={isMobile ? 80 : 100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend 
                  formatter={(value, entry, index) => {
                    return (
                      <span style={{ color: COLORS[index % COLORS.length], fontSize: isMobile ? 9 : 11, fontWeight: 500 }}>
                        {value}
                      </span>
                    );
                  }}
                />
                <Tooltip
                  formatter={(value: number) => [toPersianNumbers(value), "تعداد"]}
                  contentStyle={{ 
                    fontSize: isMobile ? 10 : 12,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.05)' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card/90 backdrop-blur-sm rounded-lg border border-border/50 p-4"
      >
        <h4 className="text-sm font-medium mb-4">مقایسه تفصیلی فعالیت‌ها</h4>
        <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'} w-full`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
                tickFormatter={(value) => toPersianNumbers(value)}
                tick={{ fontSize: isMobile ? 8 : 10 }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  toPersianNumbers(value), 
                  chartConfig[name as keyof typeof chartConfig]?.label || name
                ]}
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
                type="monotone" 
                dataKey="تمرین" 
                stroke="#f59e0b" 
                strokeWidth={isMobile ? 1.5 : 2.5}
                dot={{ stroke: '#f59e0b', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
                activeDot={{ r: isMobile ? 5 : 7, stroke: '#f59e0b', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
                name="برنامه‌های تمرینی" 
              />
              <Line 
                type="monotone" 
                dataKey="برنامه_غذایی" 
                stroke="#ec4899" 
                strokeWidth={isMobile ? 1.5 : 2.5}
                dot={{ stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
                activeDot={{ r: isMobile ? 5 : 7, stroke: '#ec4899', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
                name="برنامه‌های غذایی" 
              />
              <Line 
                type="monotone" 
                dataKey="مکمل" 
                stroke="#8b5cf6" 
                strokeWidth={isMobile ? 1.5 : 2.5}
                dot={{ stroke: '#8b5cf6', strokeWidth: isMobile ? 1 : 2, r: isMobile ? 3 : 4, fill: '#fff' }}
                activeDot={{ r: isMobile ? 5 : 7, stroke: '#8b5cf6', strokeWidth: isMobile ? 1 : 2, fill: '#fff' }}
                name="مکمل‌های تجویز شده" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
