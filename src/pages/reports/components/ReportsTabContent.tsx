
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useTheme } from "@/hooks/use-theme";

interface ReportsTabContentProps {
  activeTab: string;
  monthlyData: any[];
  expandedData: any[];
  chartConfig: any;
  isMobile: boolean;
}

const COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
const DARK_COLORS = ['#818cf8', '#4ade80', '#fbbf24', '#f472b6', '#a78bfa', '#22d3ee'];

export const ReportsTabContent = ({
  activeTab,
  monthlyData,
  expandedData,
  chartConfig,
  isMobile
}: ReportsTabContentProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? DARK_COLORS : COLORS;
  
  const [chartHeight, setChartHeight] = useState(400);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Set chart height based on screen size
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setChartHeight(280);
      } else if (width < 1024) {
        setChartHeight(350);
      } else {
        setChartHeight(400);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    // Prepare data for the active tab
    if (activeTab === 'income') {
      setChartData(monthlyData.map(month => ({
        name: month.month,
        درآمد: month.درآمد,
        رشد: month.رشد_درآمد
      })));
    } else if (activeTab === 'growth') {
      setChartData(monthlyData.map(month => ({
        name: month.month,
        رشد_شاگردان: month.رشد_شاگردان,
        رشد_درآمد: month.رشد_درآمد
      })));
    } else if (activeTab === 'activities' || activeTab === 'comparison') {
      setChartData(monthlyData.map(month => ({
        name: month.month,
        تمرین: month.تمرین,
        مکمل: month.مکمل,
        برنامه_غذایی: month.برنامه_غذایی
      })));
    } else {
      // Overview tab
      setChartData(monthlyData.map(month => ({
        name: month.month,
        شاگردان: month.شاگردان,
        درآمد: month.درآمد / 1000000 // Convert to millions for better scaling
      })));
    }
  }, [activeTab, monthlyData]);

  const formatTooltip = (value: number, name: string) => {
    if (name === 'درآمد' && activeTab === 'overview') {
      return [`${toPersianNumbers(value)} میلیون`, chartConfig[name]?.label];
    }
    if (name === 'درآمد') {
      return [`${toPersianNumbers(value.toLocaleString())} تومان`, chartConfig[name]?.label];
    }
    if (name.includes('رشد')) {
      return [`${toPersianNumbers(value.toFixed(1))}%`, chartConfig[name]?.label];
    }
    return [toPersianNumbers(value), chartConfig[name]?.label];
  };
  
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border/30 rounded-lg shadow-lg">
          <p className="text-sm font-medium mb-2 text-foreground">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`tooltip-${index}`} className="flex items-center text-xs">
                <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }} />
                <span className="text-muted-foreground">{chartConfig[entry.name]?.label}: </span>
                <span className="font-medium ml-1">{formatTooltip(entry.value, entry.name)[0]}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Create pie chart data for the activities tab
  const pieData = activeTab === 'activities' ? [
    { name: 'تمرین', value: chartData.length > 0 ? chartData[chartData.length - 1]?.تمرین || 0 : 0 },
    { name: 'مکمل', value: chartData.length > 0 ? chartData[chartData.length - 1]?.مکمل || 0 : 0 },
    { name: 'برنامه_غذایی', value: chartData.length > 0 ? chartData[chartData.length - 1]?.برنامه_غذایی || 0 : 0 }
  ] : [];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'income':
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

      case 'growth':
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

      case 'activities':
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
                      label={({ name, percent }) => `${chartConfig[name]?.label}: ${toPersianNumbers((percent * 100).toFixed(0))}%`}
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

      case 'comparison':
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

      default: // overview
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
                    stroke={colors[0]} 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }}
                    dot={{ r: 4 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="درآمد" 
                    stroke={colors[1]} 
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
                        <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors[0]} stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
                    <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
                    <Tooltip content={customTooltip} />
                    <Area 
                      type="monotone" 
                      dataKey="شاگردان" 
                      stroke={colors[0]} 
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
                        <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors[1]} stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} />
                    <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
                    <Tooltip content={customTooltip} />
                    <Area 
                      type="monotone" 
                      dataKey="درآمد" 
                      stroke={colors[1]} 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <TabsContent key={activeTab} value={activeTab} className="mt-0 outline-none">
        {renderActiveTabContent()}
      </TabsContent>
    </AnimatePresence>
  );
};
