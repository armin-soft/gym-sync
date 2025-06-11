
import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const ChartsSection = () => {
  // داده‌های نمونه برای نمودارها
  const monthlyData = [
    { month: "فروردین", students: 45, sessions: 120 },
    { month: "اردیبهشت", students: 52, sessions: 145 },
    { month: "خرداد", students: 48, sessions: 135 },
    { month: "تیر", students: 61, sessions: 180 },
    { month: "مرداد", students: 55, sessions: 165 },
    { month: "شهریور", students: 67, sessions: 195 }
  ];

  const genderData = [
    { name: "آقایان", value: 65, color: "#8b5cf6" },
    { name: "بانوان", value: 35, color: "#06b6d4" }
  ];

  const progressData = [
    { category: "مبتدی", value: 35 },
    { category: "متوسط", value: 45 },
    { category: "پیشرفته", value: 20 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* نمودار ستونی - آمار ماهانه */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              آمار ماهانه شاگردان و جلسات
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              نمای کلی از رشد شاگردان و تعداد جلسات برگزار شده
            </p>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="studentsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => toPersianNumbers(value.toString())}
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#studentsGradient)"
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#06b6d4" 
                  fillOpacity={1} 
                  fill="url(#sessionsGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* نمودار دایره‌ای - توزیع جنسیت */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg h-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              توزیع جنسیتی
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              درصد شاگردان بر اساس جنسیت
            </p>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2">
            {genderData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {toPersianNumbers(`${item.value}%`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* نمودار پیشرفت */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-3"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              سطح پیشرفت شاگردان
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              توزیع شاگردان بر اساس سطح مهارت
            </p>
          </div>
          
          <div className="space-y-4">
            {progressData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {toPersianNumbers(`${item.value}%`)}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
